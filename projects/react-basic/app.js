// const title = React.createElement(
//     'h1',
//     //{id:'main-title',title:'this is a title',style:{color:'red'}},
//     {id:'main-title',title:'this is a title'},
//     'the first element'
// );
// // const desc = React.createElement(
// //     'p',
// //     null,
// //     'the first desc i created by react.createdom'
// // );
// const desc = <p>the first desc i created by react.createdom</p>;
// // const header = React.createElement(
// //     'header',
// //     null,
// //     title,desc
// // );
// const describetion = 'blablabla hahhaah';
// const titleId = 'main-title';
// const header = (
//     <header>
//     {/* comments are alse different */}
//         <h1 id={titleId}>this is a title</h1>
//         <p className="red">{describetion}</p>
//     </header>
// );
//console.log(title);
// function Header(){
//     return (
//         <header>
//             <h1>Scoreboard</h1>
//             <span className="stats">Players:1</span>
//         </header>
//     );
// }
const Header = () => {
    return (
        <header>
            <h1>Scoreboard</h1>
            <span className="stats">Players:1</span>
        </header>
    );
}
const Players = () => {
    return (
        <div className="player">
            <span className="player-name">liu</span>
            {/* <div className="counter">
                <button className="counter-action decrement"> - </button>
                <span className="counter-score">35</span>
                <button className="counter-action increment"> + </button>
            </div> */}
            <Counter></Counter>
        </div>
    );
}
const Counter = () => {
    return (
        <div className="counter">
            <button className="counter-action decrement"> - </button>
            <span className="counter-score">35</span>
            <button className="counter-action increment"> + </button>
        </div>
    );
}
const App = () =>{
    return (
        <div className="scoreboard">
            <Header></Header>
            <Players></Players>
        </div>
    )
}
ReactDOM.render(
    //<Header />,
    // <Players ></Players>,
    <App></App>,
    document.getElementById('root')
);
