import {Component, Input, OnInit, OnChanges, HostListener, Output, EventEmitter} from '@angular/core';
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
  public filterFlags;
  public filterTag:String='';
  public filterLink:String='';
  private getArticlesFlag= false;
  private getUpvoteFlag= false;
  private getViewedFlag= false;
  public uniqueSource=[];
  public selectedSources=[];
  public unSelectedSources=[];
  public totalSource=[];

  public activate:boolean=false;
  public filter:boolean=false;

  public loadedAll:boolean=true;
  @Input() showMore;
  @Output()  sendShowMore:EventEmitter<any>= new EventEmitter();
  public activeIframe:boolean=true;
  public youtubeVideo:any;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.sendShowMore.emit(true);
  }
  constructor(private articleService: ArticleService,private sanitizer: DomSanitizer) {

  }
  @Input() favoriteArticle;
  @Input() newsApi;

  ngOnInit(): void {
    this.totalSource=[];
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

        this.articleService.unSelectedCustomSource().subscribe(response=>{
            for(let i=0;i<data.data.length;i++) {
              let s = {
                source: '',
                icon: ''
              };
              s.source = data.data[i].source;
              s.icon = data.data[i].icon;
              this.totalSource.push(s);
            }
          for(var j=0;j<response.data.length;j++){
            for(let i=0;i<data.data.length;i++) {
              let s = {
                source: '',
                icon: ''
              };
              s.source = data.data[i].source;
              s.icon = data.data[i].icon;
              if(response.data[j]==data.data[i].source){
                this.unSelectedSources.push(s);
                break;
              }
            }
          }

        })

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

   if(this.totalSource.length>0){
     for(let i=0;i<this.totalSource.length;i++){
       if(source==this.totalSource[i].source)
         return this.totalSource[i].icon;
     }
   }
    return '';
  }
  getsource(source){
    return source;
  }
  getArticle=()=>{
    console.log("getArticles",localStorage.getItem("userId"));
    this.articleService.getArticles(localStorage.getItem("userId")).subscribe(data=>{
      console.log("user daa",data);
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
            hot:false,
            veryHot:false,
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
          articleData.hot=data.data[j].hot,
            articleData.veryHot=data.data[j].veryHot,
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
            updatedAt: '',
            hot: false,
            veryHot: false
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
          articleData.hot = data.data[j].hot,
            articleData.veryHot = data.data[j].veryHot,
          articleData.visitor = data.data[j].visitor;
          articleData.updatedAt = data.data[j].updatedAt;
          this.bannerArticles.push(articleData);
        }
      }
    });
    this.handleScroll();
  }
  getBannerArticle(value:any){
    if(this.bannerArticles.length>value)
      return true;
    return false;
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

  closeFilterArticles(){
    this.filterFlags=!this.filterFlags;
    this.articles=[];
    // this.getArticlesFlag=true;
    this.applySourceFilter('');
  }


  showSeeMore(){
    document.body.classList.add('show_sidebar');
    document.getElementById("see_more").classList.add('d-none');
  }
  addVisitor=(id: String,link)=>{
    console.log("hello world");
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

    this.articleService.addFavoriteArticle(id, localStorage.getItem("userId")).subscribe((data)=>{
      if(data.message=="Already Add."){

        this.articleService.removeFavorite(id,localStorage.getItem("userId")).then((data)=>{
          if(data){}
        });
        document.getElementById('removeContainer').classList.remove('display-none');
        setTimeout(function () {
          document.getElementById('removeContainer').classList.add('display-none');
        },3000);
        return;
      }
      document.getElementById('successContainer').classList.remove('display-none');
      setTimeout(function () {
        document.getElementById('successContainer').classList.add('display-none');
      },3000);
    })

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
    this.getArticlesFlag= false;
    this.getUpvoteFlag= false;
    this.getViewedFlag= false;
    this.loadedAll=true;
    if(value==''){
      this.getArticlesFlag=true;
      this.getUpvoteFlag= false;
      this.getViewedFlag =false;
      this.getArticle();
      return;
    }
    this.filterTag=value;
    this.articleService.sourceApplyFilter(value, localStorage.getItem("userId")).subscribe(response => {
      this.articles=[];
       this.filterLink=response.data[0].link;
      this.arrangeArticles(response);
    });
  }
  applySourceFilter1=(value)=>{
  this.getArticlesFlag= false;
  this.getUpvoteFlag= false;
  this.getViewedFlag= false;
  this.loadedAll=true;

    this.filterFlags=true;
    this.filterTag=value;
    this.articleService.sourceApplyFilter(value, localStorage.getItem("userId")).subscribe(response => {
      this.articles=[];
      this.filterLink=response.data[0].link;
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
            this.unSelectedSources=[];
            this.articleService.unSelectedSource().subscribe(data=>{
              for(let i=0;i<data.data.length;i++) {
                  let s = {
                    source: '',
                    icon: ''
                  };
                  s.source = data.data[i].source;
                  s.icon = data.data[i].icon;
                this.unSelectedSources.push(s);
              }
              // if(data){
              //   this.articleService.unSelectedCustomSource().subscribe(response=>{
              //
              //     for(var j=0;j<response.data.length;j++){
              //       for(let i=0;i<data.data.length;i++) {
              //         if(response.data[j]==data.data[i].source){
              //           let s = {
              //             source: '',
              //             icon: ''
              //           };
              //
              //           break;
              //         }
              //       }
              //     }
              //
              //   })
              //
              // }
            });
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
            this.unSelectedSources=[];
            this.articleService.unSelectedSource().subscribe(data=>{
              if(data){
                this.articleService.unSelectedCustomSource().subscribe(response=>{
                  console.log(response);
                  console.log(data);
                  for(var j=0;j<response.data.length;j++){
                    for(let i=0;i<data.data.length;i++) {
                      if(response.data[j]==data.data[i].source){
                        let s = {
                          source: '',
                          icon: ''
                        };
                        s.source = data.data[i].source;
                        s.icon = data.data[i].icon;
                        this.unSelectedSources.push(s);
                        break;
                      }
                    }
                  }

                })

              }
            });
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
