var subreddit = "all";

var postHTML = `
<div>
<a href="{{url}}">{{title}}</a><br>
<b>Score: {{score}}</b><br>
<a href="https://www.reddit.com{{permalink}}">
{{#if comments}}
  {{comments}} comments
{{else}}
 No Comments
{{/if}}
</a> </div>`;

var template = Handlebars.compile(postHTML);
var context  = {url: "url", title: "Title"};

var postArray = [];


function loadSub(id){

if (id) {

subreddit = document.getElementById(id).value;

} else {

subreddit = subreddit;

}

getSubreddit(subreddit).then((response)=>{

  postArray = [];

response.data.children.map((post, index)=>{

var postData = {

  title : post.data.title,
  url : post.data.url, 
  comments : post.data.num_comments,
  score : post.data.score,
  permalink : post.data.permalink

}

//console.log(post.data);
postArray.push(template(postData));

});

console.log(postArray);

renderArray("container", postArray, true, "<br>");

});

}

function getSubreddit(subreddit){

var subredditURL = 'https://www.reddit.com/r/' + subreddit + '.json';

return  $.getJSON(subredditURL);

}

function renderArray(id, array, clearBeforeRender, splitter){

var container = document.getElementById(id);

if (clearBeforeRender == true){
  container.innerHTML = "";

}

if (splitter == null){
  splitter = "";
}

container.innerHTML = array.join(splitter);

}
//document.querySelector("#container").innerHTML = addThatDankData();
