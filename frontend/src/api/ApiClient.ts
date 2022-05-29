import axios from "axios";
import {PhoneNumberVerification} from "./types/PhoneNumverVerification";


const instance = axios.create({baseURL: process.env.REACT_APP_API_URL})

const apiClient = (token:string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance;
}


export interface ApiClient{
    getPhoneNumbersVerification(): Promise<PhoneNumberVerification>
}

export const apiRequest =(token:string): ApiClient =>{
    return {
        async getPhoneNumbersVerification(): Promise<PhoneNumberVerification> {
            return await apiClient(token).get("/api/private/phone-number-verifications/").then((res) => {
                return res.data;
            })
        }
    }
}
