# circle with text and grow

When there are un-read notifications and the number shows in the bell, the red icon should grow to fit the number of notifications. 

此乃需求，就是提示的那个圆圈小点里的数字，原来也就是1-99，现在出来100多咋个办，我迷茫了……

然后搜自适应圆圈，没……

然后说搜长宽一致，有了

equal height width css,但他的概念不是根据内里的文字增长长度的，于是GG

```css
.container {
    background-color: red;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative; /* If you want text inside of it */
}

/* If you want text inside of the container */
.text {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
```

然后我看了手机上的红点，发现里面1的时候明显是圆圈，59就是中间有拖长的半椭圆了，我豁然开朗！

吼吼吼吼

于是就把`width:1.4rem`改成`min-width:1.4rem`妥妥完成