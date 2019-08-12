# [HTML of selected text](https://stackoverflow.com/questions/4176923/html-of-selected-text)

https://stackoverflow.com/questions/4176923/html-of-selected-text/4177234#4177234

```js
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}


// bind events for selection

document.addEventListener('mouseup', function(){
  var selectedHTML = getSelectionHtml();
  if( selectedHTML )
    console.log( selectedHTML )
});

document.addEventListener('keyup', function(e){ 
  var selectedHTML, key = e.keyCode || e.which; 
  if( key == 16 ){ // if "shift" key was released
    selectedHTML = getSelectionHtml();
    if( selectedHTML )
      console.log( selectedHTML )
  }
});
```

