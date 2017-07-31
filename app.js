const buildSingleResult = (result) => {
  const title = result.title;
  const snippet = result.snippet;
  const url = `https://en.wikipedia.org/wiki/${title}`;
  const singleResultHtml = `
      <div class="card">
        <div class="card-block">
          <h4 class="card-title">${title}</h4>
          <div class="card-text">
            ${snippet}
          </div>
        </div>
        <div class="card-footer">
          <a href=${url} target="_blank" class="card-link">Read More</a>
        </div>
      </div>
    `;
  return singleResultHtml;
};

const buildAllResults = (resultsArray) => {
  for (let result = 0; result < resultsArray.length; result += 1) {
    $('.card-deck').append(buildSingleResult(resultsArray[result]));
    $('.results').css('visibility', 'visible');
  }
};

const searchWikipedia = (searchTerm, offset) => {
  jQuery.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    type: 'GET',
    data: {
      action: 'query',
      format: 'json',
      origin: '*',
      prop: '',
      list: 'search',
      indexpageids: '1',
      srsearch: searchTerm,
      srlimit: '8',
      srqiprofile: 'classic',
      sroffset: offset,
    },
  })
    .done((data) => {
      const results = data.query.search;
      buildAllResults(results);
    })
    .fail((jqXHR, errorThrown) => {
      $('div.results').append(`<p>${errorThrown}</p>`);
    });
};

$('#search-box').keyup((event) => {
  if (event.keyCode === 13) {
    $('#search-button').click();
  }
});

$('#search-button').click(() => {
  $('.card-deck').html('');
  const thingToSearch = $('#search-box').val();
  searchWikipedia(thingToSearch, '0');
});

let offset = 8;
$('#more-results').click(() => {
  const thingToSearch = $('#search-box').val();
  searchWikipedia(thingToSearch, offset);
  offset += 8;
});
