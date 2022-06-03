import { PageLayout } from '../BaseLayout/PageLayout';
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/ApiClient';
import { useAuth0 } from '@auth0/auth0-react';
import { useToastDisplay } from '../../hooks/useToastDisplay';
import {
  Badge,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { NotFoundException } from '../../api/errors/NotFoundException';
import { HistoryResponse } from '../../api/types/HistoryItem';
import moment from 'moment';

export const HistoryPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { displayError } = useToastDisplay();
  const t = useTranslate();
  const [history, setHistory] = useState<HistoryResponse>();
  const [firstPageLoadingFinish, setFirstPageLoadingFinish] = useState(false);
  useEffect(() => {
    fetchHistory().then();
  }, []);

  const fetchHistory = async () => {
    const token = await getAccessTokenSilently();
    await apiRequest(token)
      .getHistory()
      .then((response) => {
        setHistory(response);
      })
      .catch((e: Error | NotFoundException) => {
        if (e instanceof NotFoundException) {
          setHistory(undefined);
        } else {
          displayError(e.message);
        }
      })
      .finally(() => {
        setFirstPageLoadingFinish(true);
      });
  };

  const renderHistoryView = () => {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th>{t('MESSAGE_LABEL')}</Th>
            <Th>{t('PHONE_NUMBER_LABEL')}</Th>
            <Th>{t('DATE_LABEL')}</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {history?.historyItems.map((item, i) => (
            <Tr key={`p-${i}`}>
              <Td>
                <Text>{item.message}</Text>
              </Td>
              <Td>
                <Badge size="sm" colorScheme={'green'}>
                  <Text color="muted">{item.phoneNumber}</Text>
                </Badge>
              </Td>
              <Td>
                <Text color="muted">
                  {moment(item.date).format(t('DATE_FORMAT'))}
                </Text>
              </Td>
            </Tr>
          ))}
          {history?.historyItems.length === 0 && (
            <Tr key={`p-none`}>
              <Td>
                <Text color="muted">{t('NO_MESSAGE_FOUND_HISTORY')}</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    );
  };

  const renderContent = () => {
    if (!firstPageLoadingFinish) {
      return <Spinner size="xl" />;
    }
    return renderHistoryView();
  };

  return (
    <PageLayout
      title="PAGE_HISTORY_TITLE"
      description="PAGE_HISTORY_DESCRIPTION"
    >
      {renderContent()}
    </PageLayout>
  );
};
