import {Component, Input, OnInit, OnChanges, HostListener} from '@angular/core';
import {ArticleService} from "../article.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import set = Reflect.set;
@Component({
  selector: 'app-sports-ads',
  templateUrl: './sports-ads.component.html',
  styleUrls: ['./sports-ads.component.css']
})
export class SportsAdsComponent implements OnInit {
  public articles =[];
  public bannerArticles=[];
  public sources=[];
  private getArticlesFlag= false;
  private getUpvoteFlag= false;
  private getViewedFlag= false;
  public uniqueSource=[];
  public selectedSources=[];
  public unSelectedSources=[];
  public activate:boolean=false;
  public filter:boolean=false;

  public loadedAll:boolean=true;

  public activeIframe:boolean=true;
  public youtubeVideo:any;
  constructor(private articleService: ArticleService,private sanitizer: DomSanitizer) {

  }
  @Input() favoriteArticle;
  @Input() newsApi;

  ngOnInit(): void {
   this.getArticlesFlag=true;
   this.getUpvoteFlag= false;
   this.getViewedFlag =false;
   if(this.articles.length==0){
     document.getElementById("loadingIcons").classList.remove('display-none');
     setTimeout(function () {
       document.getElementById("loadingIcons").classList.add('display-none');
     },1000);
   }
    this.getArticle();
    this.articleService.getSourceArticle().subscribe(data=>{
      if(data){
        for(let i=0;i<data.data.length;i++){
          let s={
            source:''
          };
          s.source=data.data[i];
          this.sources.push(s);
        }
      }
    });
    this.articleService.selectedSource().subscribe(data=>{
      if(data){
        for(let i=0;i<data.data.length;i++){
          let s={
            source:''
          };
          s.source=data.data[i];
          this.selectedSources.push(s);
        }
      }
    });
    this.articleService.unSelectedSource().subscribe(data=>{
      if(data){
        for(let i=0;i<data.data.length;i++){
          let s={
            source:''
          };
          s.source=data.data[i];
          this.unSelectedSources.push(s);
        }
      }
    });
    this.articleService.getUniSourceArticle().subscribe(data=>{
      if(data){
        for(let i=0;i<data.data.length;i++){
          let s={
            source:'',
            link:''
          };
          s.source=data.data[i].source;
          s.link=data.data[i].link;
          this.uniqueSource.push(s);
        }
      }
    });
  }
  getValue(source){
   if(this.uniqueSource.length>0){
     for(let i=0;i<this.uniqueSource.length;i++){
       if(source==this.uniqueSource[i].source)
         return this.uniqueSource[i].link
     }
   }
    return '';
  }
  getArticle=()=>{
    this.articleService.getArticles(localStorage.getItem("userId")).subscribe(data=>{
      if (data.data.length) {
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
          };
          articleData._id=data.data[j]._id;
          articleData.image_url=data.data[j].image_url;
          articleData.source=data.data[j].source;
          var regExp =/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
          var match=regExp.test(data.data[j].link);
          if (match ) {
            articleData.playerVideo=true;
          }else{
            articleData.playerVideo=false;
          }
          articleData.link=data.data[j].link;
          articleData.game=data.data[j].game;
          articleData.team=data.data[j].team;
          articleData.upvote=data.data[j].upvoteCounter;
          articleData.created_date=data.data[j].created_date;
          articleData.published_date=data.data[j].published_date;
          articleData.title=data.data[j].title;
          articleData.description=data.data[j].description;
          articleData.league=data.data[j].league;
          articleData.type=data.data[j].type;
          articleData.visitor=data.data[j].visitor;
          articleData.updatedAt=data.data[j].updatedAt;
          this.articles.push(articleData);
        }
        if(data.data.length<30){
          this.loadedAll=true;
        }
        else{
          this.loadedAll=false;
        }

      } else {
        this.loadedAll = true;
      }
    });
    this.articleService.getHigherArticles().subscribe(data=>{

      if (data.data.length) {
        for (var j = 0; j < data.data.length; j++) {
          let articleData = {
            visitor: '',
            _id: '',
            title: '',
            description: '',
            image_url: '',
            playerVideo: false,
            source: '',
            game: '',
            league: '',
            team: '',
            link: '',
            created_date: '',
            published_date: '',
            type: '',
            upvote: 0,
            updatedAt: ''
          };
          ;


          articleData._id = data.data[j]._id;
          articleData.image_url = data.data[j].image_url;
          articleData.source = data.data[j].source;
          var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
          var match = regExp.test(data.data[j].link);
          if (match) {
            articleData.playerVideo = true;
          } else {
            articleData.playerVideo = false;
          }
          articleData.link = data.data[j].link;
          articleData.game = data.data[j].game;
          articleData.team = data.data[j].team;
          articleData.upvote = data.data[j].upvoteCounter;
          articleData.created_date = data.data[j].created_date;
          articleData.published_date = data.data[j].published_date;
          articleData.title = data.data[j].title;
          articleData.description = data.data[j].description;
          articleData.league = data.data[j].league;
          articleData.type = data.data[j].type;
          articleData.visitor = data.data[j].visitor;
          articleData.updatedAt = data.data[j].updatedAt;
          this.bannerArticles.push(articleData);
        }
      }
    });
    this.handleScroll();
  }
  addUpvote(id:string){
    this.articleService.upvoteArticle(id,localStorage.getItem("userId")).toPromise().then((response:any)=>{
      for(let i=0;i<this.articles.length;i++) {
        if (id == this.articles[i]._id) {
          this.articles[i].upvote = response.data.upvoteCounter;
          break;
        }
      }
      for(let i=0;i<this.bannerArticles.length ;i++) {
        if (id == this.bannerArticles[i]._id) {
          this.bannerArticles[i].visitor = response.data.upvoteCounter;
          break;
        }
      }
    });
  }
  showSeeMore(){
    document.body.classList.add('show_sidebar');
    document.getElementById("see_more").classList.add('d-none');
  }
  addVisitor=(id: String,link)=>{
    //  this.openYoutubeVideo(url);
    var url =link;
    if (url != undefined || url != '') {
      var regExp =/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      var match=regExp.test(link);
      if (match ) {
        this.articleService.addVisitor(id);
        setTimeout(()=>{
          for(let i=0;i<this.articles.length;i++) {
            if (id == this.articles[i]._id) {
              this.articles[i].visitor = this.articles[i].visitor + 1;
              break;
            }
          }
            for(let i=0;i<this.bannerArticles.length ;i++) {
              if (id == this.bannerArticles[i]._id) {
                this.bannerArticles[i].visitor = this.bannerArticles[i].visitor + 1;
                break;
              }
            }

        },1000);

        this.playVideo(link);
      }
      else {
        window.open(link,"_blank");
        this.articleService.addVisitor(id);
        setTimeout(()=>{
          for(let i=0;i<this.articles.length;i++) {
            if (id == this.articles[i]._id) {
              this.articles[i].visitor = this.articles[i].visitor + 1;
              break;
            }
          }
          for(let i=0;i<this.bannerArticles.length ;i++) {
            if (id == this.bannerArticles[i]._id) {
              this.bannerArticles[i].visitor = this.bannerArticles[i].visitor + 1;
              break;
            }
          }
        },1000);
        this.activeIframe=true;
      }
    }

  }

  addFavoriteArticle=(id: String) =>{

    this.articleService.addFavoriteArticle(id, localStorage.getItem("userId"));
    document.getElementById('successContainer').classList.remove('display-none');
    setTimeout(function () {
      document.getElementById('successContainer').classList.add('display-none');
    },3000);
  }

  applyFilter=(value)=> {
    if(value==''){
      this.getArticlesFlag=true;
      this.getUpvoteFlag= false;
      this.getViewedFlag =false;
      this.getArticle();
      return;
    }

    this.articleService.resetPaginate();
    this.articleService.applyFilter(value, localStorage.getItem("userId")).subscribe(response => {
      this.articles=[];
      this.arrangeArticles(response);
    });
  }
  applySourceFilter=(value)=> {
    if(value==''){
      this.getArticlesFlag=true;
      this.getUpvoteFlag= false;
      this.getViewedFlag =false;
      this.getArticle();
      return;
    }
    this.articleService.sourceApplyFilter(value, localStorage.getItem("userId")).subscribe(response => {
      this.articles=[];
      console.log(response);
      this.arrangeArticles(response);
    });
  }
  mostViewedArticles=()=> {
    this.articles=[];
    this.getViewedFlag=true;
    this.getUpvoteFlag=false;
    this.getArticlesFlag=false;
    this.articleService.resetPaginate();
    this.loadedAll=false;
    this.getViewedArticles();
  }
  mostRecentArticles=()=>{
    this.articleService.resetPaginate();
    this.articles=[];
    this.getArticlesFlag=true;
    this.getUpvoteFlag= false;
    this.getViewedFlag =false;

    this.getArticle();
  }
    mostUpvoteArticles=()=> {
    this.articles=[];
    this.getArticlesFlag=false;
    this.getUpvoteFlag=true;
      this.getViewedFlag =false;
    this.articleService.resetPaginate();
    this.getUpvoteArticles();
   this.loadedAll=false;
  }
  getViewedArticles(){
    this.articleService.mostViewedAticles().subscribe(response => {
      this.arrangeArticles(response);
      if(response.data.length<30)
        this.loadedAll=true;
      else
        this.loadedAll=false;
    });
  }
 getUpvoteArticles(){
   this.articleService.mostUpvoteAticles().subscribe(response => {
     this.arrangeArticles(response);
     if(response.data.length<30){
       this.loadedAll=true;
     }
     else{
       this.loadedAll=false;
     }
   });
  }
  arrangeArticles(data){
    for (var j = 0; j < data.data.length; j++) {
      let articleData = {
        visitor: '',
        _id: '',
        title: '',
        description: '',
        image_url: '',
        playerVideo: false,
        source: '',
        game: '',
        league: '',
        team: '',
        link: '',
        created_date: '',
        published_date: '',
        type: '',
        upvote: 0,
        updatedAt: ''
      };
      ;


      articleData._id = data.data[j]._id;
      articleData.image_url = data.data[j].image_url;
      articleData.source = data.data[j].source;
      var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      var match = regExp.test(data.data[j].link);
      if (match) {
        articleData.playerVideo = true;
      } else {
        articleData.playerVideo = false;
      }
      articleData.link = data.data[j].link;
      articleData.game = data.data[j].game;
      articleData.team = data.data[j].team;
      articleData.upvote = data.data[j].upvoteCounter;
      articleData.created_date = data.data[j].created_date;
      articleData.published_date = data.data[j].published_date;
      articleData.title = data.data[j].title;
      articleData.description = data.data[j].description;
      articleData.league = data.data[j].league;
      articleData.type = data.data[j].type;
      articleData.visitor = data.data[j].visitor;
      articleData.updatedAt = data.data[j].updatedAt;
      this.articles.push(articleData);
    }
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
  openYoutubeVideo=(url)=>{
    this.youtubeVideo=url;
  }
  handleScroll(): void {
    window.onscroll = () => this.detectBottom();
  }

  detectBottom(): void {

    if ((window.innerHeight + window.scrollY+50) >= document.body.offsetHeight) {
      if (!this.loadedAll) {
        if(this.articles.length>0){
          document.getElementById("loadingIcons").classList.remove('display-none');
          setTimeout(function () {
            document.getElementById("loadingIcons").classList.add('display-none');
          },600);
          this.articleService.paginatePage();
          if(this.getArticlesFlag)
            this.getArticle();
          if(this.getUpvoteFlag)
            this.getUpvoteArticles();
          if(this.getViewedFlag)
            this.getViewedArticles();
        }

      }
    }
  }
  playVideo(link){
    this.youtubeVideo=this.sanitizer.bypassSecurityTrustResourceUrl(link);
    this.activeIframe=false;
  }
  closeIframe(){
    this.activeIframe=true;
    document.getElementById('iframVideo').setAttribute('src','');
  }
  userChooseMoreSource(value){
    this.selectedSources=[];
    this.articles=[];
    this.articleService.selectSources(value).toPromise().then(response=>{
      if(response){
        this.articleService.selectedSource().subscribe(data=>{
          if(data){
            for(let i=0;i<data.data.length;i++){
              let s={
                source:''
              };
              s.source=data.data[i];
              this.selectedSources.push(s);
            }
          }
        });
        this.getArticlesFlag=true;
        this.getViewedFlag =false;
        this.getUpvoteFlag= false;
        this.getArticle();
      }
    });
  }
  userCrossSource(value){
    this.selectedSources=[];
    this.articles=[];
    this.articleService.unSelectSources(value).toPromise().then(response=>{
      if(response){
        this.articleService.selectedSource().subscribe(data=>{
          if(data){
            for(let i=0;i<data.data.length;i++){
              let s={
                source:''
              };
              s.source=data.data[i];
              this.selectedSources.push(s);
            }
          }
        });
      }
      this.getArticlesFlag=true;
      this.getUpvoteFlag= false;
      this.getViewedFlag =false;
        this.getArticle();
    });
  }

}
