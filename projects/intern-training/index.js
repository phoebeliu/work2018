var toggleList = document.getElementById('toggleList');
var listDiv = document.querySelector('.list');
var descriptionInput = document.querySelector('input.description');
var descriptionP = document.querySelector('p.description');
var descriptionButton = document.querySelector('button.description');
var listUl = listDiv.querySelector('ul');
var addItemInput = document.querySelector('input.addItemInput');
var addItemButton = document.querySelector('button.addItemButton');
var lis = listUl.children;
var firstListItem = listUl.firstElementChild;
var lastListItem = listUl.lastElementChild;

firstListItem.style.backgroundColor = 'lightskyblue';
lastListItem.style.backgroundColor = 'lightsteelblue';

function attachListItemButtons(li) {
  var up = document.createElement('button');
  up.className = 'up';
  up.textContent = 'Up';
  li.appendChild(up);
  
  var down = document.createElement('button');
  down.className = 'down';
  down.textContent = 'Down';
  li.appendChild(down);  
  
  var remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);
}

for (var i = 0; i < lis.length; i += 1) {
  attachListItemButtons(lis[i]);
}

listUl.addEventListener('click', function(event){
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'remove') {
      var li = event.target.parentNode;
      var ul = li.parentNode;
      ul.removeChild(li);
    }
    if (event.target.className == 'up') {
      var li = event.target.parentNode;
      var prevLi = li.previousElementSibling;
      var ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
    }  
    if (event.target.className == 'down') {
      var li = event.target.parentNode;
      var nextLi = li.nextElementSibling;
      var ul = li.parentNode;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
    } 
  }
});

toggleList.addEventListener('click', function(){
  if (listDiv.style.display == 'none') {
    toggleList.textContent = 'Hide list';
    listDiv.style.display = 'block';
  } else {
    toggleList.textContent = 'Show list';                        
    listDiv.style.display = 'none';
  }                         
});

descriptionButton.addEventListener('click', function(){
  descriptionP.innerHTML = descriptionInput.value + ':';
  descriptionInput.value = '';
});

addItemButton.addEventListener('click', function(){
  var ul = document.getElementsByTagName('ul')[0];
  var li = document.createElement('li');
  li.textContent = addItemInput.value;
  attachListItemButtons(li);
  ul.appendChild(li);
  addItemInput.value = '';
});
  
  
  

  