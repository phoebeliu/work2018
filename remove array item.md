https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
I have an array of Numbers, and I'm using the .push() method to add elements to it.

Is there a simple way to remove a specific element from an array? The equivalent of something like array.remove(number);.


var array = [2, 5, 9];
console.log(array)
var index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}
// array = [2, 9]
console.log(array);
