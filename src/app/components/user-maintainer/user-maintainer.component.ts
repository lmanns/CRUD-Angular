import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-maintainer',
  templateUrl: './user-maintainer.component.html',
  styleUrls: ['./user-maintainer.component.css']
})
export class UserMaintainerComponent implements OnInit {

  users: User[] = [];

  index: number = 0;
  nameInput: string ='';
  emailInput: string ='';
  passwordInput: string ='';
  phoneInput: string = '';
  cityCodeInput: string = '';
  countryCodeInput: string = '';
  buttonModify: boolean = false;


  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.users;
    this.initForm();

  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^([A-Za-z áÁéÉiÍóÓúÚñÑüÜ]+)$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', Validators.required],
      phone:['',[Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(7), Validators.maxLength(8)]],
      cityCode:['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1), Validators.maxLength(2)]],
      countryCode:['', [Validators.required, Validators.pattern(/^[0-9]*$/),Validators.minLength(2), Validators.maxLength(2)]]
    })
  }

  resetForm() {
    this.registerForm.reset();
  }

  saveUser() {
    if(this.registerForm.invalid){
      return;
    }
    let user: User = {
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
      phone: {
        number: this.phoneInput,
        cityCode: this.cityCodeInput,
        countryCode: this.countryCodeInput
      }
    }
    this.userService.addUser(user);
    this.resetForm();
  }

  deleteUser(index: number) {
    if(confirm("Esta acción es irreversible. ¿Desea eliminar el usuario?")) {
      this.userService.removeUser(index);
      this.resetForm();
    }
    else {
      console.error('User not deleted');
    }
  }

  modifyUser(index: number) {
    this.userService.users[index].name = this.nameInput;
    this.userService.users[index].email = this.emailInput;
    this.userService.users[index].password = this.passwordInput;
    this.userService.users[index].phone.number = this.phoneInput;
    this.userService.users[index].phone.cityCode = this.cityCodeInput;
    this.userService.users[index].phone.countryCode = this.countryCodeInput;
    this.buttonModify = false;
    this.resetForm();
  }

  loadInForm(index: number) {
    if(index >= 0) {
      this.index = index;
      this.nameInput = this.userService.users[index].name;
      this.emailInput = this.userService.users[index].email;
      this.passwordInput = this.userService.users[index].password; 
      this.phoneInput = this.userService.users[index].phone.number; 
      this.cityCodeInput = this.userService.users[index].phone.cityCode; 
      this.countryCodeInput = this.userService.users[index].phone.countryCode;
      this.buttonModify = true;
    }
  }

}
