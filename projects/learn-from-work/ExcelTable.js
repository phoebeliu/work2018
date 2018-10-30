define(['xx.html', 'underscore',
    function (templateStr, _) {
        'use strict';
        return ['$compile', function ($compile) {
            return {
                restrict: 'A',
                template: templateStr,
                transclude: true,
                scope: {
                    data:'=',
                    /**edit function from parent scope*/
                    editFunc: '=',
                    /**delete function from parent scope*/
                    deleteFunc: '=',
                    /**sorter function from parent scope*/
                    sorterFunc: '=',
                    /**change view param from parent scope*/
                    listView: '='
                },
                controller: ['$scope', '$filter', '$q', '$timeout', function ($scope, $filter, $q, $timeout) {
                    $scope.HMfilters = {
                        list: [],
                        dict: {}
                    };
                    function categorize(arr, field) {
                        var o = {},
                            r = [],
                            i, l = arr.length;
                        for (i = 0; i < l; i += 1) {
                            if (o[arr[i][field]]) continue;
                            var _o = {name:arr[i][field], checked:true};
                            o[arr[i][field]] = _o;
                            r.push(_o);
                        }
                        return {
                            list: r,
                            dict: o
                        };
                    };
                    function createHMfilter(arr, field) {
                        var cat = categorize(arr, field);
                        cat.field=field;
                        if ($scope.HMfilters.dict[field]) {
                            $scope.HMfilters.dict[field] = cat;
                            $scope.HMfilters.list.forEach(function(item) {
                                if(item.field == field){
                                    item.dict = cat.dict;
                                    item.list = cat.list;
                                    return;
                                }
                            });
                            return;
                        };
                        //cat.searchText = "";
                        $scope.HMfilters.dict[field] = cat;
                        $scope.HMfilters.list.push(cat);
                    }
                    function createColumns(){
                        for(var col,i=0,l=$scope.columns.length;i<l;i++){
                            col = $scope.columns[i];
                            if(col.filter != 'none'){
                                createHMfilter($scope.data, col.id);
                            }
                        }
                    }
                    $scope.showFilterTr =function(){
                        var deferred = $q.defer();
                        var thead = $('table thead');
                        var _cloumns = [],
                            _ref,
                            _i,
                            _len;
                        _ref = thead.find("th");
                        for (_i = 0, _len = _ref.length; _i <= _len - 1; _i++) {
                            var item ={};
                            item.id = $('table thead th').eq(_i).attr('attribute');
                            item.filter = $('table thead th').eq(_i).attr('filter');
                            item.class = $('table thead th').eq(_i).attr('class');
                            item.title = $('table thead th').eq(_i).html();
                            item.checked = false;
                            //item.selects = [];
                            //sortable
                            item.sortable = $('table thead th').eq(_i).attr('sortable');
                            _cloumns.push(item);
                        }
                        $scope.columns = _cloumns;
                        createColumns();
                        $scope.filterTableTr = $('.thead-filter');
                        deferred.resolve($scope.filterTableTr);
                        return deferred.promise;
                    };
                    $scope.replaceTable = function(){
                        var deferred = $q.defer();
                        var tbody = $('.table--replace tbody');
                        var _tds = [],
                            _ref,
                            _i,
                            _len;
                        _tds = tbody.find("td");
                        for (_i = 0, _len = _tds.length; _i <= _len - 1; _i++) {
                            //$('.table--replace tbody td').eq(_i).attr('at-implicit', '');
                            $('.table--replace tbody td').eq(_i).removeAttr('ng-repeat');
                        }
                        $scope.atTableTbody = $('.table--replace tbody').clone();
                        deferred.resolve($scope.atTableTbody);
                        return deferred.promise;
                    };
                    $scope.markAll = function(field, b) {
                        $scope.HMfilters.dict[field].list.forEach(function(x) {
                            x.checked = b;
                        });
                    };
                    $scope.itemFilter = function(field) {
                        var xfilter = $scope.HMfilters.dict[field];
                        // if (xfilter.searchText.length == 0) return xfilter.list;
                        // var rxp = new RegExp(xfilter.searchText, 'i');
                        // return xfilter.list.filter(function(item) {
                        //     return item.name.match(rxp);
                        // });
                        return xfilter.list;
                    };
                    $scope.rowFilter = function(item) {
                        var visible = true;
                        for(var cat,i=0,l=$scope.HMfilters.list.length;i<l;i++){
                            cat = $scope.HMfilters.list[i];
                            if(cat.dict[item[cat.field]] && !cat.dict[item[cat.field]].checked) {
                                return false;
                            }
                        }
                        return true;
                    };
                    $scope.$watchCollection('data',function(newVal,oldVal){
                        if(newVal != oldVal){
                            createColumns();
                            $timeout(function() {
                                $scope.filteredList = angular.copy($scope.data);
                            }, 0);
                        }
                    });
                    $scope.sortByColumn = function(sorterType,field){
                        if(field){
                            sorterType = sorterType ? '-' : '+';
                            $scope.sortorder = sorterType+field;
                        }
                    };
                }],
                link: function($scope, $element, $attrs, ngModelCtrl) {
                    $scope.stopWatch = true;
                    $scope.filteredList = angular.copy($scope.data);
                    $scope.showFilterTr();
                    var watchTable = $scope.$watch(function(){
                        if($('.table--replace').length > 0 && $('.table--replace tbody').length > 0){
                            return $('.table--replace tbody tr').eq(0)[0].children[0];
                        }

                    },function(newVal,oldVal){
                        if(newVal == oldVal){
                            if($scope.stopWatch) {
                                $scope.replaceTable().then(function () {
                                    $('mig-table-filter-table table').remove();
                                    $scope.stopWatch = false;
                                    watchTable();
                                });
                            }
                        }
                    });
                }
            };
        }];
    },
])
