import { Component, OnInit } from '@angular/core';
import {ChromeTopSitesService} from "../chrome-top-sites.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  google_bar :boolean=false;
  chromeTopSite: boolean=false;
  topSites:any;
  siteUrl:string;
  constructor(private chromeTopSites: ChromeTopSitesService) {
    this.siteUrl=''
  }
  ngOnInit(): void {
    // this.topSites=[
    //   "https://sellercentral.amazon.com/",
    //   "https://facebook.com/",
    //   "https://web.whatsapp.com/",
    //   "https://amazon.com/",
    //   "https://Shopify.com/",
    //   "https://mail.google.com/",
    // ];
    // for (var i=0;i<this.topSites.length;i++){
    //  this.chromeTopSites.addChromeTopSites(this.topSites[i], localStorage.getItem("userId"))
    // }
    // this.topSites=[];
    this.getTopChromeTopSites();
  }
  getTopChromeTopSites=()=>{
    this.chromeTopSites.getChromeTopSites(localStorage.getItem("userId")).subscribe(data=>{
      this.topSites=[];
      this.topSites=data.data
    });
  }
  manageGoogleBar=()=>{
    this.google_bar=!(this.google_bar);
  }
  handleChromeTopSites=()=>{
    this.chromeTopSite=!this.chromeTopSite;
  }
  removeTopSites=(id)=>{
    this.chromeTopSites.removeChromeTopSites(id).subscribe((data)=>{
      if(data){
        this.getTopChromeTopSites();
      }
    });
  }

  addChromeSite=()=>{
    console.log("asdf");
     this.chromeTopSites.addChromeTopSites(this.siteUrl, localStorage.getItem("userId")).subscribe((data)=>{
       if(data)
         this.getTopChromeTopSites();
     });
  }
}
