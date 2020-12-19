var apiBaseURL = "http://localhost:3000";


function loadSources(userSavedSources) {
	var settings = {
	  "url": "http://localhost:3000/sources",
	  "method": "GET"
	}

	$.ajax(settings).done(function (response) {
		var allSources = response.results;
		var sourcesToParse = [];
		console.log(userSavedSources)

		allSources.forEach(x => {
			var isSelected = userSavedSources[x.source];
			if (isSelected === undefined) {
				isSelected = false;
			} else {
				isSelected = userSavedSources[x.source].isSelected;
			}

			sourcesToParse.push({
				name: x.source,
				isSelected
			})
		});

		$('#data-sources').empty();

		sourcesToParse.forEach(x => {
			var checked = '';
			if (x.isSelected) {
				checked = 'checked'
			}
			var checkbox = `<div class="form-check">
					            <input type="checkbox" data-name="${x.name}" class="source-check form-check-input" ${checked}>
					            <label class="form-check-label">${x.name}</label>
					        </div>`;

			$('#data-sources').append(checkbox);
		});

	});
}

function loadSidebar(sources) {
	$('#sources-container').empty();
	for (let i in sources) {
		let source = sources[i];

		if (!source.isSelected) {
			continue;
		}

		var item = `<a href="#" data-name="${i}" class="list-group-item source-select">${i}</a>`
		$('#sources-container').append(item);
	}

	$('.source-select').off("click").click(function() {
		var sourceName = $(this).data('name');
		loadSource(sourceName);
	});
}

function renderArticles(articles) {
	articles.forEach(function(article) {
		var article = `<div class="col-lg-4 col-md-6 mb-4">
			            <div class="card h-100">
			              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
			              <div class="card-body">
			                <h4 class="card-title">
			                  <a href="#">Item One</a>
			                </h4>
			                <h5>$24.99</h5>
			                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
			              </div>
			              <div class="card-footer">
			                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
			              </div>
			            </div>
			          </div>`
	});


	console.log(articles)
}

function loadSource(sourceName) {
	$('.source-select').removeClass('active');
	$('.source-select').each(function() {
		var thisName = $(this).data('name');
		if (thisName === sourceName) {
			$(this).addClass('active');
		}
	});

	var settings = {
	  "url": `http://localhost:3000/sources/${sourceName}`,
	  "method": "GET"
	}

	$.ajax(settings).done(function (response) {
		renderArticles(response.results);
	});


}

function loadSavedSettings() {
	chrome.storage.local.get({
		sources: {}
	}, function(items) {
		loadSidebar(items.sources);
		loadSources(items.sources);
		loadSource("all");
	});
}

function saveSettings() {
	var sources = {};
	$('.source-check').each(function() {
		var name = $(this).data('name');
		var isSelected = $(this).prop('checked');
		sources[name] = {};
		sources[name].isSelected = isSelected;
		console.log(name, isSelected);
	});
	chrome.storage.local.set({
		sources
	}, function() {
		// Reload
		$('#settingsModal').modal('hide')
		loadSavedSettings();
	});
}


$(document).ready(function() {
	loadSavedSettings();

	$('#settings-save').click(saveSettings);

	function startTime() {
	  var today = new Date();
	  var h = today.getHours();
	  var m = today.getMinutes();
	  var s = today.getSeconds();
	  m = checkTime(m);
	  s = checkTime(s);
	  document.getElementById('clock').innerHTML =
	  h + ":" + m;
	  var t = setTimeout(startTime, 500);
	}
	function checkTime(i) {
	  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	  return i;
	}

	startTime();
});

