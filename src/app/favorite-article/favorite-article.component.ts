import {Component,ElementRef, HostListener, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-favorite-article',
  templateUrl: './favorite-article.component.html',
  styleUrls: ['./favorite-article.component.css']
})
export class FavoriteArticleComponent implements OnInit {

  constructor(private articleService: ArticleService,private eRef:ElementRef,private sanitizer: DomSanitizer) { }
  public articles =[];
  public youtubeVideo:any;
  public activeIframe : boolean = true;
  public defaultSection:boolean = true;
  ngOnInit(): void {
    this.articleService.getFavoriteArticle(localStorage.getItem("userId")).subscribe(data=>{
      if(data.data.length>0)
        this.defaultSection=true;
      else
        this.defaultSection=false;
    this.arrangeArticles(data);
    });
  }
  removeFavorite=(articleId)=>{

    let a=[];
    for(let i=0;i<this.articles.length;i++){
      if(articleId!=this.articles[i]._id)
        a.push(this.articles[i]);
    }
    this.articles=[];
    this.articles=a;
    if(this.articles.length>0)
      this.defaultSection=true;
    else
      this.defaultSection=false;

    this.articleService.removeFavorite(articleId,localStorage.getItem("userId")).then((data)=>{
      if(data){}
    });
  }
  applySourceFilter=(source)=>{
    let a=[];
    for(var i=0;i<this.articles.length;i++){
      if(this.articles[i].source==source){
        a.push(this.articles[i]);
      }
    }
    this.articles=[];
    this.articles=a;
  }
  hideArticle=(articleId)=>{
    this.articleService.hideArticle(articleId,localStorage.getItem("userId")).then((data)=>{
      for(let i=0;i<this.articles.length;i++){
        if(this.articles[i]._id==articleId){
          this.articles.splice(i,1);
          break;
        }
      }
    });
  }
  addUpvote(id:string){
    this.articleService.upvoteArticle(id,localStorage.getItem("userId")).toPromise().then((response:any)=>{
      for(let i=0;i<this.articles.length;i++) {
        if (id == this.articles[i]._id) {
          this.articles[i].upvote = response.data.upvoteCounter;
          break;
        }
      }
    });
  }
  arrangeArticles(data){
    for(var j=0;j<data.data.length;j++){
      let  articleData={
        visitor:'',
        _id: '',
        title :'',
        description:'',
        image_url:'',
        playerVideo:false,
        source:'',
        game:'',
        league:'',
        team:'',
        link:'',
        created_date:'',
        published_date:'',
        type:'',
        upvote:0,
        updatedAt:''
      };;


      articleData._id=data.data[j].article._id;
      articleData.image_url=data.data[j].article.image_url;
      articleData.source=data.data[j].article.source;
      var regExp =/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      var match=regExp.test(data.data[j].article.link);
      if (match ) {
        articleData.playerVideo=true;
      }else{
        articleData.playerVideo=false;
      }
      articleData.link=data.data[j].article.link;
      articleData.game=data.data[j].article.game;
      articleData.team=data.data[j].article.team;
      articleData.upvote=data.data[j].article.upvoteCounter;
      articleData.created_date=data.data[j].article.created_date;
      articleData.published_date=data.data[j].article.published_date;
      articleData.title=data.data[j].article.title;
      articleData.description=data.data[j].article.description;
      articleData.league=data.data[j].article.league;
      articleData.type=data.data[j].article.type;
      articleData.visitor=data.data[j].article.visitor;
      articleData.updatedAt=data.data[j].article.updatedAt;
      this.articles.push(articleData);
    }
  }

  addVisitor=(id: String,link)=> {
    //  this.openYoutubeVideo(url);
    var url = link;
    if (url != undefined || url != '') {
      var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      var match = regExp.test(link);
      if (match) {
        this.articleService.addVisitor(id);
        setTimeout(() => {
          for (let i = 0; i < this.articles.length; i++) {
            if (id == this.articles[i]._id) {
              this.articles[i].visitor = this.articles[i].visitor + 1;
              break;
            }
          }
        }, 1000);

        this.playVideo(link);
      } else {
        window.open(link, "_blank");
        this.articleService.addVisitor(id);
        setTimeout(() => {
          for (let i = 0; i < this.articles.length; i++) {
            if (id == this.articles[i]._id) {
              this.articles[i].visitor = this.articles[i].visitor + 1;
              break;
            }
          }

        }, 1000);
        this.activeIframe = true;
      }
    }
  }
  playVideo(link){
    this.youtubeVideo=this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this.activeIframe=false;
  }
  closeIframe(){
    this.activeIframe=true;
    document.getElementById('iframVideo1').setAttribute('src','');
  }

  }
