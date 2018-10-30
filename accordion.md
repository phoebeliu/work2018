# accordion

https://angular-ui.github.io/bootstrap/#!#accordion

## Use 

```html
<div uib-accordion-group class="panel-default" heading="Dynamic Body Content">
    <!--此处heading传的是简单的字符串，绑定在scope上在下面的html里是{{heading}}的值-->
    
      <p>The body of the uib-accordion group grows to fit the contents</p>
      <button type="button" class="btn btn-default btn-sm" ng-click="addItem()">Add Item</button>
      <div ng-repeat="item in items">{{item}}</div>
    </div>

<div uib-accordion-group class="panel-default" is-open="status.isCustomHeaderOpen" template-url="group-template.html">
     <!--此处uib-accordion-heading会转为this.heading即control的heading值如果transclude 检测到control下面heading值出现会自动刷新-->
      <uib-accordion-heading>
        Custom template with custom header template <i class="pull-right glyphicon" ng-class="{'glyphicon-chevron-down': status.isCustomHeaderOpen, 'glyphicon-chevron-right': !status.isCustomHeaderOpen}"></i>
      </uib-accordion-heading>
      World
    </div>
```



## html&JS



```html
<div class="accordion-group">
  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>
    <!--accordion-transclude="heading" 这里只传了heading字符串，不懂为什么要啰嗦……-->
    <!--{{heading}} 这里是scope.heading-->
  <div class="accordion-body" collapse="!isOpen">
    <div class="accordion-inner" ng-transclude></div>  </div>
</div>
```

```js
// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', function($parse) {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/accordion/accordion-group.html',
    scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      var getIsOpen, setIsOpen;

      accordionCtrl.addGroup(scope);

      scope.isOpen = false;
      
      if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        scope.$parent.$watch(getIsOpen, function(value) {
          scope.isOpen = !!value;
        });
      }

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
            }
        if ( setIsOpen ) {
          setIsOpen(scope.$parent, value);
        }
      });
    }
  };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    compile: function(element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      };
    }
  };
})
// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});
```

