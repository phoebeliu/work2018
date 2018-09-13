# focus input and move by tab

伟大的BA同事又来搞事情。

需求：1.页面打开后自动将光标移到第一个input

​	     2.按tab键自动移动input 并按顺序。

解决一：

> 难点1）打开的是个popup，不知道什么时候document ready render完毕

> -->使用第三方插件接口 opened + 万能settimeout

```javascript
$scope.popUpModal = $modal.open({
    //https://angular-ui.github.io/bootstrap/#!#modal
    scope: $scope,
    windowClass: 'blabla',
    animation:true,
    template: html,
    backdrop: true
});
//focus first input
$scope.popUpModal.opened.then(function(){
    //opened (Type: promise) - Is resolved when a modal gets opened after downloading content's template and resolving all variables.
    setTimeout(function(){
        $('input[type!=hidden]:first').focus();
    },0);
    //nothing happen until add settimeout 
    //If all else fails, try a timeout. :)
});
```

解决二：

> 难点1）其中有input是有 on-blur 事件的！而且是blur一个检测从后台拿返回值，有promise弹框
>
> 难点2）如果校验成功，如果返回下一个input？不想hard code啊……

> —>在promise后用了setTimeout……万能
>
> -->参考Stack Overflow，先用了querySelectorAll选所有该用的元素，还需要object 转array     `[].slice.call(document.querySelectorAll("div"));`然后根据ID在数组中找到index，下一个元素focus方法，首次实现无jQuery。JavaScript万岁！！！

#### a)Convert NodeList to Array

```
var nodesArray = Array.prototype.slice.call(document.querySelectorAll("div"));
```

The result of the code above is a true Array object containing all of the nodes returned by the QSA.  You could even make the code shorter with this alternative:

```
var nodesArray = [].slice.call(document.querySelectorAll("div"));
```

Both snippets will give you an Array for which you can iterate over and do all those other awesome array things!

#### b)[Focus Next Element In Tab Index](https://stackoverflow.com/questions/7208161/focus-next-element-in-tab-index)

```javascript
focusNextElement: function () {
            //add all elements we want to include in our selection
            var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
            if (document.activeElement && document.activeElement.form) {
                var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
                function (element) {
                    //check for visibility while always include the current activeElement 
                    return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                });
                var index = focussable.indexOf(document.activeElement);
                if(index > -1) {
                   var nextElement = focussable[index + 1] || focussable[0];
                   nextElement.focus();
                }                    
            }
        }
```

```javascript
<input type="text" ng-model="blabla" ng-blur="onLicenseNumChange()">
    
$scope.onLicenseNumChange = function() {
    validateLicense(event.currentTarget.id);
    console.log(event.currentTarget.id);
}
function validateLicense(e) {
     //blabla

    thisisapromise.then(function(response){
        //blabla
        setTimeout(function() {
            focusNextElement(e);//after promise popup do this
        },0);
    });
}
function focusNextElement(e) {
    var focussableElements = 'input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),md-checkbox:not([disabled]):not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement) {
        // var focusAble = Array.prototype.filter.call(document.activeElement.querySelectorAll(focussableElements),
        var focusAble = [].slice.call(document.activeElement.querySelectorAll(focussableElements));
        //querySelectorAll be the Object we need to make object be array
       //Convert NodeList to Array
       //var nodesArray = [].slice.call(document.querySelectorAll("div"));
       //var nodesArray = Array.prototype.slice.call(document.querySelectorAll("div"));
        var indexItem = focusAble.findIndex(function(element){
            return element.id === e;
        });
        setTimeout(function() {
            focusAble[indexItem + 1].focus();
        },0);
    }
}
```

