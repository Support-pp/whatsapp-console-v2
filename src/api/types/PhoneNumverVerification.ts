export interface ConnectedPhone {
    id: string;
    phoneNumber: string;
    date: string;
}
export interface PhoneNumberVerification {
    connectedPhones: ConnectedPhone[];
    openConnectionCodes: string[];
}



