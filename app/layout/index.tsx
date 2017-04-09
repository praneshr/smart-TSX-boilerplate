import * as React from 'react'
import * as reactStyles from 'react-css-modules'

import { actions } from '../actions'
import { APIs } from '../APIs/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/header'
import Footer from '../components/footer'

const Bootstrap = require('global-styles')
const styles = require('./style')

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
    { ...actions, ...APIs },
    dispatch,
  ),
})


@reactStyles({ ...styles, ...Bootstrap })
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