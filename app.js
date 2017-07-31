const buildSingleResult = (result) => {
  const title = result.title;
  const snippet = result.snippet;
  const url = `https://en.wikipedia.org/wiki/${title}`;
  const singleResultHtml = `
        <a href=${url} alt=${title} target="_blank" class="list-group-item">
            <h4 class="result-title list-group-item-heading">${title}</h4>
            <p class="result-snippet list-group-item-text">${snippet}</p>
        </a>
    `;
  return singleResultHtml;
};

const buildAllResults = (resultsArray) => {
  for (let result = 0; result < resultsArray.length; result += 1) {
    $('div.results').append(buildSingleResult(resultsArray[result]));
  }
};

const searchWikipedia = (searchTerm) => {
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
      srlimit: '10',
      srqiprofile: 'classic',
    },
  })
    .done((data) => {
      const results = data.query.search;
      buildAllResults(results);
    })
    .fail((jqXHR, errorThrown) => {
      $('div.results').append(errorThrown);
    });
};

$('#search-box').keyup((event) => {
  if (event.keyCode === 13) {
    $('#search-button').click();
  }
});

$('#search-button').click(() => {
  $('div.results').html('');
  const thingToSearch = $('#search-box').val();
  searchWikipedia(thingToSearch);
});
