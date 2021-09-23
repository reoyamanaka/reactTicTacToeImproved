// if a component has only a "render" method, just write it as a function component instead of as a class component
function Square(props) {
    return (
        <button className={"square " + (props.isWinning ? "square--winning" : null)} 
        onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;