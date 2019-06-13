# show code and copy

```html
<div class="col-sm-3 offset-sm-1">
    <button type="button" class="btn btn-outline-secondary  btn-block" onclick="copyToClipboard()">Generate</button>
</div>
								<pre>
                                        <code id="code">
    &lt;div class="form-wrapper"&gt;
                                        </code>
                                    </pre>
```

`<`--->`&lt;`

`>`--->`&gt;`

```js
<script>
    function copyToClipboard() {
        /* Get the text field */
        var copyText = document.getElementById("code");

        /* Select the text field */
        //copyText.select();
        var range = document.createRange();
        range.selectNode(copyText);
        window.getSelection().addRange(range);

        /* Copy the text inside the text field */
        //document.execCommand("copy");

        /* Alert the copied text */
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }
</script>
```

