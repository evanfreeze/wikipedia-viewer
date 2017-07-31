const buildSingleResult = (result) => {
  const title = result.title;
  const snippet = result.snippet;
  const uriTitle = encodeURI(title);
  const url = `https://en.wikipedia.org/wiki/${uriTitle}`;
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
    $('.list-group').append(buildSingleResult(resultsArray[result]));
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
      srlimit: '6',
      srqiprofile: 'classic',
      sroffset: offset,
    },
  })
    .done((data) => {
      const results = data.query.search;
      buildAllResults(results);
    })
    .fail((jqXHR, errorThrown) => {
      $('.list-group').append(errorThrown);
    });
};

$('#search-box').keyup((event) => {
  if (event.keyCode === 13) {
    $('#search-button').click();
  }
});

$('#search-button').click(() => {
  $('.list-group').html('');
  const thingToSearch = $('#search-box').val();
  searchWikipedia(thingToSearch, '0');
});

let offset = 6;

$('.results button').click(() => {
  const thingToSearch = $('#search-box').val();
  searchWikipedia(thingToSearch, offset);
  offset += 6;
});
