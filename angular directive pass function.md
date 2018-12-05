# angular directive pass function

```html
<directives search-properties="{params:setQueryParams.getParams()}">
```

```js
if($scope.searchProperties){
    if($scope.searchProperties.validationFunc && _.isFunction($scope.searchProperties.validationFunc)){
        XXX = $scope.searchProperties.validationFunc;
    }
}
```

