import React from 'react';
import { Box, Button, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { FiMessageSquare, FiPhone } from 'react-icons/fi';
import { ContractsResponse } from '../../api/types/ContractsResponse';
import { apiRequest } from '../../api/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { useToastDisplay } from '../../hooks/useToastDisplay';

export const ContractDiscovery = (props: { contracts: ContractsResponse }) => {
  const t = useTranslate();
  const { getAccessTokenSilently } = useAuth0();
  const { displayError } = useToastDisplay();
  const { contracts } = props;

  const sortedContract = contracts.contracts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const forwardToCheckoutPage = async (contractKey: string) => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .startCheckoutSession(contractKey)
      .then()
      .catch((e: Error) => {
        displayError(e.message);
      });
  };

  return (
    <div>
      <div className=" mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <Heading
            size={useBreakpointValue({ base: 'xs', md: 'sm' })}
            fontWeight="bold"
            className="sm:text-center"
          >
            {t('CONTRACTS_DISCOVERY_TITLE')}
          </Heading>
          <p className="mt-5 text-xl text-gray-500 sm:text-center ">
            {t('CONTRACTS_DISCOVERY_DESCRIPTIONS')}
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
          {sortedContract.map((contract, i) => (
            <Box bg="bg-subtle" px="4" py="5" borderRadius="lg" key={i}>
              <div className="p-6">
                <h2 className="text-lg leading-6 font-medium text-white font-bold">
                  {t(contract.name)}
                </h2>
                <p className="mt-4 text-sm text-white">
                  {t(contract.description)}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    {t({
                      key: 'CONTRACT_PRICE_MONTHLY_WITH_CURRENCY',
                      parameters: { price: t(contract.price.toString()) },
                    })}
                  </span>
                  <span className="text-base font-medium text-white">
                    {t('MONTH_LABEL')}
                  </span>
                </p>
                <Button
                  variant="primary"
                  onClick={() => forwardToCheckoutPage(contract.name)}
                  className={
                    'mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900'
                  }
                >
                  {t({
                    key: 'BUY_BUTTON_LABEL_WITH_PRODUCT_NAME',
                    parameters: { productName: t(contract.name) },
                  })}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-white tracking-wide uppercase">
                  {t('LIMITS_HEADER')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <FiMessageSquare />
                    <span className="text-sm text-white">
                      {t({
                        key: 'MESSAGE_LIMIT_CONTRACT_DISCOVERY',
                        parameters: { limit: contract.limitMessages },
                      })}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <FiPhone />
                    <span className="text-sm text-white">
                      {t({
                        key: 'PHONE_LIMIT_CONTRACT_DISCOVERY',
                        parameters: { limit: contract.limitLinkedPhoneNumbers },
                      })}
                    </span>
                  </li>
                </ul>
              </div>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};
