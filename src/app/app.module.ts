import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BannerSportAdsComponent } from './banner-sport-ads/banner-sport-ads.component';
import { SportsAdsComponent } from './sports-ads/sports-ads.component';
import { HeadlineRowComponent } from './headline-row/headline-row.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { FavoriteArticleComponent } from './favorite-article/favorite-article.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    BannerSportAdsComponent,
    SportsAdsComponent,
    HeadlineRowComponent,
    LoginComponent,
    FavoriteArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    HttpClientModule
   ],
    providers: [
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: true,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                ''
              ),
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider(''),
            },
          ],
        } as SocialAuthServiceConfig,
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
