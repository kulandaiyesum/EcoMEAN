export interface Address {
  _id?: string;
  user?: string;
  name: string;
  addresslineOne: string;
  addressLineTwo?: string; //optional
  phoneNumber: string;
  alternativePhoneNumber?: string; //optional
  city: string;
  state: string;
  postalCode: string;
  landMark?: string;
  addressType?: string;
}
