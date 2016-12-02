import * as React from 'react'
import * as reactStyles from 'react-css-modules'
const style = require('./style')
const banner = require('../../globals/assets/future.png')

@reactStyles(style)
export default class Intro extends React.Component<{}, {}> {

  render() {
    return (
      <div styleName="intro">
        <h1 styleName="heading">Smart TSX Boilerplate</h1>
        <img src={banner} alt="" />
      </div>
    )
  }
}
