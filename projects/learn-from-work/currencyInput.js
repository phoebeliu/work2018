
define(['underscore'],function(_){
    'use strict';

    return ['$timeout', '$filter', '$parse', '$compile', '$locale', function($timeout, $filter, $parse, $compile, $locale){
        return {
            restrict: 'A',
            require: 'ngModel',
            controller : ['$scope',function($scope) {

            }],
            link: function($scope, $element, $attrs, $ngModel) {
                if (!$attrs['ngModel']) {
                    throw new Error('currency input requires ngModel!');
                }
                if (!/input/i.test($element[0].tagName)) {
                    throw new Error('currency input should be binded to input tag.');
                }
                var formatData = $parse($attrs.isFormat)($scope);
                if(formatData){
                var util = new Object();
                util.toFloat = function(str) {
                    if (angular.isNumber(str)){
                        return parseFloat(str, 10);
                    }
                    if (!angular.isString(str)) {
                        throw new TypeError('currency input should be a String, but was given ' + str);
                    }
                    str = str
                        .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'), '')
                        .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.CURRENCY_SYM), 'g'), '')
                        .replace(new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g'), '.');

                    return parseFloat(str, 10);
                };
                util.stringToRegExp = function(str, opt) {
                    return str.replace(/\./g,'\\.')
                        .replace(/\[/g, '\\[')
                        .replace(/\]/g, '\\]')
                        .replace(/\,/g, '\\,')
                        .replace(/\|/g, '\\|')
                        .replace(/\)/g, '\\)')
                        .replace(/\(/g, '\\(')
                        .replace(/\^/g, '\\^')
                        .replace(/\$/g, '\\$')
                        .replace(/\_/g, '\\_')
                        .replace(/\?/g, '\\?')
                        .replace(/\-/g, '\\-');
                };
                util.isValid = function(val) {
                    return angular.isNumber(val) && !isNaN(val);
                };
                util.preformatValue = function(val) {
                    if (!angular.isString(val)) {
                        return val;
                    }
                    val = val.replace($locale.NUMBER_FORMATS.CURRENCY_SYM, '');
                    var groupRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.GROUP_SEP), 'g'),
                        decimalRegex = new RegExp(this.stringToRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP), 'g');
                    var groupMatch = val.match(groupRegex), decimalMatch = val.match(decimalRegex);
                    if (groupMatch && groupMatch.length == 1 && (!decimalMatch || decimalMatch.length === 0)) {
                        return val.replace(groupRegex, '.');
                    }
                    if (decimalMatch && decimalMatch.length == 1 && (!groupMatch || groupMatch.length === 0)) {
                        return val.replace(decimalRegex, '.');
                    }
                    return val;
                };

                var opts = {
                    updateOn: 'blur enter',
                    updateOnDefault: false,
                    allowInvalid: false
                };
                // var opts = {
                //     updateOn: 'default blur enter',
                //     debounce: {default: 500, blur: 0,enter: 0}
                // };
                // var opts = {
                //     debounce: 500
                // };
                // var opts = {
                //     updateOn: 'blur enter'
                //     // updateOnDefault: false
                // };
                if ($ngModel.$options !== null && $ngModel.$options !== undefined) {
                    opts = $ngModel.$options.createChild(opts);
                }
                $ngModel.$options = opts;

                var filter = function(value){
                    return $filter('ecCurrency')(value,'$',',','roundup');
                };
                // var filter = $filter('currency');
                $ngModel.$formatters.push(function fromModelToView(value) {
                    // return filter(value);
                    if (util.isValid(value)) {
                        return filter(value);
                    } else {//let the dirty value in
                        return value;
                    }
                });
                var originValue;
                $ngModel.$parsers.push(function(value) {
                    if(value === ''){
                        return value;
                    }
                    // if(originValue !== undefined && value === originValue  ){
                    //     return value;
                    // }
                    originValue = value;
                    value = util.preformatValue(value);


                    // var currency = util.toFloat(filter(value));
                    // var currency = util.toFloat(value);
                    var currency = util.toFloat($filter('currency')(value));
                    if (util.isValid(currency)) {
                        $ngModel.$setViewValue(filter(currency));
                        // $ngModel.$setViewValue($filter('currency')(currency));
                        $ngModel.$render();
                        return currency;
                    } else {//use control group validation
                        // $ngModel.$setViewValue(originValue);
                        // $ngModel.$render();
                        return originValue;
                    }
                    // }
                });

                $element.on('blur', function(){
                    if ($ngModel.$viewValue == $ngModel.$modelValue) {
                        $element.val(filter($ngModel.$modelValue));
                    }
                    // if (util.isValid($ngModel.$viewValue) && $ngModel.$viewValue === $ngModel.$modelValue){//add valid otherwise will turn empty
                    // // if ($ngModel.$viewValue === $ngModel.$modelValue){
                    //     $element.val(filter($ngModel.$modelValue));
                    // }else if(!util.isValid($ngModel.$viewValue) && $ngModel.$viewValue === $ngModel.$modelValue){
                    //     $element.val($ngModel.$modelValue);
                    // }
                    // if($attrs.ngBlur){
                    //     $timeout(function () {
                    //         $parse($attrs.ngBlur)($scope);
                    //     });
                    // }
                });

                $element.on('focus', function(){
                    if (util.isValid($ngModel.$modelValue)) {
                        $ngModel.$setViewValue(String($ngModel.$modelValue));
                        $ngModel.$render();
                    }
                });


                // $ngModel.$validators.currency = function(modelValue) {
                //     return modelValue !== undefined;
                // };
                }

            }
        };
    }];


});