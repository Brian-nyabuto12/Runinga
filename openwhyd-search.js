 var username = 'adrien'
 var callbackFctName = 'onOpenwhydData'
 var profileUrl = 'https://openwhyd.org/' + username +'?limit=99999&callback=' + callbackFctName

var allTracks = []

function indexTracks(tracks) {
  console.log('loaded', tracks.length, 'tracks')
  allTracks = tracks.map((tr) => Object.defineProperty(tr, '_name', {
    value: tr.name.toLowerCase() 
  }))
}

function search(query) {
  var results = []
  query = query.trim().toLowerCase() 
  var terms = !query ? [] : query.split(' ')
  console.log('query terms:', terms)
  if (terms.length) {
    results = allTracks.slice() 
    terms.forEach(function(term) {
      
      results = results.filter((res) => res._name.indexOf(term) !== -1)
    })
  }
  return results
}

var ui = (function(document, search){

  var searchBox = document.getElementById('search-box')
  var searchResults = document.getElementById('search-results')

  function clearResults() {
    searchResults.innerHTML = ''
  }

  function appendResult(result) {
    var a = document.createElement('a')
    a.href = 'https://openwhyd.org/c/' + result._id
    a.appendChild(document.createTextNode(result.name))
    var li = document.createElement('li')
    li.appendChild(a)
    searchResults.appendChild(li)
  }

  searchBox.onkeyup = function() {
    clearResults()
    var results = search(searchBox.value)
    if (!results || !results.length) {
      appendResult({ name: '(no results)' })
    } else {
      results.forEach(appendResult)
    }
  }

  return {
    clearResults: clearResults,
    appendResult: appendResult,
  }

})(document, search)

ui.appendResult({ name: '(loading tracks from openwhyd...)' })
window[callbackFctName] = function(json) {
  indexTracks(json)
  ui.clearResults()
  ui.appendResult({ name: '(loaded ' + allTracks.length + ' tracks from openwhyd! ^^)' })
}
var script = document.createElement('script')
script.src = profileUrl
document.body.appendChild(script)
