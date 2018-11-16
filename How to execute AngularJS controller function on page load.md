# [How to execute AngularJS controller function on page load?](https://stackoverflow.com/questions/15458609/how-to-execute-angularjs-controller-function-on-page-load)



```JS
$scope.$on('$viewContentLoaded', function() {
    //call it here
});
```

I could never get `$viewContentLoaded` to work for me, and `ng-init` should really only be used in an `ng-repeat` (according to the documentation), and also calling a function directly in a controller can cause errors if the code relies on an element that hasn't been defined yet.

This is what I do and it works for me:

```js
$scope.$on('$routeChangeSuccess', function () {
  // do something
});
```

Unless you're using `ui-router`. Then it's:

```js
$scope.$on('$stateChangeSuccess', function () {
  // do something
});
```

https://github.com/angular-ui/ui-router/issues/1768

## Events

- ### $viewContentLoaded

  Emitted every time the ngView content is reloaded.

  #### Type:

  emit

  #### Target:

  the current ngView scope