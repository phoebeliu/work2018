# angularjs transclusion scope access
https://stackoverflow.com/questions/14415241/angularjs-transclusion-scope-access
function Controller($element, $attrs, $transclude) {
    $transclude(function(clone, scope) {
        scope.name = $attrs.works2;
        $element.find('div').append(clone);
    });
}
http://angular-tips.com/blog/2014/03/transclusion-and-scopes/
app.directive('person', function() {
  return {
    restrict: 'EA',
    scope: {
      header: '='
    },
    transclude:true,
    link: function(scope, element, attrs, ctrl, transclude) {
      scope.person = {
        name: 'Directive Joe',
        profession: 'Scope guy'
      };
      
      scope.header = 'Directive\'s header';
      transclude(scope.$parent, function(clone, scope) {
        element.append(clone);
      });
    }
  };
});

# Pure Javascript listen to input value change
https://stackoverflow.com/questions/26946235/pure-javascript-listen-to-input-value-change
HTMLInputElementObject.addEventListener('input', function (evt) {
    something(this.value);
});

# Float Labels with CSS
https://css-tricks.com/float-labels-css/
<div>
  <input id="name" name="name" type="text" required>
  <label for="name">Your Name</label>
</div>
form > div {
  position: relative;
}
form > div > label {
  position: absolute;
}
input:focus + label {
  /* do something with the label */
}
form input:valid {
  background: white;
}



