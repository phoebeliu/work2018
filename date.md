# date

```js
$scope.$watch('ngModel', function (newVal, oldVal) {
  newValDate = moment(newVal).format("YYYY-MM-DD");

  if (oldVal !== newVal) {
    ngModelCtrl.$setDirty();
    if ((angular.isDate(newVal) || (angular.isDate(moment(newVal).format("MM/DD/YYYY"))) && !( (moment(newValDate).isBefore('1900-01-01')) || (moment(newValDate).isAfter('2100-12-31')) )) {
        //sometimes ngmodel apply date format'YYYY-MM-DD' which not type into but backend given
        //but requirement need not type into 'YYYY-MM-DD'
        //so how to allow backend given but deny type into 
        //i know this is all mess up but this is what i take over form  former coder. if i change this all over that require tester to test all the date time picker which deny by PM.TOO MUCH EFFORT.
     
        
        ngModelCtrl.$setValidity("inputVal", true);
    		$scope.dateModel = newVal;
  } else {
    ngModelCtrl.$setValidity("inputVal",false);
    $scope.dateModel = '';
  }
}else{
              $scope.dateModel = newVal;
              }
});
```

