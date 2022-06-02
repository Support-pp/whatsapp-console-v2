import axios, { AxiosError } from 'axios';
import { PhoneNumberVerification } from './types/PhoneNumverVerification';
import { PhoneNumberVerificationInviteCode } from './types/PhoneNumberVerificationInviteCode';
import { Limits } from './types/Limits';
import { M2M } from './types/M2M';
import { NotFoundException } from './errors/NotFoundException';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const apiClient = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return instance;
};

interface ErrorResponseBackend {
  code: string;
  param?: string[];
}

export interface ApiClient {
  getPhoneNumbersVerification(): Promise<PhoneNumberVerification>;

  createPhoneNumbersVerificationCode(): Promise<PhoneNumberVerificationInviteCode>;

  getLimits(): Promise<Limits>;

  deletePhoneVerification(id: string): Promise<void>;

  getApiKey(): Promise<M2M>;

  createApiKey(): Promise<M2M>;

  deleteApiKey(): Promise<void>;

  regenerateApiSecret(): Promise<M2M>;
}

export const apiRequest = (token: string): ApiClient => {
  return {
    async getPhoneNumbersVerification(): Promise<PhoneNumberVerification> {
      return await apiClient(token)
        .get('/api/private/phone-number-verifications/')
        .then((res) => {
          return res.data as PhoneNumberVerification;
        })
        .catch((e: AxiosError) => {
          throw new Error(
            (e.response?.data as ErrorResponseBackend)?.code &&
              'UNKNOWN_API_ERROR'
          );
        });
    },
    async getApiKey(): Promise<M2M> {
      return await apiClient(token)
        .get('/api/private/m2m/')
        .then((res) => {
          return res.data as M2M;
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 404) {
            throw new NotFoundException('404');
          }
          throw new Error(
            (e.response?.data as ErrorResponseBackend)?.code &&
              'UNKNOWN_API_ERROR'
          );
        });
    },

    async regenerateApiSecret(): Promise<M2M> {
      return await apiClient(token)
        .patch('/api/private/m2m/')
        .then((res) => {
          return res.data as M2M;
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 404) {
            throw new NotFoundException('404');
          }
          throw new Error(
            (e.response?.data as ErrorResponseBackend)?.code &&
              'UNKNOWN_API_ERROR'
          );
        });
    },
    async createApiKey(): Promise<M2M> {
      return await apiClient(token)
        .post('/api/private/m2m/')
        .then((res) => {
          return res.data as M2M;
        })
        .catch((e: AxiosError) => {
          if (e.response?.status === 404) {
            throw new NotFoundException('404');
          }
          throw new Error(
            (e.response?.data as ErrorResponseBackend)?.code &&
              'UNKNOWN_API_ERROR'
          );
        });
    },
    async deleteApiKey(): Promise<void> {
      return await apiClient(token)
        .delete('/api/private/m2m/')
        .then((res) => {
          return res.data;
        })
        .catch((e: AxiosError) => {
          throw new Error(
            (e.response?.data as ErrorResponseBackend)?.code &&
              'UNKNOWN_API_ERROR'
          );
        });
    },
    async createPhoneNumbersVerificationCode(): Promise<PhoneNumberVerificationInviteCode> {
      return await apiClient(token)
        .post('/api/private/phone-number-verifications/new')
        .then((res) => {
          return res.data as PhoneNumberVerificationInviteCode;
        })
        .catch((e: AxiosError) => {
          throw new Error((e.response?.data as ErrorResponseBackend)?.code);
        });
    },

    async getLimits(): Promise<Limits> {
      return await apiClient(token)
        .get('/api/private/limits/')
        .then((res) => {
          return res.data as Limits;
        })
        .catch((e: AxiosError) => {
          throw new Error((e.response?.data as ErrorResponseBackend)?.code);
        });
    },
    async deletePhoneVerification(id: string): Promise<void> {
      return await apiClient(token)
        .delete('/api/private/phone-number-verifications/' + id)
        .then((res) => {
          return res.data;
        })
        .catch((e: AxiosError) => {
          throw new Error((e.response?.data as ErrorResponseBackend)?.code);
        });
    },
  };
};
