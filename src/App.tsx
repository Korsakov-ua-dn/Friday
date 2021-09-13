import React from 'react'
import './App.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './main/m1-UI/Main'
import store from './main/m2-BLL/store'

function App() {
  return (
    <div className="App">
          <HashRouter>
                <Provider store={store}>
                    <Main/>
                </Provider>
          </HashRouter>
    </div>
  )
}

export default App
