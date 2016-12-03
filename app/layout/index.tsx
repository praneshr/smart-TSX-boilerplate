import * as React from 'react'
/* [5:1]
'bootstrap-global' is a webpack resolve alias.
*/
const Bootstrap = require('bootstrap-global')

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as reactStyles from 'react-css-modules'
import { APIs } from '../APIs/'
import Header from '../components/header'
import { actions } from '../actions'
const styles = require('./style')
import Footer from '../components/footer'

declare const Object: any

interface IProps {
  sample: {
    name: String;
  }
}

interface IUi {
  ui: IProps
}

interface IStates {
  reducer: Object;
}

export interface IActions {
  actions: {
    sampleApi: Function;
    sample: (payload: Object) => any;
  }
}

const uiStates: (states: IStates) => Object = states => ({
  ui: states.reducer,
})

const uiActions: (dispatch: any) => IActions = dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, actions, APIs),
    dispatch,
  ),
})


/* [33:1]
combining 'layout' styles and Bootstrap styles
to make it work with React CSS Modules.
*/
@reactStyles((Object).assign({}, styles, Bootstrap))
class Root extends React.Component<IUi & IActions, {}> {

  componentDidMount() {
    this.props.actions.sampleApi()
    .then(({ data }: any) => this.props.actions.sample(data))
  }

  render() {
    return (
      <div id="layout">
        <Header />
        <div styleName="page">
          <div styleName="container">
            {/* [56:14]
              You can also pass the states and actions as a props to the children.
              You need to replace the below line with:

              { React.cloneElement(this.props.children, {...this.props}) }

              By doing this you don't need to use @connect() in every component to retrive
              the states and the actions from redux.
              */}
            { this.props.children }
          </div>
        </div>
        <Footer name={this.props.ui.sample.name} />
      </div>
    )
  }
}

export default connect(uiStates, uiActions)(Root)