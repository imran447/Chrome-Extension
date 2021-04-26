/*** Handle jQuery plugin naming conflict between jQuery UI and Bootstrap ***/

	$(document).on('click','li', function(){
			$(this).addClass('active').siblings().removeClass('active')
		})
		
		$(document).ready(function(){
			$(".button").click(function(){
			$(this).addClass('active');
			setTimeout(function(){
				$(".button").addClass("success");
			},100);
		});
	});
		function vsav() {
 				 	document.getElementById("right-check").classList.toggle('active');
				}

		function afs() {
 				 	document.getElementById("right-check").classList.toggle('active');
				}
				$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$.widget.bridge('uitooltip', $.ui.tooltip);

var sourceMapping = {
	"sport5": "source-1-data",
	"One": "source-2-data",
	"sport1": "source-3-data",
	"walla": "source-4-data",
	"Eurosport": "source-5-data",
	"Espn": "source-6-data",
	"Facebook": "source-7-data",
	"Walla": "source-8-data"
}

function loadSources() {
	var settings = {
	  "url": "http://64.227.26.41/sources/all",
	  "method": "GET"
	}

	$.ajax(settings).done(function (response) {
		var allSources = response.results;

		var source1 = []
		var source2 = [];
		var source3 = [];
		var source4 = [];
		var source5 = [];
		var source6 = [];
		var source7 = [];
		var source8 = [];
		allSources.forEach(source => {
			if (source.source === "sport5") {
				source1.push(source);
			}
			if (source.source === "one") {
				source2.push(source);
			}
			if (source.source === "sport1") {
				source3.push(source);
			}
			if (source.source === "walla") {
				source4.push(source);
			}
			if (source.source === "Eurosport") {
				source5.push(source);
			}
			if (source.source === "Espn") {
				source6.push(source);
			}
			if (source.source === "Facebook") {
				source7.push(source);
			}
			if (source.source === "Walla") {
				source8.push(source);
			}
		});



		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#scroll_dom').render(allSources, directives);

		// Source 1
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-1-data').render(source1, directives);

		// Source 2
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-2-data').render(source2, directives);

		// Source 3
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-3-data').render(source3, directives);

		// Source 4
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-4-data').render(source4, directives);

		// Source 5
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-5-data').render(source5, directives);

		// Source 6
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-6-data').render(source6, directives);

		// Source 7
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-7-data').render(source7, directives);

		// Source 8
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			}
		}

		$('#source-8-data').render(source8, directives);


		// Scroll DOm
		var directives = {
			'image_url': {
			  src: function(params) {
			    return this.image_url;
			  }
			},
			'link': {
			  href: function(params) {
			  	console.log(this);
			    return this.link;
			  },
			  text: function(params) {
			  	return params.value;
			  }
			},
			'image-source': {
			  src: function(params) {
			  	var sourceImgURL = '';
			  	var thisSource = this.source;
			  	if (thisSource === 'sport5') {
			  		sourceImgURL = 'images/sport5.png'
			  	}
			  	if (thisSource === 'one') {
			  		sourceImgURL = 'images/one.png'
			  	}
			  	if (thisSource === 'sport1') {
			  		sourceImgURL = 'images/sport1.png'
			  	}
			  	if (thisSource === 'walla') {
			  		sourceImgURL = 'images/walla.png'
			  	}
			  	if (thisSource === 'Eurosport') {
			  		sourceImgURL = 'images/Eurosport.png'
			  	}
			  	if (thisSource === 'Espn') {
			  		sourceImgURL = 'images/Espn.png'
			  	}
			  	if (thisSource === 'Facebook') {
			  		sourceImgURL = 'images/Facebook.png'
			  	}
			  	if (thisSource === 'Walla') {
			  		sourceImgURL = 'images/walla.png'
			  	}
			    return sourceImgURL;
			  }
			}
		}

		$('#scroll_dom').render(allSources, directives);

		console.log(allSources);

	});
}


$(document).ready(function () {
	loadSources();
	 function checkWidth() {
	        var windowSize = $(window).width();

	        if (windowSize <= 991) {
	            $('.tab-pane .home').removeClass('resizeslarge resizesmedium resizesmall')
	        }
	        else if (windowSize <= 1199) {
	            $('.tab-pane .home').removeClass('resizeslarge resizesmedium');
	            $('.tab-pane .home').addClass('resizesmall');
	        }
	        else if (windowSize <= 1599) {
	            $('.tab-pane .home').removeClass('resizeslarge resizesmall');
	            $('.tab-pane .home').addClass('resizesmedium');
	        }
	        else if (windowSize >= 1600) {
	            $('.tab-pane .home').removeClass('resizesmedium resizesmall');
	            $('.tab-pane .home').addClass('resizeslarge');
	        }
	    }

	    checkWidth();
	    $(window).resize(checkWidth);

	$('header .searchOptions input').focus(function(){
		$(this).parents('header').find('.searchOptions').addClass('search_active');

	});
	$('header .searchOptions input').focusout(function(){

		if($(this).val() == ''){
			$(this).parents('header').find('.searchOptions').removeClass('search_active');
		}
		else{
			$(this).parents('header').find('.searchOptions').addClass('search_active');
		}
	});



    $("#myBtn").click(function(){
         $('#myModal').modal('show');
    });

    $( ".sidebar_content" ).sortable();
    $( ".sidebar_content" ).disableSelection();

	//sidebar js
	$('.sidebar').hover(
	       function(){ $(this).addClass('sidebar_fixed_one') },
	       function(){ $(this).removeClass('sidebar_fixed_one') }
	)

	$('.sidebar_content a').click(function(){
		$('.sidebar_content a').removeClass("active");
		$(this).addClass("active");
	});

	$('.book-save a,.book_icon a').focus();

  	$('select:not(.ignore)').niceSelect();
  	//FastClick.attach(document.body);

	$(window).on("scroll",function(){
	    var scroll = $(window).scrollTop();
	    if (scroll >= 90) {
	    	$("#scroll_dom").slideDown();
	    	$('.small_desk').addClass('show').slideDown();
	    }
	});
	$('.see_more').click(function(){
		$("#scroll_dom").slideDown();z
		$('.small_desk').addClass('show').slideDown();
		$(this).hide();
		// $('main').animate({
	 //         scrollTop: $("#scroll_dom").offset().top
	 //     }, 1500);
	});
	$(function() {
	    $(window).bind('mousewheel', function(event, delta) {
	        $("#scroll_dom").slideDown();
	        $('.small_desk').addClass('show').slideDown();
	        $('.see_more').hide();
	        $('body').addClass('show_sidebar')
	        if (scroll >= 10) {
		    $("#scroll_dom").slideDown();
		    $('.small_desk').addClass('show').slideDown();
		    }
	        return false;
	    });
	});

  	// Add smooth scrolling to all links
  	$("a").on('click', function(event) {
	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();
	      // Store hash
	      var hash = this.hash;
	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 800, function(){
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    } // End if
 	 });

	$('.sidebar_content a').click(function(){
		if ($('.list_grop_position input').is(':checked')) {
			var tab_id = $(this).attr('data-tab');
			$('.sidebar_content a').removeClass('current');
			$('.tab_none_block').removeClass('current');
			$(this).addClass('current');
			$("#"+tab_id).addClass('current');
		}
		else{
			alert();
		}

	})


	$('.see_more').click(function(){
		$("body").addClass("show_sidebar");
	});
	$(window).on("scroll",function(){
	    var scroll = $(window).scrollTop();
	    if (scroll >= 150) {
	    	$("body").addClass("show_sidebar");
	    }
	})


  	$('.btn-default').tooltip();
  	$('.btn-custom').tooltip({
    	customClass: 'tooltip-custom',
    	trigger : 'hover'
  	});
  	$('.btn-custom-alt').tooltip({
    	customClass: 'tooltip-custom-alt',
    	trigger : 'hover'
  	});
  	$('.btn-custom')
});

function save() {
	document.getElementById("Save").classList.toggle('active');
}

function menu() {
 				 	document.getElementById("feed").classList.toggle('active');
 				 	document.getElementById("feed-menu").classList.toggle('active');
 				 	document.getElementById("featured-feed-menu").classList.toggle('active');
				}

				function openfilter() {
 				 	document.getElementById("filter").classList.toggle('active');
				}

				function closevideo() {
				  document.getElementById("videoplay").style.display = "none";
				}
				$.widget.bridge('uitooltip', $.ui.tooltip);
				const tebItems = document.querySelectorAll('sidebar_content_col');
	const tebContentItems = document.querySelectorAll('content-tab');


	$(function() {
		$('#home').on('click', function() {
			$('#featured-feed-menu').show();
			$('#feed-menu').show();
			$('#SaveForLater').hide();
	});
	});


		$(function() {
		$('#SaveArticle').on('click', function() {
			$('#SaveForLater').show();
			$('#featured-feed-menu').hide();
			$('#feed-menu').hide();
	});
	});

	function playButton() {
				  document.getElementById("videoplay").style.display = "flex";
				}

				function Notificationopen() {
 				 	document.getElementById("Notification").classList.toggle('active');
				}

					function abc() {
 				 	document.getElementById("googleapps").classList.toggle('active');
				}

				function Settingsopen() {
 				 	document.getElementById("Settings").classList.toggle('active');
				}

				function openNew() {
 				 	document.getElementById("broadcast_component").classList.toggle('is-open');
				}

$(document).ready(function(){
 function checkWidth() {
        var windowSize = $(window).width();

        if (windowSize <= 991) {
            $('.tab-pane .home').removeClass('resizeslarge resizesmedium resizesmall')
        }
        else if (windowSize <= 1199) {
            $('.tab-pane .home').removeClass('resizeslarge resizesmedium');
            $('.tab-pane .home').addClass('resizesmall');
        }
        else if (windowSize <= 1599) {
            $('.tab-pane .home').removeClass('resizeslarge resizesmall');
            $('.tab-pane .home').addClass('resizesmedium');
        }
        else if (windowSize >= 1600) {
            $('.tab-pane .home').removeClass('resizesmedium resizesmall');
            $('.tab-pane .home').addClass('resizeslarge');
        }
	}


    checkWidth();
    $(window).resize(checkWidth);

$('header .searchOptions input').focus(function(){
	$(this).parents('header').find('.searchOptions').addClass('search_active');

});
$('header .searchOptions input').focusout(function(){

	if($(this).val() == ''){
		$(this).parents('header').find('.searchOptions').removeClass('search_active');
	}
	else{
		$(this).parents('header').find('.searchOptions').addClass('search_active');
	}
});
});
(function(w,d,v3){
w.chaportConfig = {
  appId : '5fa2cb3fcd04ad197730779f'
};

if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss)})(window, document);
