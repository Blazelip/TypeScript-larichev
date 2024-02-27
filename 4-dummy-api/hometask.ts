import axios from "axios";

const URL = 'https://dummyjson.com/users';

const enum Gender {
  MAIL = 'mail',
  FEMAIL = 'female',
}

interface UserCompany {
  address: Address,
  department: string,
  name: string,
  title: string,
}

interface UserCrypto {
  coin: string,
  wallet: string,
  network: string,
}

interface Address {
  address: string,
  city: string,
  coordinates: {
    lat: number,
    lng: number,
  },
  postalCode: string,
  state: string,
}

interface UserHair {

}

interface UserBank {
  cardExpire: string,
  cardNumber: string,
  cardType: string,
  currency: string,
  iban: string,
}

interface User {
  id: number,
  firstName: string,
  lastName: string, 
  maidenName: string,
  age: number,
  gender: Gender,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: string,
  image: string,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: {
    color: string,
    type: string,
  },
  domain: string,
  ip: string,
  address: Address,
  macAddress: string,
  university: string,
  bank: UserBank,
  company: UserCompany,
  ein: string,
  ssn: string,
  userAgent: string,
  crypto: UserCrypto,
}

interface UsersResponse {
  users: User[],
  total: number,
  skip: number,
  limit: number,
}

const fetchAllusers = async (url: string): Promise<UsersResponse> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error with fetch users request');
  }
}