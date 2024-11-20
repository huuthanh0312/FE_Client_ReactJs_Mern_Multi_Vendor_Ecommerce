import React, { lazy, Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { nProgressConfig } from './utils/nProgressConfig'
import store from './store'
const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'))

// Component displays ProgressBar when App is loading
const SuspenseFallback = () => {
  useEffect(() => {
    nProgressConfig.start() // Start loading bar when component is mounted
    return () => {
      nProgressConfig.done() // End loading bar when component is mounted
    }
  }, [])
  return null
}

root.render(

  <Provider store={ store }>
    <Suspense fallback={ <SuspenseFallback /> }>
      <App />
      <Toaster
        toastOptions={ {
          position: 'top-right',
          style: {
            background: '#283046',
            color: 'white'
          }
        } }
      />
    </Suspense>
  </Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
