export interface ConnectedPhone {
    id: string;
    phoneNumber: string;
    date: Date;
}

export interface PhoneNumberVerification {
    connectedPhones: ConnectedPhone[];
    openConnectionCodes: string[];
}



