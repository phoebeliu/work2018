# if else /switch case /lookup table /hash list

i am writing a react practice. i want to create a component like input ctrl.

so i need to render different input type include textera.

i was wondering ethier 'if else' quicker than 'switch case' or not.

so here is what i found out:

https://stackoverflow.com/questions/767821/is-else-if-faster-than-switch-case

>
>
>For just a few items, the difference is small. If you have many items you should definitely use a switch.
>
>If a switch contains more than five items, it's implemented using a lookup table or a hash list. This means that all items get the same access time, compared to a list of if:s where the last item takes much more time to reach as it has to evaluate every previous condition first.

`so it is switch case better than if else as you have 5 items.`

other than that, you need `hash list` or `lookup table`.

Ok...i need learn more.

https://stackoverflow.com/questions/9006111/is-there-a-simple-way-to-create-a-javascript-lookup-table

You can index prices in a two dimensional map on page load (with working [fiddle](https://jsfiddle.net/nuno_rafael_figueiredo/e5g1brom/)).

1) I put the select values in lookup-tables in case you have to preload them:

```js
var tables = {
    Colour: ["Blue", "Red"],
    Size: ["Small", "Medium", "Large"]
};
```

2) Here is your price table in array form:

```js
var array = [
    {Colour: "Blue", Size: "Small", Price: 45},
    {Colour: "Blue", Size: "Medium", Price: 48},
    {Colour: "Blue", Size: "Large", Price: 98},
    {Colour: "Red", Size: "Small", Price: 65},
    {Colour: "Red", Size: "Large", Price: 31}
];
```

3) Initializing selects (populating values and event 'change'):

```js
for (var key in tables)
    if (tables.hasOwnProperty(key)) {
        selects[key] = form[key];
        selects[key].addEventListener("change", updateSpan);

        var values = tables[key];
        len = values.length;
        for (i = 0; i < len; i++) {
            var option = document.createElement('option');
            option.appendChild(document.createTextNode(values[i]));
            form[key].appendChild(option);
        }
    }
```

4) Indexing your price table:

```js
len = array.length;
for (i = 0; i < len; i++) {
    var record = array[i];

    if (typeof map[record.Colour] === 'undefined')
        map[record.Colour] = {};

    map[record.Colour][record.Size] = record.Price;
}
```

5) Function updateSpan (on select change):

```js
function updateSpan() {
    var Colour = selects.Colour.options[selects.Colour.selectedIndex].value;
    var Size = selects.Size.options[selects.Size.selectedIndex].value;

    if (typeof map[Colour] !== 'undefined' && typeof map[Colour][Size] !== 'undefined')
        span.textContent = map[Colour][Size];
    else
        span.textContent = "Price not defined to Colour: " + Colour + " and Size: " + Size + ".";
}
```

6) Debugging (hit F12 in Chrome or Firefox to open Console View).

Full indexed table:

```js
console.log(map);
```

Just the price of 'Blue' & 'Small':

```js
console.log(map['Blue']['Small']); // outputs the value: 45
```

>
>
>- *Hashtable*: it's a data structure in which you can insert pairs of (key, value) in which the key is used to compute an hashcode that is needed to decide where to store the value associated with its key. This kind of structure is useful because calculating a hashcode is O(1), so you can find or place an item in constant time. (Mind that there are caveats and different implementations that change this performance slightly)
>- *Hashlist*: it is just a list of hashcodes calculated on various chunks of data. Eg: you split a file in many parts and you calculate a hashcode for each part, then you store all of them in a list. Then you can use that list to verify integrity of the data.
>- *Hashtree*: it is similar to a *hashlist* but instead of having a list of hashes you have got a tree, so every node in the tree is a hashcode that is calculated on its children. Of course leaves will be the data from which you start calculating the hashcodes.
>
>**Hashtable** is often useful (they are also called **hashmaps**) while **hashlists** and **hashtrees** are somewhat more specific and useful for exact purposes..

https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript

Use [JavaScript objects as associative arrays](http://blog.xkoder.com/2008/07/10/javascript-associative-arrays-demystified/).

> Associative Array: In simple words associative arrays use Strings instead of Integer numbers as index.

Create an object with

```js
var dictionary = {};
```

> Javascript allows you to add properties to objects by using the following syntax:

```js
Object.yourProperty = value;
```

An alternate syntax for the same is:

```js
Object["yourProperty"] = value;
```

If you can also create key to value object maps with the following syntax

```js
var point = { x:3, y:2 };

point["x"] // returns 3
point.y // returns 2
```

> You can iterate through an associative array using the for..in loop construct as follows

```js
for(var key in Object.keys(dict)){
  var value = dict[key];
  /* use key/value for intended purpose */
}
```

