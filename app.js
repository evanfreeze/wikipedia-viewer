var thingToSearch;
var results;

const searchWikipedia = searchTerm => {
    jQuery.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      type: "GET",
      data: {
          "action": "query",
          "format": "json",
          "origin": "*",
          "prop": "",
          "list": "search",
          "indexpageids": "1",
          "srsearch": searchTerm,
          "srlimit": "10",
          "srqiprofile": "classic",
      },
    })
      .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);

results = data;

      for (var i = 0; i < results.query.search.length; i++) {
        var title = results.query.search[i].title;
        var snippet = results.query.search[i].snippet;
        var url = "https://en.wikipedia.org/wiki/" + title;
        $('div.results').append('<a href="' + url + '" alt="' + title + '" target="_blank" class="list-group-item"><h4 class="result-title list-group-item-heading">' + title + '</h4><p class="result-snippet list-group-item-text">' + snippet + '</p></a>');
      }


    })
      .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
    })
      .always(function() {
      console.log("HTTP Request Complete");
    });
};


$("#search-box").keyup(function(event){
    if(event.keyCode == 13){
        $("#search-button").click();
    }
});

$('#search-button').click(function() {
  $("div.results").html("");
  thingToSearch = document.getElementById('search-box').value;
  searchWikipedia(thingToSearch);

});
