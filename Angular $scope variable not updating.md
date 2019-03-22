```js
function focusError(error){
    if(error != null){
        $scope.screenObj.toggleValidationResults =false;
        $scope.screenObj.showingError = error;
        console.log('$scope.screenObj.showingError    '+$scope.screenObj.showingError.message);
        //$scope.$apply();
        //$scope.$apply(function () {
        //    $scope.screenObj.toggleValidationResults =false;
        //    $scope.screenObj.showingError = error;
        //});
    }
}
```

In this function some time the $scope.screenObj.showingError will update but some time don't.

i think because this is the pure js function althought it in the controller and some time it works.

so it need put the $scope change in the $apply.

But the error `Error: [$rootScope:inprog] $apply already in progress`

Error: $rootScope:inprog
Action Already In Progress
$digest already in progress
Description
At any point in time there can be only one $digest or $apply operation in progress. This is to prevent very hard to detect bugs from entering your application. The stack trace of this error allows you to trace the origin of the currently executing $apply or $digest call, which caused the error.

Background
Angular uses a dirty-checking digest mechanism to monitor and update values of the scope during the processing of your application. The digest works by checking all the values that are being watched against their previous value and running any watch handlers that have been defined for those values that have changed.

This digest mechanism is triggered by calling $digest on a scope object. Normally you do not need to trigger a digest manually, because every external action that can trigger changes in your application, such as mouse events, timeouts or server responses, wrap the Angular application code in a block of code that will run $digest when the code completes.

You wrap Angular code in a block that will be followed by a $digest by calling $apply on a scope object. So, in pseudo-code, the process looks like this:

element.on('mouseup', function() {
  scope.$apply(function() {
​    $scope.doStuff();
  });
});
where $apply() looks something like:

$apply = function(fn) {
  try {
​    fn();
  } finally() {
​    $digest();
  }
}
Digest Phases
Angular keeps track of what phase of processing we are in, the relevant ones being $apply and $digest. Trying to reenter a $digest or $apply while one of them is already in progress is typically a sign of programming error that needs to be fixed. So Angular will throw this error when that occurs.

In most situations it should be well defined whether a piece of code will be run inside an $apply, in which case you should not be calling $apply or $digest, or it will be run outside, in which case you should wrap any code that will be interacting with Angular scope or services, in a call to $apply.

As an example, all Controller code should expect to be run within Angular, so it should have no need to call $apply or $digest. Conversely, code that is being trigger directly as a call back to some external event, from the DOM or 3rd party library, should expect that it is never called from within Angular, and so any Angular application code that it calls should first be wrapped in a call to $apply.

Common Causes
Apart from simply incorrect calls to $apply or $digest there are some cases when you may get this error through no fault of your own.

Inconsistent API (Sync/Async)
This error is often seen when interacting with an API that is sometimes sync and sometimes async.

For example, imagine a 3rd party library that has a method which will retrieve data for us. Since it may be making an asynchronous call to a server, it accepts a callback function, which will be called when the data arrives.

function MyController($scope, thirdPartyComponent) {
  thirdPartyComponent.getData(function(someData) {
​    $scope.$apply(function() {
​      $scope.someData = someData;
​    });
  });
}
We expect that our callback will be called asynchronously, and so from outside Angular. Therefore, we correctly wrap our application code that interacts with Angular in a call to $apply.

The problem comes if getData() decides to call the callback handler synchronously; perhaps it has the data already cached in memory and so it immediately calls the callback to return the data, synchronously.

Since, the MyController constructor is always instantiated from within an $apply call, our handler is trying to enter a new $apply block from within one.

This is not an ideal design choice on the part of the 3rd party library.

To resolve this type of issue, either fix the api to be always synchronous or asynchronous or force your callback handler to always run asynchronously by using the $timeout service.

function MyController($scope, thirdPartyComponent) {
  thirdPartyComponent.getData(function(someData) {
​    $timeout(function() {
​      $scope.someData = someData;
​    }, 0);
  });
}
Here we have used $timeout to schedule the changes to the scope in a future call stack. By providing a timeout period of 0ms, this will occur as soon as possible and $timeout will ensure that the code will be called in a single $apply block.

So  after this i try timeout and it work

```js
function focusError(error){
    if(error != null){
        //console.log('$scope.screenObj.showingError    '+$scope.screenObj.showingError.message);
        //$scope.$apply();
        // $scope.$apply(function () {
        //     $scope.screenObj.toggleValidationResults =false;
        //     $scope.screenObj.showingError = error;
        // });
        $timeout(function() {
        	$scope.screenObj.toggleValidationResults =false;
        	$scope.screenObj.showingError = error;
        }, 0);
    }
}
```

