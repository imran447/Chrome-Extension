import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chrome-Extension-Like-Muszli-main';
  isLogin=false;
  loginData:any;
  favArtcile:any;
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
}
