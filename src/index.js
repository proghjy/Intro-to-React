import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         value: null,
    //     }
    // }

    render() {
        return (
            // <button className="squear" onClick={function() { alert('click')}}></button>
            <button className="squear" onClick={() => this.props.onClick()}>
            {
                this.props.value
            }
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squears: Array(9).fill(null),
        }
    }

    handleClick(i) {
        const squears = this.state.squears.slice()
        squears[i] = 'X'
        this.setState({squears: squears})
    }
    
    rednerSquare(i) {
        return <Square 
                    value={this.state.squears[i]}
                    onClick={() => this.handleClick(i)}
                />
    }

    render() {
        const status = 'Next player: X'

        return (
            <div>
                <div className='status'>{status}</div>
                <div className='board-row'>
                    {this.rednerSquare(0)}
                    {this.rednerSquare(1)}
                    {this.rednerSquare(2)}
                </div>
                <div className='board-row'>
                    {this.rednerSquare(3)}
                    {this.rednerSquare(4)}
                    {this.rednerSquare(5)}
                </div>
                <div className='board-row'>
                    {this.rednerSquare(6)}
                    {this.rednerSquare(7)}
                    {this.rednerSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)