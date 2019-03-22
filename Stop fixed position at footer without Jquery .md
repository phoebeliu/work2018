### Stop fixed position at footer without Jquery - CodePen

https://codepen.io/lionelpaulus/pen/YGXwxr

```html
<div class="social-float-parent">
    <div id="social-float">
        float...
    </div>
</div>
<div id="footer">
</div>
```

```css
div.social-float-parent { width: 100%; height: 1000px; background: #f8f8f8; position: relative; }
div#social-float { width: 200px; position: fixed; bottom: 10px; background: #777; }
div#footer { width: 100%; height: 200px; background: #eee; }
```

```js
var socialFloat = document.querySelector('#social-float');
var footer = document.querySelector('#footer');

function checkOffset() {
  function getRectTop(el){
    var rect = el.getBoundingClientRect();
    return rect.top;
  }
  
  if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10)
    socialFloat.style.position = 'absolute';
  if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop))
    socialFloat.style.position = 'fixed'; // restore when you scroll up
  
  socialFloat.innerHTML = document.body.scrollTop + window.innerHeight;
}

document.addEventListener("scroll", function(){
  checkOffset();
});
```

