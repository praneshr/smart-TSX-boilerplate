import * as React from 'react'
import * as reactStyles from 'react-css-modules'

const styles = require('./style')

interface IProps {
  name: String;
}

@reactStyles(styles)
export default class Footer extends React.Component<IProps, {}> {

  render() {
    return (
      <div styleName="footer">
        Made with <span styleName="heart">♥</span> by
        <a href="http://github.com/praneshr"> {this.props.name}</a>
      </div>
    );
  }
}
