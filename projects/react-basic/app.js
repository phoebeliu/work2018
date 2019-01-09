const title = React.createElement(
    'h1',
    //{id:'main-title',title:'this is a title',style:{color:'red'}},
    {id:'main-title',title:'this is a title'},
    'the first element'
);
const desc = React.createElement(
    'p',
    null,
    'the first desc i created by react.createdom'
);
const header = React.createElement(
    'header',
    null,
    title,desc
);
console.log(title);
ReactDOM.render(
    header,
    document.getElementById('root')
);
