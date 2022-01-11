import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]=[];

  constructor() { }

  addUser(user: User) {
    this.users.push(user);
    console.warn(this.users);
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
