# $state go add promise

```js
var deferred = $q.defer();
$state.go('new').then(function() {
  setTimeout(function() {
    return deferred.resolve();
  },500);
});
Modal.showpopup('Processing', deferred.promise);

//add empty fake promise
var deferred = $q.defer();
setTimeout(function() {
  return deferred.resolve();
},0);
deferred.promise.then(function(){
  console.log('no change here');
});
odal.showpopup('Processing', deferred.promise);
return deferred.promise;
```

