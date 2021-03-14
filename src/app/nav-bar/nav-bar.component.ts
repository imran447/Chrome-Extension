import {Component,ElementRef, HostListener, OnInit} from '@angular/core';
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
  siteURLFlag:boolean=false;
  siteUrlError='Please Enter the HTTPS URL';
  showModel:boolean=false;
  google_search:'';


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      console.log(event.target);
      if(event.target!=document.getElementById('googleUl') && event.target !=document.getElementById('clickImage')){
        this.google_bar=false;
      }
      if(event.target==document.getElementById('bookmark_modalCustome')){
        document.getElementById('bookmark_modal_1').classList.remove('show');

      }
    } else {
      this.google_bar=false;
      if(document.getElementById("googleapps").classList.contains('active')){
        document.getElementById("googleapps").classList.remove('active');
      }
    }
  }

  constructor(private chromeTopSites: ChromeTopSitesService,private eRef: ElementRef) {
    this.siteUrl=''
  }
  ngOnInit(): void {
    this.getTopChromeTopSites();
  }
  getTopChromeTopSites=()=>{
    this.chromeTopSites.getChromeTopSites(localStorage.getItem("userId")).subscribe(data=>{
      this.topSites=[];
      this.topSites=data.data
    });
  }
  manageGoogleBar=()=>{
    this.google_bar=true;
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
    var regex=/^(https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    var flag=regex.test(this.siteUrl);
   if(!flag){
     this.siteURLFlag = true;
     return;
   }
   this.siteURLFlag=false;
    this.chromeTopSites.addChromeTopSites(this.siteUrl, localStorage.getItem("userId")).subscribe((data)=>{
      if(data)
        this.getTopChromeTopSites();
    });
  }
  openGoogle=(value)=>{
     window.open('http://google.com/search?q='+value);
  }

}
