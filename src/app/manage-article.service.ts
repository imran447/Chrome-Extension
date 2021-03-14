import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageArticleService {

  constructor() { }
  newsApiFlag :boolean=false;
  getNewsApiFlag(){
    this.newsApiFlag=!this.newsApiFlag;
    return this.newsApiFlag;
  }
}
