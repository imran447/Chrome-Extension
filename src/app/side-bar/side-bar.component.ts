import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  settingManage : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  profileSettingMange=()=>{
    this.settingManage=!(this.settingManage);
  }
}
