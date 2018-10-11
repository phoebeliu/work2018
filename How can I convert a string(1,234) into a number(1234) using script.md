# [How can I convert a string(1,234) into a number(1234) using script?](https://stackoverflow.com/questions/19218819/how-can-i-convert-a-string1-234-into-a-number1234-using-script)

**with variable**

```javascript
var tempnum="1,234";
parseInt(tempnum.replace(/,/g,""));
```

**without variable**

```javascript
parseInt("1,234".replace(/,/g,""));
```

