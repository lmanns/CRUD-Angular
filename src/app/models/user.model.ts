import { Phone } from './phone.model';

export interface User {
    name: string;
    email: string;
    password: string;
    phone: Phone;
}
