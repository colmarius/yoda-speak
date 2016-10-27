const API = {
  yodaSpeak: "https://yoda.p.mashape.com/yoda?sentence=",
}

export function yodaTranslate (text, onResult) {
  fetch(API.yodaSpeak + encodeURI(text), {
    method: 'GET',
    headers: {
      "X-Mashape-Key": __MASHAPE_KEY__,
      "Accept": "text/plain",
    }
  }).then(function(response) {
    return response.text()
  }).then(function(translation) {
    if (onResult) onResult(translation);
  }).catch(function(ex) {
    console.log('API call failed', ex)
  });
}
