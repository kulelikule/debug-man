import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import debugMan from './main'

debugMan.init('xux')

// debugMan.init({
//     password: 'xux'
// })

// debugMan.init('xux', (VConsole) => {
//     console.log(1)
// })

// debugMan.init({
//     password: 'xux', 
//     callback(VConsole) {
//         console.log(2)
//     }
// })

// debugMan.getVConsole().then(VConsole => {
//     new VConsole()
// })

class App extends Component {
    render() {
        return (
            <div id="aaa" style={{height: 150,background: '#eee'}}>123</div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
