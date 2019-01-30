access ng transclude

没错，需求又来大面积的幺蛾子啦。所有页面的save button 大改。然后后续需求又有这种一言不合全局页面大改的问题，于是要求这次用directive包一下页面。以后页面级别的需求就可以优雅完成了。

那么开始了我的表演。

    define(['text!./templates/next-and-back.html', 'underscore','customerEdge/quoteandbind/common/util/CommonUtil'],
        function (templateStr, _,CommonUtil) {
            'use strict';
            return ['$compile','$state', function ($compile,$state) {
                return {
                    restrict: 'EA',
                    template: templateStr,
                    transclude: true,
                    scope: {
                        /*whether or not a popup view*/
                        popUp:'=',
                        /*pass the save func from popup view*/
                        popSaveFn:'&',
                        /*sync the save func params from popup view*/
                        popSaveParam:'=',
                        /*pass the next func from main view*/
                        nextFn:'&'
                    },
                    // compile: function (tElement, tAttrs, transclude) {
                    //     return function (scope, element, attrs) {
                    //         scope = scope.$new();
                    //         //scope.name = attrs.works1;
                    //         transclude(scope, function (clone) {
                    //             element.find('#replaceTransclude').append(clone);
                    //         });
                    //     };
                    // },
                    // controller: ['$scope', '$translate', '$filter', '$q', '$timeout','$element', '$attrs', '$transclude', function ($scope, $translate, $filter, $q, $timeout,$element, $attrs, $transclude) {
                    controller: ['$scope', '$translate', '$filter', '$q', '$timeout', function ($scope, $translate, $filter, $q, $timeout) {
                        $scope.popUp = $scope.popUp ? $scope.popUp : false;
                        //console.log($scope.$parent.$$prevSibling.$parent);
                        console.log($state);
                        $scope.savePopUp =function(){
                            $scope.popSaveFn();
                        };
                        $scope.nextMain =function(){
                            $scope.nextFn();
                        };
                        var socialFloat = document.querySelector('.fix-button-bottom');
                        var footer = document.querySelector('.global-footer');
    
                        function checkOffset() {
                            function getRectTop(el){
                                var rect = el.getBoundingClientRect();
                                return rect.top;
                            }
                            socialFloat = document.querySelector('.fix-button-bottom');
                            footer = document.querySelector('.global-footer');
                            if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10){
                                ///socialFloat.style.position = 'absolute';
                                socialFloat.classList.add("static-status");
                            }
    
                            if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop)){
                                socialFloat.classList.remove("static-status");
                                // socialFloat.style.position = 'fixed'; // restore when you scroll up
                            }
    
    
                            //socialFloat.innerHTML = document.body.scrollTop + window.innerHeight;
                        }
    
                        document.addEventListener("scroll", function(){
                           if(document.querySelector('.fix-button-bottom')){
                                checkOffset();
                            }
                        });
                        function detectmob() {
                            if(window.innerWidth >= 768) {
                                return false;
                            } else {
                                return true;
                            }
                        }
    
                        // $transclude(function(clone, $scope) {
                        //     //scope.name = $attrs.works2;
                        //     $element.find('#replaceTransclude').append(clone);
                        // });
                    }],
                    link: function(scope, element, attrs, ngModelCtrl) {
                        //scope.transcludeHtml = document.querySelector('#replaceTransclude').innerHTML;
                        // document.querySelector('#replaceTranscludeComponent').append(scope.transcludeHtml);
                        // document.querySelector('#replaceTranscludeComponent').removeAttribute("id");
                        // document.querySelector('#replaceTransclude').remove();
                       // element.find('#replaceTranscludeComponent').append(scope.transcludeHtml);
                        //element.find('#replaceTranscludeComponent').removeAttribute("id");
                        // element.find('mig-next-and-back') .insertAdjacentHTML('afterend', scope.transcludeHtml);
                        //element.find('#replaceTransclude').remove();
                        scope.readOnlyNew = false;
                        var  newLists =document.querySelectorAll('[gw-pl-input-ctrl=""]');
                        //gw-pl-ctrl-group=""
                        var  newLists2 =document.querySelectorAll('[gw-pl-ctrl-group=""]');
                        console.log(newLists);
                        console.log(newLists2);
                        // var att = document.createAttribute("newReadOnly");
                        // att.value = "readOnlyNew";
                        // newLists.forEach(function(item){
                        //     //copy.push(item);
                        //     item.setAttributeNode(att);
                        // });
                        // newLists2.forEach(function(item2){
                        //     //copy.push(item);
                        //     item2.setAttributeNode(att);
                        // });
    
                    }
                };
            }];
        }
    );
    

1.function 用‘&’

2.getBoundingClientRect()方法，以及checkOffset高级方法copy的十分有用。

    <ng-transclude >
    </ng-transclude>
    <div id="replaceTranscludeComponent"></div>
    <div class="wizard-section--content for-button-bottom" ng-if="!popUp">
        <div class="clearfix form-new-two-col-wrapper fix-button-wrap">
            <div class="page-buttons  fix-button-bottom">
                <button class="nbs-button orange-button back-button" ng-click="goToCancel()"><i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;Back</button>
                <button class="nbs-button orange-button next-button" ng-disabled="isAdvanceQuote" ng-click="nextMain()" >Next&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                <!--<button class="nbs-button orange-button next-button" ng-disabled="" ng-click="setNextState()" >Quote&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i></button>-->
            </div>
        </div>
    </div>
    <div ng-if="popUp" class="modal-footer">
        <div class="clearfix fix-button-wrap">
            <div class="page-buttons  fix-button-bottom">
                <button class="nbs-button orange-button next-button"  ng-click="savePopUp()" >Save & Close</button>
            </div>
        </div>
    </div>
    

在引用时就比较神奇了

<mig-next-and-back *next-fn=*"setNextState(objNew.aForm)">

在源代码里面是view 和 controller

然后这个view里面最外层包了这个directive

directive把包的内容放进ng-transclude

因为directive是isolate的scope 所以transclude最后也会分出来一个scope.

因此就是controller包的directive但是isolate一个scope和一个transclude scope.

如果是普通的变量绑定在controller上，就无法访问了，如果先起一个object,再加上去变量，那么在transclude中和controller中都可以用了，因为object是引用类型，即便内容是在transclude里，但是因为绑定在object上，所以父层controller里面仍然可以引用访问。

angular scope 变量都在object上才是王道啊
