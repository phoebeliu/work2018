# [How do I share $scope data between states in angularjs ui-router?](https://stackoverflow.com/questions/27696612/how-do-i-share-scope-data-between-states-in-angularjs-ui-router)

The state definition is unchanged:

```
$stateProvider
    // States
 .state("main", {
      controller:'mainController',
      url:"/main",
      templateUrl: "main_init.html"
  })  
  .state("main.1", {
      controller:'mainController',
      parent: 'main',
      url:"/1",
      templateUrl: 'form_1.html'
  })  
  .state("main.2", {
      controller:'mainController',
      parent: 'main',
      url: "/2",
      templateUrl: 'form_2.html'
  })  
```

But each state can have different controller. Why? because each `view` of each *state* gets `new`**instance** of defined `controller`. So while we have `mainController` like the one below, we can be sure, that if we navigate to state `'main.2'` it will be instantiated twice.

```
controller('mainController', function ($scope) {
  $scope.Model = $scope.Model || {Name : "xxx"};
})
```

But what we can see [here](http://plnkr.co/edit/cqx77pb4CDI2TXyESYGN?p=preview), is that we check if `$scope.Model` already exsits... and if not *(Parent state)* we instantiate it with **new intance** **{Name : "xxx"}**.

Well, what I am saying is: only parent state will init the `$scope.Model`. All others will get that already filled. How? Well here is the answer:

### [Scope Inheritance by View Hierarchy Only](https://github.com/angular-ui/ui-router/wiki/Nested-States-%26-Nested-Views#scope-inheritance-by-view-hierarchy-only)

> Keep in mind that scope properties only inherit down the state chain if the views of your states are nested. Inheritance of scope properties has nothing to do with the nesting of your states and everything to do with the nesting of your views (templates).
>
> It is entirely possible that you have nested states whose templates populate ui-views at various non-nested locations within your site. In this scenario you cannot expect to access the scope variables of parent state views within the views of children states.

So, as stated in the documentation. Because our child views are nested in the parent view, the scope is inherited.

### [Understanding Scopes](https://github.com/angular/angular.js/wiki/Understanding-Scopes)

> In AngularJS, a child scope normally prototypically inherits from its parent scope.
> ...
>
> Having a '.' in your models will ensure that prototypal inheritance is in play.

```
// So, use
<input type="text" ng-model="someObj.prop1"> 
// rather than
<input type="text" ng-model="prop1">.
```

And that's it. We get inheritance from `UI-Router` views and angular scopes, and because we smartly used a reference type (**Model**), i.e. do have `'.'` dot in `ng-model` definition - we can share data now

*NOTE: having dot '.' in the ng-model="Model.PropertyName simply means, that there is a \**reference** object Model {} with some property: PropertyName*

Check the [working example here](http://plnkr.co/edit/cqx77pb4CDI2TXyESYGN?p=preview)