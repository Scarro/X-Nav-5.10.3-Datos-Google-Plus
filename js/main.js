// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyCrYFTdRQ2RlvWuIeNxZxC6NFplpamMLLk';

// Use a button to handle authentication the first time.
function handleClientLoad(username) {
	gapi.client.setApiKey(apiKey);
	makeApiCall(username);
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall(username) {
	console.log(user);
	gapi.client.load('plus', 'v1', function() {
	  var user = gapi.client.plus.people.get({
	    'userId': username,
	    // For instance: 
	    // 'userId': '+GregorioRobles'
	  });

	  var posts = gapi.client.plus.activities.list({
	  	'userId': username,
	  	'collection': 'public',
		'maxResults': 10
	  });

	  user.execute(function(resp) {
	    var heading = document.createElement('h4');
	    var image = document.createElement('img');
	    image.src = resp.image.url;
	    heading.appendChild(image);
	    heading.appendChild(document.createTextNode(resp.displayName));

	    document.getElementById('profile').appendChild(heading);
	  });

	  posts.execute(function(resp){
	  	resp.items.forEach(function(item, index){
	  		$('#posts').append('<li>' + item.title + '<a href="' + item.url + '">more...</a></li>');
	  		});
	  	});
	  	$('#posts').append('</ul>');
	});
}

$(document).ready(function(){
	$('#search').click(function(){
		$('#profile').empty();
		$('#posts').empty();
		handleClientLoad($('#user').val());
	});
})