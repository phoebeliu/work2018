# "`Object doesn't support property or method 'includes'`"

https://stackoverflow.com/questions/31340868/includes-not-working-in-all-browsers/31340895



If you look at the documentation of [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes), most of the browsers don't support this property.

You can use widely supported `indexOf()` after converting the property to string using `toString()`:

```js
if ($(".right-tree").css("background-image").indexOf("stage1") > -1) {
//                                           ^^^^^^^^^^^^^^^^^^^^^^
```

You can also use the polyfill from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes).

```js
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
```

