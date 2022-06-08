import React, { useEffect, useState } from 'react';
import { PageLayout } from '../BaseLayout/PageLayout';
import { useAuth0 } from '@auth0/auth0-react';
import { useToastDisplay } from '../../hooks/useToastDisplay';
import { apiRequest } from '../../api/ApiClient';
import { NotFoundException } from '../../api/errors/NotFoundException';
import { ContractsResponse } from '../../api/types/ContractsResponse';
import { Spinner } from '@chakra-ui/react';
import { ContractDiscovery } from './ContractDiscovery';

export const ContractPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { displayError } = useToastDisplay();
  const [userContracts, setUserContracts] = useState<ContractsResponse>();
  const [discoveryContracts, setDiscoveryContracts] =
    useState<ContractsResponse>();
  const [firstPageLoadingFinish, setFirstPageLoadingFinish] = useState(false);
  useEffect(() => {
    fetchUserContracts().then();
    fetchDiscoveryContracts().then();
  }, []);

  useEffect(() => {
    if (userContracts && discoveryContracts) {
      setFirstPageLoadingFinish(true);
    }
  }, [userContracts, discoveryContracts]);

  const fetchUserContracts = async () => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .getUserContracts()
      .then((response) => {
        setUserContracts(response);
      })
      .catch((e: Error | NotFoundException) => {
        if (e instanceof NotFoundException) {
          setUserContracts(undefined);
        } else {
          displayError(e.message);
        }
      });
  };

  const fetchDiscoveryContracts = async () => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .getDiscoveryContracts()
      .then((response) => {
        setDiscoveryContracts(response);
      })
      .catch((e: Error | NotFoundException) => {
        if (e instanceof NotFoundException) {
          setDiscoveryContracts(undefined);
        } else {
          displayError(e.message);
        }
      });
  };
  const renderContractView = () => {
    return (
      <PageLayout
        title="PAGE_CONTRACT_TITLE"
        description="PAGE_CONTRACT_DESCRIPTION"
      >
        <p>test</p>
      </PageLayout>
    );
  };

  if (!firstPageLoadingFinish) {
    return <Spinner size="xl" />;
  }
  if (userContracts?.contracts.length === 0 && discoveryContracts) {
    return <ContractDiscovery contracts={discoveryContracts} />;
  }

  return renderContractView();
};
