# $viewContentLoaded triggered twice

https://stackoverflow.com/questions/31000417/angular-js-viewcontentloaded-loading-twice-on-initial-homepage-load

It is just specifics of uiView directive implementation. It fires the **$viewContentLoaded** event during initialization (link) phase. At this point no state is yet known, but the event is still fired.

And then after the event is fired again once the **$state** service actually resolves your **home** state, makes transition into it, loads templates etc.

So to sum up, it happens not because of bad configuration nor your templates are loaded twice. It's just how **uiView** works.

You can even verify it by completely commenting out your state definitions and most of your index.html contents (except for **ui-view** itself). The **$viewContentLoaded** will still be fired once.

Source code excerpts:

**uiView** directive declaration:

```js
{
    restrict: 'ECA',
    terminal: true,
    priority: 400,
    transclude: 'element',
    compile: function (tElement, tAttrs, $transclude) {
      return function (scope, $element, attrs) {
        ...
        updateView(true);
        ...
      }
    }
 }
```

and the **updateView** function

```js
    function updateView(firstTime) {
      ...
      currentScope.$emit('$viewContentLoaded');
      currentScope.$eval(onloadExp);
    }
```

For more information see complete source code on **GitHub** - [viewDirective.js](https://github.com/angular-ui/ui-router/blob/db68914cd6c821e7dec8155bd33142a3a97f5453/src/viewDirective.js)