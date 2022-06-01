import axios, {AxiosError, AxiosResponse} from "axios";
import {PhoneNumberVerification} from "./types/PhoneNumverVerification";
import {PhoneNumberVerificationInviteCode} from "./types/PhoneNumberVerificationInviteCode";
import {Limits} from "./types/Limits";


const instance = axios.create({baseURL: process.env.REACT_APP_API_URL})

const apiClient = (token:string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance;
}


export interface ApiClient{
    getPhoneNumbersVerification(): Promise<PhoneNumberVerification>
    createPhoneNumbersVerificationCode(): Promise<PhoneNumberVerificationInviteCode>
    getLimits(): Promise<Limits>
    deletePhoneVerification(id:string): Promise<void>
}

export const apiRequest =(token:string): ApiClient =>{
    return {
        async getPhoneNumbersVerification(): Promise<PhoneNumberVerification> {
            return await apiClient(token).get("/api/private/phone-number-verifications/").then((res) => {
                return res.data as PhoneNumberVerification
            }).catch((e:AxiosError) =>{
                return (e.response?.data as any)?.code && "UNKNOWN_API_ERROR"
            })
        },
        async createPhoneNumbersVerificationCode(): Promise<PhoneNumberVerificationInviteCode> {
            return await apiClient(token).post("/api/private/phone-number-verifications/new").then((res) => {
                return res.data as PhoneNumberVerificationInviteCode
            }).catch((e:AxiosError) =>{
               throw new Error((e.response?.data as any)?.code)
            })
        },

        async getLimits(): Promise<Limits> {
            return await apiClient(token).get("/api/private/limits/").then((res) => {
                return res.data as Limits
            }).catch((e:AxiosError) =>{
                throw new Error((e.response?.data as any)?.code)
            })
        },
        async deletePhoneVerification(id: string): Promise<void> {
            return await apiClient(token).delete("/api/private/phone-number-verifications/" + id).then((res) => {
                return res.data
            }).catch((e:AxiosError) =>{
                throw new Error((e.response?.data as any)?.code)
            })
        }
    }
}
