pass function with arguments to angular directive

    scope: {
                        /*whether or not a popup view*/
                        popUp:'=',
                        /*pass the save func from popup view*/
                        popSaveFn:'&',
                        /*sync the save func params from popup view*/
                        popSaveParam:'='
                    },
                    controller: ['$scope', '$translate', '$filter', '$q', '$timeout', function ($scope, $translate, $filter, $q, $timeout) {
                        $scope.popUp = $scope.popUp ? $scope.popUp : false;
                        $scope.savePopUp =function(){
                            $scope.popSaveFn();
                        };

    pop-save-fn="addTo(filteredResult)"

1. copy the same function with param and pass on

1. Use the '&'
2. Call with no param
