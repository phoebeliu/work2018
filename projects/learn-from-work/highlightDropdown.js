$scope.filterColoredOption =function(item){
    return _.find(STPList, function(list){
        return list['a'] === item.value && list['n'] ===$scope.name;
    });
};
{/* <select type="text" ng-model="an" ng-change="">
    <option ng-repeat=" item in sss" value="{{item.key}}" ng-class="{'bg-option': filterColoredOption(item)}" ng-selected="item.key ==an">{{item.value}}</option>
</select> */}