# $state.go doesn't change the URL and $viewContentLoaded and $stateChangeSuccess and $locationChangeSuccess

首先state go 走完，state先不变，走完之后的方法后变state，变完state 走$viewContentLoaded 然后最后才会更改URL

after $state.go ,$state change and than $viewContentLoaded call and finially change the URL.

1.THIS IS WHY $state change but url not change,in the same controller call servel times $state.go

The problem was logic in my code, I was calling `$state.go` from another controller, then calling `$state.go` again (accidentally) in that controller. This was not a bug in UI-Router. 



2.if you want to change $state but not change URL

Pass the `{ location: false }` option to $state.go

```js
$state.go("home.foo", {}, { location: false } );
```

if you want not create a function, you can pass a object to the attribute "ui-sref-opts" like following:

```html
<a ui-sref="my-page" ui-sref-opts="{location:false}">My Page</a>
```

The following line (present in angular-ui-router.js) show the allowed attributes:

```js
var allowedOptions = ['location', 'inherit', 'reload', 'absolute'];
```

## $viewContentLoaded

触发在state 变化后

It happens after state changed

State transitions (and their promises) resolve *before the views are updated*.
To put it another way, the views are updated *in response to a successful state transition*.

Because of things like `ng-if` (turning ui-views off based on logic), template fetching for components (async), etc, we can't deterministically wait until "all the views are a rendered" to resolve the transition promise.

What version of ui-router are you using? In 1.0 you should be able to add a low priority `onSuccess`handler that is invoked **after** [the views are updated](https://github.com/ui-router/core/blob/8571ee281a16c16add841c6c57fcfedd1c788e36/src/hooks/views.ts#L28-L52).

```js
var trans = $state.go('foo').transition;
trans.onSuccess({}, function() { /** do stuff */ }, { priority: -1 });
```

Closing because this is expected behavior.

## $stateChangeSuccess

You can listen the event `$stateChangeSuccess` that is fired when the state transition is complete:

```js
$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    // your code here
});
```

This event fired only after controller is resolved and init method is done but not after view compilation success. 

[Check the UI Router doc about states and events](http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$state)

## $locationChangeSuccess

https://stackoverflow.com/questions/25872219/confusing-locationchangesuccess-and-statechangestart

