export interface Contract {
  name: string;
  description: string;
  limitLinkedPhoneNumbers: number;
  limitMessages: number;
  price: number;
  renewAutomatic: boolean;
  bookingId: string;
}
