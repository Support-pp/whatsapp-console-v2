import { PageLayout } from '../BaseLayout/PageLayout';
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { M2M } from '../../api/types/M2M';
import { useToastDisplay } from '../../hooks/useToastDisplay';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { DeleteConfirmModal } from '../../components/Modal/DeleteConfirmModal';
import { NotFoundException } from '../../api/errors/NotFoundException';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { FiKey } from 'react-icons/fi';

export const ApiKeyPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { displayError } = useToastDisplay();
  const t = useTranslate();

  const colorModeValue = useColorModeValue('sm', 'sm-dark');
  const [m2m, setM2m] = useState<M2M>();
  const [deleteConfirmModalState, setDeleteConfirmModalState] = useState(false);
  const [firstPageLoadingFinish, setFirstPageLoadingFinish] = useState(false);
  const [pendingEmptyStateButton, setPendingEmptyStateButton] = useState(false);
  const [pendingRegenerateApiKeyButton, setPendingRegenerateApiKeyButton] =
    useState(false);

  useEffect(() => {
    fetchApiKey().then();
  }, []);

  const fetchApiKey = async () => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .getApiKey()
      .then((response) => {
        setM2m(response);
      })
      .catch((e: Error | NotFoundException) => {
        if (e instanceof NotFoundException) {
          setM2m(undefined);
        } else {
          displayError(e.message);
        }
      })
      .finally(() => {
        setFirstPageLoadingFinish(true);
      });
  };

  const createApiKey = async () => {
    const token = await getAccessTokenSilently();
    setPendingEmptyStateButton(true);
    await apiRequest(token)
      .createApiKey()
      .then((response) => {
        setM2m(response);
      })
      .catch((e: Error) => {
        displayError(e.message);
      })
      .finally(() => {
        setPendingEmptyStateButton(false);
      });
  };

  const regenerateClientSecret = async () => {
    const token = await getAccessTokenSilently();
    setPendingRegenerateApiKeyButton(true);
    await apiRequest(token)
      .regenerateApiSecret()
      .then((response) => {
        setM2m(response);
      })
      .catch((e: Error) => {
        displayError(e.message);
      })
      .finally(() => {
        setPendingRegenerateApiKeyButton(false);
      });
  };

  const deleteApiKey = async () => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .deleteApiKey()
      .then(() => {
        setM2m(undefined);
      })
      .catch((e: Error) => {
        displayError(e.message);
      });
  };

  const renderClientCredentialsView = () => {
    return (
      <Box
        bg="bg-surface"
        boxShadow={colorModeValue}
        borderRadius="lg"
        p={{ base: '4', md: '6' }}
      >
        <Stack spacing="5">
          <Stack spacing="1">
            <Stack spacing="10">
              <Text fontSize="lg" fontWeight="medium">
                {t('CLIENT_ID_AND_CLIENT_SECRET_TITLE')}
              </Text>

              <FormControl>
                <Input
                  id="clientId"
                  size="md"
                  placeholder=" "
                  data-peer
                  value={m2m?.clientId}
                  readOnly={true}
                />
                <FormLabel htmlFor="clientId" variant="floating" size="md">
                  {t('CLIENT_ID_LABEL')}
                </FormLabel>
              </FormControl>
              <FormControl>
                <Input
                  id="clientSecret"
                  size="md"
                  placeholder=" "
                  data-peer
                  type={m2m?.clientSecret ? 'text' : 'password'}
                  disabled={true}
                  value={
                    m2m?.clientSecret
                      ? m2m.clientSecret
                      : t('EASTER_EGG_TRY_TO_COPY_CLIENT_SECRET_AGAIN')
                  }
                />
                <FormLabel htmlFor="clientSecret" variant="floating" size="md">
                  {t('CLIENT_SECRET_LABEL')}
                </FormLabel>
                <Text fontSize={'xs'} pt={'14px'}>
                  {t('INFORMATION_CLIENT_SECRET_VISIBILITY')}
                </Text>
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
            <Button
              variant="secondary"
              onClick={regenerateClientSecret}
              isLoading={pendingRegenerateApiKeyButton}
            >
              {t('REGENERATE_CREDENTIALS_BUTTON_LABEL')}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setDeleteConfirmModalState(true);
              }}
            >
              {t('DELETE_BUTTON_LABEL')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const renderEmptyState = () => {
    return (
      <EmptyState
        title={'EMPTY_STATE_API_KEY_TITLE'}
        description={'EMPTY_STATE_API_KEY_DESCRIPTION'}
        icon={FiKey}
        buttonLabel={'EMPTY_STATE_API_KEY_BUTTON'}
        pending={pendingEmptyStateButton}
        onButtonClick={async () => await createApiKey()}
      />
    );
  };

  const renderContent = () => {
    if (!firstPageLoadingFinish) {
      return <Spinner size="xl" />;
    }
    return m2m ? renderClientCredentialsView() : renderEmptyState();
  };

  return (
    <PageLayout
      title="PAGE_API_KEY_TITLE"
      description="PAGE_API_KEY_DESCRIPTION"
    >
      <DeleteConfirmModal
        title={'DELETE_CONFIRM_MODAL_TITLE'}
        description={t('DELETE_CONFIRM_MODAL_DESCRIPTION_API_KEY')}
        deleteProductName={''}
        open={deleteConfirmModalState}
        onDeleteConfirm={deleteApiKey}
        onClose={() => {
          setDeleteConfirmModalState(false);
        }}
      />
      {renderContent()}
    </PageLayout>
  );
};
