# $setViewValue(value, trigger);
http://radify.io/blog/understanding-ngmodelcontroller-by-example-part-1/
When $setViewValue is called, the new value will be staged for committing through the $parsers and $validators pipelines. If there are no special ngModelOptions specified then the staged value is sent directly for processing through the $parsers pipeline. After this, the $validators and $asyncValidators are called and the value is applied to $modelValue. Finally, the value is set to the expression specified in the ng-model attribute and all the registered change listeners, in the $viewChangeListeners list are called.

In case the ngModelOptions directive is used with updateOn and the default trigger is not listed, all those actions will remain pending until one of the updateOn events is triggered on the DOM element. All these actions will be debounced if the ngModelOptions directive is used with a custom debounce for this particular event. Note that a $digest is only triggered once the updateOn events are fired, or if debounce is specified, once the timer runs out.

When used with standard inputs, the view value will always be a string (which is in some cases parsed into another type, such as a Date object for input[date].) However, custom controls might also pass objects to this method. In this case, we should make a copy of the object before passing it to $setViewValue. This is because ngModel does not perform a deep watch of objects, it only looks for a change of identity. If you only change the property of the object then ngModel will not realize that the object has changed and will not invoke the $parsers and $validators pipelines. For this reason, you should not change properties of the copy once it has been passed to $setViewValue. Otherwise you may cause the model value on the scope to change incorrectly.

In any case, the value passed to the method should always reflect the current value of the control. For example, if you are calling $setViewValue for an input element, you should pass the input DOM value. Otherwise, the control and the scope model become out of sync. It's also important to note that $setViewValue does not call $render or change the control's DOM value in any way. If we want to change the control's DOM value programmatically, we should update the ngModel scope expression. Its new value will be picked up by the model controller, which will run it through the $formatters, $render it to update the DOM, and finally call $validate on it.
```
$scope._onSetTime = function(newValue) {

    // ngModelCtrl.$setViewValue({
    //     ngModel: newValue
    // });
    // //ngModelCtrl.$setViewValue(newValue);
    // console.log($scope.ngModel);
    // $scope.ngModel.$setViewValue(newValue);
    // //$scope.ngModel = newValue;
    //ngModelCtrl.$setViewValue(newValue);
    //$scope.$apply();
    //
    $scope.ngModel = newValue;//because ngmodel value = undefined; from backend data
    //$scope.ngModel.$setViewValue(newValue);
    _tempModalInstance.close();
    $modalInstance.close();
    $scope.onSetTime();
};
