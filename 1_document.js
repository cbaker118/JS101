//create a <div>
var node = document.createElement('div');
//set it's id
node.id = "myDiv";

//div hasnt been added to dom tree, so this shouldn't work
document.getElementById('myDiv');

//add div as a child of the <body>
document.body.appendChild(node);


//get the element from the dom tree using the id
document.getElementsByTagName('div');

//get an attribute
node.getAttribute('id');

//remove div
body = document.body;
body.removeChild(node);

