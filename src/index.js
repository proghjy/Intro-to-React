import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for ( let i = 0; i < lines.length; i++ ) {
        const [a, b, c] = lines[i]
        if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
            return squares[a]
        }
    }
    return null
}

class Board extends React.Component {
    
    rednerSquare(i) {
        return <Square 
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                />
    }

    createSquares() {
        let rows = []
        for( let row=0; row<3; row++) {
            let cols = []
            for( let col=0; col<3; col++) {
                cols.push(this.rednerSquare(row*3 + col))
            }   
            rows.push(<div className='board-row'>{cols}</div>)
        }
        return <div>rows</div>
    }

    render() {
        return (
            this.createSquares()
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastPos: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        this.state.history[this.state.stepNumber].lastPos = i
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1];
        // current.lastPos = i
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares)
        var prev

        const moves = history.map( (step, move) => {
            const pos = prev ? "(" + (prev.lastPos%3 + 1) + ", "+ (Math.floor(prev.lastPos/3) + 1) + ")" : ""
            prev = step
            const desc = move ?
                'Go to move #' + move + pos :
                'Go to game start'
            return (
                <li key={move}>
                    <button onClick={ () => this.jumpTo(move)} style={move === this.state.stepNumber ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}>{desc}</button>
                </li>
            )
        })

        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            if (current.squares.includes(null)) {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
            } else {
                status = 'This game is a draw.'
            }
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)