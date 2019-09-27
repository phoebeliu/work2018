# flex width be 0 in IE

Finally after one and half day

i read every bug in this git artical.

https://github.com/philipwalton/flexbugs

After i set flex , in IE my content as width 0 ?!

i have no clue.

After i check every bug detail in the document. 

finally i think because this one !!!!

*Inline elements are not treated as flex-items*

my is not inline it is <td>.

i don't set particular display value on this. 

so after i set `display:blcok` on <td> every thing all right.

Also, if i set `float:left`on <td> will be right too.

DIE IE!!!



