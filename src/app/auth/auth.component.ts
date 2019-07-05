import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthLoginData } from './auth-login-data';
import { AuthService } from './auth.service';
import { User } from '../models/user'
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [routerTransition()]
})
export class AuthComponent implements OnInit, OnDestroy {
  
  userData:User;
  loginForm: FormGroup;
  usernameField: FormControl;
  passwordField: FormControl;
  authLoginSub: any;
  loginErrors: any;
  tokenExists = false
  didLogin = false;

  constructor(
    private authAPI: AuthService,
  ) { }

  ngOnInit() {
    let username = this.authAPI.getUsername()
    this.usernameField  = new FormControl(username, [
                Validators.required,
                Validators.minLength(0),
                Validators.maxLength(280)
            ])
    this.passwordField  = new FormControl("", [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(280)
            ])
    this.loginForm = new FormGroup({
        'usernameField': this.usernameField,
        'passwordField': this.passwordField
    })
    this.tokenExists = this.authAPI.checkToken()
  }

  ngOnDestroy(){
    if (this.authLoginSub){
      this.authLoginSub.unsubscribe()
   } 
  }

  doLogin(data){
    this.authLoginSub = this.authAPI.login(data).subscribe(data=>{
      this.userData = data as User
      let token = this.userData.token || null
      let date = new Date(data.expires)
      this.authAPI.setStatus(this.userData) 
      this.authAPI.setUsername(this.userData)
      this.authAPI.performLogin(token, date)     
      localStorage.setItem('isLoggedin', 'true');
      this.didLogin = true
     }, error=>{
       this.loginErrors = error['error']['detail']
     })
  }

  handleSubmit(event:any, ourLoginDir:NgForm, loginFormGroup:FormGroup){
    event.preventDefault()
    if (ourLoginDir.submitted){
        // interact with the server
        let authLoginData = new AuthLoginData(
            loginFormGroup.value['usernameField'], 
            loginFormGroup.value['passwordField']
            )
        this.doLogin(authLoginData)
        ourLoginDir.resetForm({})
    }
  }
}
