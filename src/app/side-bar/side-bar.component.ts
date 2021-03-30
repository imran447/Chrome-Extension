import {Component, OnInit, Input, Output, EventEmitter, HostListener,ElementRef} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import {ManageArticleService} from "../manage-article.service";
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  settingManage     : boolean = false;
  sideFeedBar       : boolean = false;
  notificationManage :boolean = false;
  dMode            :boolean =false;
  showNotification :boolean =false;
  favArticle :boolean =false;
  darkModeArray :any=[];
  @Input() loginData;
  @Output()  loginManage:EventEmitter<any>= new EventEmitter();
  @Output()   favoriteArticle:EventEmitter<any>=new EventEmitter();
  @Output() newsApi:EventEmitter<any>=new EventEmitter();
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {

    } else {
      document.getElementById("Settings").classList.remove("active");
        document.getElementById("Notification").classList.remove("active");
    }
  }
  constructor(private authService: SocialAuthService ,private  manageArticle: ManageArticleService,private eRef: ElementRef) {
  }

  ngOnInit(): void {

  }
  profileSettingMange=()=>{
    this.settingManage=true;
  }
  sideFeedBarManage=()=>{
    this.sideFeedBar=true;
  }
  notificationOpen=()=>{
    this.notificationManage=true;
  }
  signOut(): void {
    this.authService.signOut();
    localStorage.clear();
    this.loginManage.emit(false);
  }
  addFavoriteArticle():void{
    this.favoriteArticle.emit(true);
  }
  removeFavoriteArticle():void{
    this.favoriteArticle.emit(false);
  }

  darkmode=()=>{
    var appBody= document.getElementsByTagName("BODY")[0];

    if(!this.dMode){
        appBody.classList.add('darkmode');
    }
    else{
        appBody.classList.remove('darkmode');
    }
    this.dMode=!this.dMode;
  }

  getNewsApi=()=>{
    this.newsApi.emit(this.manageArticle.getNewsApiFlag());
  }
}
