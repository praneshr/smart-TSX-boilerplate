declare const module: any
import 'bootstrap-sass'
import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import Router from './router'
import store from './store'


/*
This imports bootstrap styles globally.
*/

import './globals/styles/index.global.scss'

/*
By default, Bootstrap won't work with CSS modules. And I personally don't feel right to
use Bootstrap with CSS Modules because Bootstrap is meant to be global by default. If you
want to make it work with CSS modules, comment the above import and
see './layout/index 2:1'.
*/

const DefaultStore = store()

const renderNode = document.getElementById('app')

const renderIntoDOM = (Node: any) => {
  ReactDOM.render(
    <Provider store={DefaultStore}>
      <AppContainer>
        <Node />
      </AppContainer>
    </Provider>,
    renderNode,
  )
}
const renderPage = () => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./router.tsx', () => {
      /* eslint global-require: 0 */
      const NextRouter: any = require('./router.tsx').default
      renderIntoDOM(NextRouter)
    })
  }
  renderIntoDOM(Router)
}

renderPage()
