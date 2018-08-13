
define(['xx.html', 'underscore'],
    function (templateStr, _) {
        'use strict';
        var classCodeId = 0;
        return [function () {
            return {
                restrict: 'AE',
                template: templateStr,
                scope: {
                    //
                },
                controller: ['$scope', '$q', '$modal', '$filter', '$timeout', function ($scope, $q, $modal, $filter, $timeout) {
                    var _height =0;
                    var inputValue = '';

                    init();
                    $scope.autoSuggestionList = [];

                    function init(){
                    }
                    function hideAutoComplete() {
                        $scope.showAC = false;
                        $(".auto-complete-warp").removeAttr('style');
                    }

                    $scope.clearUpAutoSuggestions = function() {
                        hideAutoComplete();
                        $scope.autoSuggestionList = [];
                    };

                    $scope.showAutoSuggestionList = function (onOff) {
                        return $scope.initAutoComplete && $scope.showAC && $scope.inputCharacter.text && $scope.inputCharacter.text.length > 2 &&
                            $scope.autoSuggestionList && $scope.autoSuggestionList.length > 0
                    };

                    $scope.enterEvent = function (event,val) {
                        $scope.inputCharacter.text = val;
                        $scope.openModal();
                        event.preventDefault();
                        event.stopPropagation();
                    };

                    $scope.enterKeyDown = function (event,element,inputText) {
                        var keycode = window.event?event.keyCode:event.which;
                        if(keycode==13){
                            $scope.enterEvent(event,inputText);
                        }
                    };

                    $scope.onBlurFunction = function () {
                        if($scope.onBlur && _.isFunction($scope.onBlur)){
                            return function(){
                                //
                                if(valueChanged){
                                    if(event.relatedTarget != null && (('class_code'+event.relatedTarget.id) == event.target.id)) {
                                        return;
                                    }
                                    if (event.relatedTarget === null) {
                                        if(document.activeElement != null && (('class_code'+document.activeElement.id) == event.target.id)) {
                                            return;
                                        }
                                    }
                                    $scope.clearUpAutoSuggestions();
                                //
                                }
                            }
                        } else {
                            return function (){};
                        }
                    }();
                    //adjust textarea height
                    $scope.$watch(function () {
                            if($('.input textarea').length > 0){
                                return $('.input textarea')[0].value;
                            }
                        },
                        function (newValue) {
                            if (!angular.isUndefined(newValue) && newValue.length > 0) {
                                if(dectIe){
                                    $timeout(function() {
                                        var scroll_height = $(".input textarea")[0].scrollHeight + 10;
                                        $(".input textarea").css('height', scroll_height + 'px');
                                    },0);
                                }else{
                                    var scroll_height = $(".input textarea")[0].scrollHeight - 10;
                                    $(".input textarea").css('height', scroll_height + 'px');
                                }
                            }
                        }
                    );
                    //adjust auto-complete height
                    //init close auto complete
                    $scope.initAutoComplete = $scope.enableAutoComplete || false;

                    function msieversion(){
                        var ua = window.navigator.userAgent;
                        var msie = ua.indexOf("MSIE ");// IE 10 or older
                        var trident = ua.indexOf('Trident/');// IE 11
                        var edge = ua.indexOf('Edge/');// Edge (IE 12+)
                        if (msie > 0 || trident > 0 || edge > 0) {
                            // If Internet Explorer, return version number
                            return true;
                        } else {
                            // If another browser, return 0
                            return false;
                        }
                    }

                    if($scope.initAutoComplete){
                        var checkId = $scope.$watch('Id',function (val) {
                            if(val){
                                $scope.inputId = 'code'+val;
                                Service.autoComplete('code'+val);
                                //this is service function 
                                //i will add this below
                                function _autoComplete(inputId){
                                
                                    $(document).on("blur", ".auto-complete-item.selected", function () {
                                        $(this).removeClass("selected");
                                    });
                                    function moveUp() {
                                        if($(".auto-complete span.auto-complete-item.selected").length==0){
                                            $(".auto-complete span.auto-complete-item:first-child").addClass("selected").focus();
                                        } else if ($(".auto-complete span.auto-complete-item.selected").prev("span").length > 0) {
                                            $(".auto-complete span.auto-complete-item.selected").removeClass("selected").prev("span").addClass("selected").focus();
                                        } else {
                                            $(".auto-complete span.auto-complete-item.selected").removeClass("selected");
                                            $("span.auto-complete-item:last-child").addClass("selected").focus();
                                        }
                            
                                    }
                            
                                    function moveDown() {
                                        if($(".auto-complete span.auto-complete-item.selected").length==0){
                                            $(".auto-complete span.auto-complete-item:first-child").addClass("selected").focus();
                                        } else if ($(".auto-complete span.auto-complete-item.selected").next("span").length > 0) {
                                            $(".auto-complete span.auto-complete-item.selected").removeClass("selected").next("span").addClass("selected").focus();
                                        } else {
                                            $(".auto-complete span.auto-complete-item.selected").removeClass("selected");
                                            $(".auto-complete span.auto-complete-item:first-child").addClass("selected").focus();
                                        }
                                    }
                                    function enterItem() {
                                        if(document.getElementById('auto-complete') && $(".auto-complete span.auto-complete-item.selected").length>0 ){
                                            $(".auto-complete span.auto-complete-item.selected").click();
                                        }
                                    }
                                    document.onkeydown = function (e) {
                                        switch (e.keyCode) {
                                            case 13:
                                                //console.log('enter');
                                                enterItem();
                                                break;
                                            case 38:
                                                //console.log('up');
                                                moveUp();
                                                break;
                            
                                            case 40:
                                                //console.log('down');
                                                moveDown();
                                                break;
                                        }
                                    };
                                }
                                //this is service function 
                                //i will add this up

                                //on blur move auto complete
                                document.onclick = function (evt) {
                                    var target = evt.target;
                                    if(document.getElementById('auto-complete') && target.id !== ('auto-complete' && $scope.inputId) ){
                                        $scope.clearUpAutoSuggestions();
                                    }else if(document.getElementById('auto-complete') && target.id == ('auto-complete' && $scope.inputId)){
                                        $scope.showAutoSuggestionList();
                                    }
                                };
                            }
                        });
                        function removeList(){
                            $timeout(function() {
                                if(!$(".auto-complete-warp").hasClass('auto-complete-height')){
                                    $(".auto-complete-warp").removeAttr('style');
                                }
                            }, 0);
                        }
                        $scope.onChange = function (text) {
                            if(validationPriorToQuery() == true){
                                if(text && text.trim().length > 2){
                                    getMatches(text).then(function (data) {
                                        $scope.autoSuggestionList = '';//
                                        if($scope.autoSuggestionList.length > 0){
                                            $timeout(function() {
                                                _height = $('.auto-complete').height() + 60;
                                                $(".auto-complete-height").css({'height':_height + 'px'});
                                            }, 0);
                                        }else{
                                            removeList();
                                        }

                                    });
                                } else {
                                    removeList();
                                    // $(".auto-complete-height").removeAttr('style');
                                }
                            }
                        };

                        var dectIe = msieversion();
                        if(dectIe){
                            var checkInputVal = $scope.$watch(function(){
                                if(document.getElementById($scope.inputId)){
                                    return document.getElementById($scope.inputId).value;
                                }
                            },function(newVal,oldVal){
                                if(newVal != oldVal && $scope.inputCharacter.text != newVal && newVal){
                                    $scope.inputCharacter.text = newVal;
                                    $timeout(function() {
                                        $scope.onChange($scope.inputCharacter.text);
                                    }, 500);
                                }
                            });
                        }
                    }

                    $scope.showAutoComplete = false;

                    function getMatches(searchText){
                        inputValue = document.getElementById($scope.inputId).value;
                        if(inputValue.length > 2){
                            //
                        }else {
                            $scope.showAutoComplete = false;
                        }
                    }

                }],
                link: function (scope, element, attrs, ctrls) {
                    scope.classCodeId = 'classCode' + classCodeId++;
                    element.on('focusin', function() {
                        scope.showAC = true; //init base parameter which will be used for displaying auto suggestion list
                        var target = element.find('#class_code'+scope.classCodeId);
                        if(target && target.length > 0){
                            target.unbind('blur').bind('blur',scope.onBlurFunction);
                            target.unbind('keydown').bind('keydown',function(event){
                                var keycode = window.event?event.keyCode:event.which;
                                if(keycode == 13){
                                    target.unbind('blur');
                                    scope.enterEvent(event,target.val());
                                }
                            });
                        }
                    });
                    
                }
            }
        }]
    }
);
