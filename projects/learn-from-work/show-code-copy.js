var AApp = angular.module('hhh', ['ngclipboard'])
    // .run(function($templateCache) {
    //     $templateCache.put('inputTemp.html', '/directive/templates/inputTemp.html');
    // })
    .controller( "ACtrl", ['$scope','$templateCache','$http',function($scope,$templateCache,$http) {
        // init = function(){
        //     console.log("add event");
        //     new ClipboardJS('.copy-btn');
        //     console.log("add event end");
        // }();
        $scope.getTemplate = function(contentType) {
            var templateLoader,
            baseUrl = '/directive/templates/',
            templateMap = {
                text: 'inputTemp.html',
            };

            var templateUrl = baseUrl + templateMap[contentType];
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            return templateLoader;

        };
        $scope.copyToClip = function () {
            // /* Get the text field */
            // var copyText = document.getElementById("code");

            // /* Select the text field */
            // //copyText.select();
            // var range = document.createRange();
            // range.selectNode(copyText);
            // window.getSelection().addRange(range);

            var text_to_share = document.getElementById("code");
        
            // create temp element
            var copyElement = document.createElement("span");
            copyElement.appendChild(document.createTextNode(text_to_share));
            copyElement.id = 'tempCopyToClipboard';
            angular.element(document.body.append(copyElement));
        
            // select the text
            var range = document.createRange();
            range.selectNode(copyElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        
            // copy & cleanup
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            copyElement.remove();
        };
        $scope.componentCode = "";
        $scope.generateCode = function(type){
            return new Promise(function(resolve, reject) {
                switch (type){
                    case "text":
                        $scope.generateTextCode(function(html) {
                            $scope.componentCode = html;
                            resolve();
                        });
                        break;
                    // case "select":
                    //     $scope.componentCode = $scope.generateSelectCode();
                    //     break;
                    default:
                        console.log("not available");
                }
              }).then(function() {
                document.getElementById("code").innerText = $scope.componentCode;
              });
        };
        function replaceAll(str,mapObj){
            var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
        
            return str.replace(re, function(matched){
                return mapObj[matched];
            });
        }
        $scope.generateTextCode = function($callback){
            var codeTemplate = "";
            var loader = $scope.getTemplate('text');
            var promise = loader.success(function(html) {
                codeTemplate = html;
            }).then(function (response) {
                var mapObj = {
                    "A":tAAA
                };
                codeTemplate = replaceAll(codeTemplate,mapObj);
                $callback(codeTemplate);
                //return  codeTemplate;
            });;
            

        };
        
    }])