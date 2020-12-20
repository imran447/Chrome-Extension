import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  settingManage     : boolean = false;
  sideFeedBar       : boolean = false;
  notificationManage :boolean = false;
  constructor() { }

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
}
