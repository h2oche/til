import Rx from 'rx';
import $ from 'jquery';

let refreshButton = document.querySelector('.refresh');
let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var close1Button = document.querySelector('.close1');
var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');

let requestStream =
refreshClickStream
.startWith('startup click')
.map(() => {
	let randomOffset = Math.floor(Math.random() * 500);
	return 'https://api.github.com/users?since=' + randomOffset;
})
// .merge(Rx.Observable.just('https://api.github.com/users'));
// .startWith('https://api.github.com/users');

// let responseMetastream = requestStream.map(_requestURL => {
// 	return Rx.Observable.fromPromise($.getJSON(_requestURL));
// });

let responseStream = requestStream.flatMap(_requestURL => {
	return Rx.Observable.fromPromise($.getJSON(_requestURL));
});

var suggestion1Stream = close1ClickStream.startWith('startup click')
	.combineLatest(responseStream, (_evt, _listUsers) => {
			return _listUsers[Math.floor(Math.random()*_listUsers.length)];
		}
	)
  .merge(
    refreshClickStream.map(function(){ return null; })
  )
  .startWith(null);

suggestion1Stream
	.subscribe(_suggestion => {
		if(!_suggestion) {
			console.log('no suggestion');
			return;
		}
		$('.img1').attr('src', _suggestion.avatar_url);
		$('.name1').attr('href', _suggestion.html_url).html(_suggestion.login);
	});