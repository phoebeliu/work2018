# Focus after blur



```javascript
function focusNextElement(e) {
            var focussableElements = 'input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),md-checkbox:not([disabled]):not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"])';
            console.log('document.activeElement',document.activeElement,document.querySelector('body.modal-open'));
            if (document.activeElement || document.querySelector('body.modal-open')) {
                var focusAble;
                if(!document.activeElement){
                    console.log('body.modal-open',document.querySelector('body.modal-open'));
                    var documentActiveElement = document.querySelector('body.modal-open');
                    focusAble = [].slice.call(documentActiveElement.querySelectorAll(focussableElements));
                }else{
                    focusAble = [].slice.call(document.activeElement.querySelectorAll(focussableElements));
                }
                //console.log('2',document.activeElement.querySelectorAll(focussableElements));
                console.log('3',focusAble);
                // var indexItem = focusAble.findIndex(function(element){
                //     return element.id === e;
                // });
                //ie Object doesn't support property or method 'findIndex'
                var indexItem = _.findIndex(focusAble, function(element) { return element.id === e; });
                console.log('indexItem',indexItem);
                setTimeout(function() {
                    console.log(focusAble[indexItem + 1]);
                    focusAble[indexItem + 1].focus();
                },0);
            }
        }
```

项目里很多input都有blur的校验事件，这时候突然要求必须tab下去……我也是服了。为了这个失焦然后再找到，要把全部input编号入库了喽。这合适吗？有意义吗！

当然IE老朋友还是会展现他的垃圾之处：

> 1.document.activeElement为null.
>
> 解决：直接找body……
>
> 2.Object doesn't support property or method 'findIndex'
>
> 解决：用underscore!
>
> 3.ie 调试艰难……用console 解决……

