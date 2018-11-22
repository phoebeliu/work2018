# angularjs convert directive to component

https://toddmotto.com/exploring-the-angular-1-5-component-method/

除了语法的一些区别，以及component都是默认isolated scope外，没有太大区别。

1.4版本

```js
.directive('counter', function counter() {
  return {
    scope: {},
    bindToController: {
      count: '='
    },
    controller: function () {
      function increment() {
        this.count++;
      }
      function decrement() {
        this.count--;
      }
      this.increment = increment;
      this.decrement = decrement;
    },
    controllerAs: 'counter',
    template: `
      <div class="todo">
        <input type="text" ng-model="$ctrl.count">
        <button type="button" ng-click="$ctrl.decrement();">-</button>
        <button type="button" ng-click="$ctrl.increment();">+</button>
      </div>
    `
  };
});
```

1.5版本

```js
.component('counter', {
  bindings: {
    count: '='
  },
  controller: function () {
    function increment() {
      this.count++;
    }
    function decrement() {
      this.count--;
    }
    this.increment = increment;
    this.decrement = decrement;
  },
  template: `
    <div class="todo">
      <input type="text" ng-model="$ctrl.count">
      <button type="button" ng-click="$ctrl.decrement();">-</button>
      <button type="button" ng-click="$ctrl.increment();">+</button>
    </div>
  `
});
```

2版本

```js
import {Component} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div class="todo">
      <input type="text" [(ngModel)]="count">
      <button type="button" (click)="decrement();">-</button>
      <button type="button" (click)="increment();">+</button>
    </div>
  `
})
export default class CounterComponent {
  constructor() {

  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}
```

https://juristr.com/blog/2016/06/from-ngcontroller-to-components/

The web has moved forward and so should you. Learn how to upgrade your Angular 1 app from a more MV* architecture to a cleaner, more component oriented approach. We will learn about how to refactor your code properly and about the new features introduced in Angular 1.5+ that will help you succeed along this path.

## Step 1: Remove/Avoid `$scope`

Ok, `$scope` was a central element in Angular since the beginning. It’s the glue between your Angular controller and the HTML template. Unfortunately scope is going away in Angular version 2+. There won’t be anything similar there. That’s why the “controller as” syntax has been introduced a while back also in Angular 1. So let’s do it. Here’s what [John Papa proposes in his popular Angular 1 styleguide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

```js
// before
angular.module('plunker')
  .controller('HomeController', function($scope) {
    $scope.message = 'Hi from home';
  });

// after
angular.module('plunker')
  .controller('HomeController', function() {
    var vm = this;
    vm.message = 'Hi from home';
  });
```

The “controller as” syntax also extends to the HTML. In the router configuration of our angular app, we add the `controllerAs` property and set it to `vm`.

```js
// before
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController'
      })
      ...

// after
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      ...
```

## Step 2: Convert your controller to a directive

How is our controller bound to the view? There are different possibilities, one is through the `ng-controller` tag in the HTML directly

Notice how we define a template and the corresponding controller. This is a very loose coupling. Theoretically we could use one controller for multiple HTML templates easily. That’s considered bad practice, though. Also, this hinders reusability, because one has to know which template and which controller belong together in order to be able to reuse them in another situation. So let’s change that and stick them together. How? By writing a directive and converting our controller into a directive controller. We have different options:

```js
.directive('home', function() {
  return {
    restrict: 'E',
    scope: {},
    template: 'home/home.html',
    controller: HomeController,
    controllerAs: 'vm'
  }
});

function HomeController() {
  ...
}
```

**Heads up:** We’re using an isolated scope (`scope: {}`) for our “components”, because we want them to be fully isolated.

Our routing gets simplified, in that it doesn’t have to know the template location and/or the controller, but simply the HTML tag `<home>`.

```js
$stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
```

That was easy, right.

## Step 3: Go further. Use Components!

Angular 1.5+ is the best Angular ever so far. Since [v1.5 they introduced the new `component` syntax](https://docs.angularjs.org/guide/component) which makes creating components super easy. Check out Todd Motto’s article on the topic:

We can also remove the `controllerAs` property. This is an optional one. Angular 1.5 components expose the controller to the view through the `$ctrl` property.

```js
// after
.component('home', {
    restrict: 'E',
    scope: {},
    templateUrl: 'home/home.html',
    controller: HomeController
  });
```

## Lifecycle hooks

Most remarkably a new set of lifecycle hooks have been introduced. Remember the following pattern suggested by [John Papa’s famous styleguide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)?

```
.component('home', {
    ...
    controller: HomeController
  });

function HomeController() {
  var vm = this;
  vm.message = '';

  activate();

  /////////////////////////

  function activate() {
    vm.message = 'Hi from home';
  }
}
```

The `activate` method can be seen like the constructor, a place where to group your controller’s initialization code. Well with the new component syntax, you can make use of the `$onInit` hook function.

```
function HomeController() {
  ...
  vm.$onInit = activate;

  /////////////////////////

  function activate() {
    vm.message = 'Hi from home';
  }
}
```

There are other hooks, like `$onChange`, `$onDestroy` and so on. Rather than going into those details by myself, check out Todd Motto’s awesome article on the matter:https://toddmotto.com/angular-1-5-lifecycle-hooks

## Component architecture

What we’ve seen so far are the technical details about how you implement components. It’s however important to also understand the concept behind a component oriented development approach.

The main concept is to define isolated and autonomous components, with a given responsibility and clearly defined contracts in terms of which data flows in and out. Generally speaking, **there are two main types of components** you usually create, and different people give name them differently:

- **smart components / stateful components** - These are components that coordinate a set of “dumb component”. They connect with Angular services, fetch data or get invoked through routings.
- **dumb components / stateless components** - These are responsible for the immediate visual feedback. They define input bindings and callbacks and render the data they receive. Usually they’re not necessarily coupled to the application and are highly reusable.

What you end with, is a so-called **component tree**, a set of nested components, starting from a top-level app component or root component.

So a “dumb component” (in every sense) in our sample app could look as follows:

```js
angular.module('plunker')
  .component('message', {
    bindings: {
      from: '<',
      msg: '<'
    },
    controller: MessageController,
    template: [
      '<p><strong>A message from {{ $ctrl.from }}:</strong></p>',
      '<p>{{ $ctrl.msg }}</p>'
    ].join('')
  });

  function MessageController() {}
```

While this article didn’t deep dive into this topic, but is rather intended to give you a first overview, [Tero Parviainen](https://twitter.com/teropa) has written an in-depth version some time ago: [Refactoring Angular apps to Component Style](http://teropa.info/blog/2015/10/18/refactoring-angular-apps-to-components.html)