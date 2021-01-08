import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  settingManage     : boolean = false;
  sideFeedBar       : boolean = false;
  notificationManage :boolean = false;
  favArticle :boolean =false;
  @Input() loginData;
  @Output()  loginManage:EventEmitter<any>= new EventEmitter();
  @Output()   favoriteArticle:EventEmitter<any>=new EventEmitter();

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
  }
  profileSettingMange=()=>{
    this.settingManage=!(this.settingManage);
  }
  sideFeedBarManage=()=>{
    this.sideFeedBar=!(this.sideFeedBar);
  }
  notificationOpen=()=>{
    this.notificationManage=!(this.notificationManage);
  }
  signOut(): void {
    this.authService.signOut();
    this.loginManage.emit(false);
  }
  addFavoriteArticle():void{
    this.favoriteArticle.emit(true);
  }
  removeFavoriteArticle():void{
    this.favoriteArticle.emit(false);
  }

}
