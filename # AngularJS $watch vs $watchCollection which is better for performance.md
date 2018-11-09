# [AngularJS $watch vs $watchCollection: which is better for performance?](https://stackoverflow.com/questions/26535415/angularjs-watch-vs-watchcollection-which-is-better-for-performance)

 https://stackoverflow.com/questions/26535415/angularjs-watch-vs-watchcollection-which-is-better-for-performance

**$watch()** will be triggered by:

```
$scope.myArray = [];
$scope.myArray = null;
$scope.myArray = someOtherArray;
```

**$watchCollection()** will be triggered by everything above AND:

```
$scope.myArray.push({}); // add element
$scope.myArray.splice(0, 1); // remove element
$scope.myArray[0] = {}; // assign index to different value
```

**$watch(..., true)** will be triggered by EVERYTHING above AND:

```
$scope.myArray[0].someProperty = "someValue";
```

**JUST ONE MORE THING...**

**$watch()** is the only one that fires when an array is replaced with another with the same exact content. For example:

```
$scope.myArray = ["Apples", "Bananas", "Orange" ];

var newArray = [];
newArray.push("Apples");
newArray.push("Bananas");
newArray.push("Orange");

$scope.myArray = newArray;
```

Below is a link to an example JSFiddle that uses all the different watch combinations and outputs log messages to indicate which "watches" were triggered:

<http://jsfiddle.net/luisperezphd/2zj9k872/>