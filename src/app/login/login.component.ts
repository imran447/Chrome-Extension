import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
import {LoginService} from "../login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./util.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  _loginService: any;
  result:any;
  @Output()  sendLoginData:EventEmitter<any>= new EventEmitter();
  constructor(private authService: SocialAuthService, loginService: LoginService) {
    this._loginService = loginService;
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      this._loginService.registerUser(this.user);
        this.sendLoginData.emit(this.user);

    });

  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data)=>{
      this._loginService.registerUser(this.user);
      this.sendLoginData.emit(this.user);
    });
  }

}
