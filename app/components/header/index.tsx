import * as React from 'react'
import * as reactStyles from 'react-css-modules'
const style = require('./style')



@reactStyles(style)
export default class Sample extends React.Component<{}, {}> {
  render() {
    return (
      <div styleName="header">
        <a
          styleName="link"
          href="https://github.com/praneshr/smart-react-boilerplate"
        >
          Fork me on Github
        </a>
      </div>
    )
  }
}
