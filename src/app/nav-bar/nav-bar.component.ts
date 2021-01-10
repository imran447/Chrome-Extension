import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  google_bar :boolean=false;
  chromeTopSite: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  manageGoogleBar=()=>{
    this.google_bar=!(this.google_bar);
  }
  handleChromeTopSites=()=>{
    this.chromeTopSite=!this.chromeTopSite;
  }

}
