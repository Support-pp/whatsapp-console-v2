import { PlusIcon } from '@heroicons/react/solid';
import { Button, Icon } from '@chakra-ui/react';
import { useTranslate } from '@tolgee/react';
import { IconType } from 'react-icons';
import React from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon: IconType;
  buttonLabel: string;
  onButtonClick: () => void;
  pending: boolean;
}

export const EmptyState = (props: EmptyStateProps) => {
  const t = useTranslate();

  return (
    <>
      <div className="text-center w-full h-2/3 flex">
        <div className={'py-auto m-auto'}>
          <Icon as={props.icon} boxSize="12" color="subtle" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t(props.title)}
          </h3>
          <p className="mt-1 text-sm text-gray-500 w-full md:w-2/3 m-auto">
            {t(props.description)}
          </p>
          <div className="mt-6">
            <Button
              onClick={() => props.onButtonClick()}
              isLoading={props.pending}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {t(props.buttonLabel)}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
