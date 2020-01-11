# ng-transclude with ng-if

The `ngIf` directive works by using Angular's transclusion feature. What happens during the compile/link cycle is:

1. The content inside the `ngIf` is removed from the DOM when it is compiled
2. Angular runs the link functions. The `ngIf`'s link function is run before the link function of the directive using it. When `ngIf`'s link function runs, it uses `$scope.$watch()` to watch the value of the `ng-if` attribute.
3. Your directive's link function runs, at this point the content of the `ngIf` is not part of the DOM
4. The watch set up in step (2) is called, and `ngIf` will then call the `$transclude` function to insert the contents of the `ngIf` into the DOM if the `ng-if` attribute value is truthy.
5. Any watch functions, `$timeout` calls or use of `$scope.$evalAsync` that you registered in your directive's link function will run.

So if you want to access elements inside the `ngIf`'s content, the code needs to run *after* step 4 above. This means that any functions registered with `$scope.$watch`, `$timeout` or `$scope.$evalAsync` in your directive's link function will work. For a one-time piece of setup code, I would probably opt for `$scope.$evalAsync`:

```js
angular.directive('yourDirective', function () {
  return {
    ...
    link: function(scope, elem) {
      scope.$evalAsync(function () {
        // code that runs after conditional content
        // with ng-if has been added to DOM, if the ng-if
        // is enabled
      });
    }
  };
});
```