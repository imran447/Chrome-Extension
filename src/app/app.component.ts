import {Component, HostListener, OnInit} from '@angular/core';
import {LoginService} from "./login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Chrome-Extension-Like-Muszli-main';
  isLogin=false;
  loginData:any;
  public scrollEffect:boolean=true;
  favArtcile:any;
  newsApiFlag:any;

  constructor(private loginService: LoginService) {
  }
  ngOnInit() {
    if(localStorage.getItem("userId")){
      this.loginService.logedUser(localStorage.getItem("userId")).subscribe((response)=>{
        console.log(response);
        let loginData={
          email:String,
          name:String,
          provider:String,
          photoUrl:String
        };
        loginData.email=response.data.email;
        loginData.name=response.data.name;
        loginData.photoUrl=response.data.picture.replaceAll("&#x2F;","/");
        loginData.provider=response.data.provder;
        this.sendLoginData(loginData);
      });
      // this.sendLoginData(user);
    }
  }

  sendLoginData=(data)=>{
    this.loginData=data;
    this.isLogin=true;
  }
  loginManage=(data)=>{
    this.isLogin=data;
  }
  favoriteArticle=(event)=>{
    this.favArtcile=event;
  }
  newsApiManage=(event)=>{
    this.newsApiFlag=event;
  }
}
