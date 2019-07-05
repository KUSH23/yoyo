import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    userData:any;
    listsub: any;
    tokenExists = false
    SignUpForm: FormGroup;
    authLoginSub: any;
    username:  FormControl;
    email:  FormControl;
    password:  FormControl;
    password2:  FormControl;
    is_admin:  FormControl;
    is_manager:  FormControl;
    is_service_manager:  FormControl;

    constructor(
        private authAPI: AuthService,
    ) {}

    ngOnInit() {
        this.username= new FormControl('')
        this.email= new FormControl('')
        this.password= new FormControl('')
        this.password2= new FormControl('')
        this.is_admin= new FormControl(false)
        this.is_manager= new FormControl(false)
        this.is_service_manager= new FormControl(false)

        this.SignUpForm = new FormGroup({
        'username': this.username,
        'email': this.email,
        'password': this.password,
        'password2': this.password2,
        'is_admin': this.is_admin,
        'is_manager': this.is_manager,
        'is_service_manager': this.is_service_manager
        })

        this.tokenExists = this.authAPI.checkToken()
    }

    onSubmit(ourSignUpDir) {
        if(this.tokenExists){
            this.authLoginSub = this.authAPI.register(this.SignUpForm.value).subscribe(data=>{
                this.userData = data
                ourSignUpDir.resetForm({})
                // console.log(this.userData)
               })
        }
      }
}
