import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BannerSportAdsComponent } from './banner-sport-ads/banner-sport-ads.component';
import { SportsAdsComponent } from './sports-ads/sports-ads.component';
import { HeadlineRowComponent } from './headline-row/headline-row.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    BannerSportAdsComponent,
    SportsAdsComponent,
    HeadlineRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
