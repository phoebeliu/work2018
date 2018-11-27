# WHAT IS THE DIFFERENCE BETWEEN COMPILE AND LINK FUNCTION IN ANGULARJS ?

#### http://www.pro-tekconsulting.com/blog/what-is-the-difference-between-compile-and-link-function-in-angularjs/

#### What is the difference between compile and link function in angularjs ?

In compile phase the angular parser starts parsing the DOM and whenever the parser encounters a directive it creates a function. These functions are termed as template or compiled functions. In this phase we do not have access to the $scope data. In the link phase the data i.e. ($scope) is attached to the template function and executed to get the final HTML output.

Compile – It works on template. It’s like adding a class element in to the DOM (i.e., manipulation of tElement = template element), hence manipulations that apply to all DOM clones of the template associated with the directive.

Link – It works on instances. Usually used for registering DOM listeners (i.e., $watch expressions on the instance scope) as well as instance DOM manipulation. (i.e., manipulation of iElement = individual instance element).



https://odetocode.com/blogs/scott/archive/2014/05/28/compile-pre-and-post-linking-in-angularjs.aspx

# Compile, Pre, and Post Linking in AngularJS