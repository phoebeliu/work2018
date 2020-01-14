# $state go add promise

```js
var deferred = $q.defer();
$state.go('new').then(function() {
  setTimeout(function() {
    return deferred.resolve();
  },500);
});
Modal.showpopup('Processing', deferred.promise);
```

