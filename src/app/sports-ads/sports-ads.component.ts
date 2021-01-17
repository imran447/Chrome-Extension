import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-sports-ads',
  templateUrl: './sports-ads.component.html',
  styleUrls: ['./sports-ads.component.css']
})
export class SportsAdsComponent implements OnInit {
  public articles =[];
  public activate:boolean=false;
  public filter:boolean=false;
  public loadedAll:boolean=true;
  public filterKeyword ='';

  public activeIframe:boolean=false;
  public youtubeVideo:String='';
  constructor(private articleService: ArticleService) {
    this.youtubeVideo='https://www.youtube.com/embed?v=fD6SzYIRr4c';
  }
  @Input() favoriteArticle;
  ngOnInit(): void {
    this.loadedAll=true;
   this.getArticle();
  }
  getArticle=()=>{
    this.articleService.getArticles(localStorage.getItem("userId")).subscribe(data=>{
      if (data.data.length) {
        this.articles.push(...data.data);
        if(data.data.length<30)
          this.loadedAll=true;
        return;
        this.loadedAll=false;

      } else {
        this.loadedAll = true;
      }
    });
    this.handleScroll();
  }
    addVisitor=(id: String)=>{
    //  this.openYoutubeVideo(url);
      this.articleService.addVisitor(id);
      this.articleService.getArticles(localStorage.getItem("userId")).subscribe(data=>{
        this.articles=data.data
      });
  }
  activateOption=(e)=>{
    if(!this.activate){
     document.getElementById(e).classList.remove('display-none');
    }
    else{
      document.getElementById(e).classList.add('display-none')
    }
    this.activate=!this.activate;
  }
  addFavoriteArticle=(id: String) =>{
    this.articleService.addFavoriteArticle(id, localStorage.getItem("userId"));
  }
  openfilter=()=>{
    this.filter=!this.filter;
  }
  applyFilter=()=> {
    if(this.filterKeyword==''){
      this.getArticle();
      return;
    }
    this.articleService.applyFilter(this.filterKeyword, localStorage.getItem("userId")).subscribe(response => {
     this.articles=response.data;
    });
  }
    hideArticle=(articleId)=>{
      this.articleService.hideArticle(articleId,localStorage.getItem("userId")).then((data)=>{
        this.getArticle();
      })
    }
    openYoutubeVideo=(url)=>{
      this.youtubeVideo=url;
    }
  handleScroll(): void {
    window.onscroll = () => this.detectBottom();
  }

  detectBottom(): void {
    console.log("bottom");

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (!this.loadedAll) {
        this.articleService.paginatePage();
        this.getArticle();
      }
    }
  }
}
