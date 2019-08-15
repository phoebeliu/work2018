# [How can I construct a table header than spans multiple rows in HTML?](https://stackoverflow.com/questions/18680044/how-can-i-construct-a-table-header-than-spans-multiple-rows-in-html)

I would like to construct a table as follows:

```text
|   Major Heading 1    |  Major Heading 2    |
|   Minor1  |  Minor2  | Minor3  |  Minor4   |
----------------------------------------------
|   col1    |   col2   |   col3  |    col4   |
rest of table ...
```

```html
<table>
  <thead>
    <tr>
      <th colspan="2">Major 1</th>
      <th colspan="2">Major 2</th>
    </tr>
    <tr>
      <th>col1</th>
      <th>col2</th>
      <th>col3</th>
      <th>col4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data1</td>
      <td>data2</td>
      <td>data3</td>
      <td>data4</td>
    </tr>
  </tbody>
</table>
```

