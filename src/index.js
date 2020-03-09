import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

let jsmeIsLoaded = false;
let jsmeCallbacks = {};

window.jsmeOnLoad = () => {
  Object.values(jsmeCallbacks)
    .forEach(f => f())
  jsmeIsLoaded = true;
}

export default class Jsme extends React.PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.id = "jsme" + getRandomInt(1, 100000)
    this.initialHeight = props.height
    this.initialWidth = props.width
    this.initialOptions = props.options
  }

  handleJsmeLoad = () => {
    if (this.initialOptions) {
      this.jsmeApplet = new window.JSApplet.JSME(this.id, this.initialWidth, this.initialHeight, { options: this.initialOptions } );
    }
    else {
      this.jsmeApplet = new window.JSApplet.JSME(this.id, this.initialWidth, this.initialHeight);
    }
    this.jsmeApplet.setCallBack("AfterStructureModified", this.handleChange);
  }

  handleChange(jsmeEvent) {
    if (this.props.onChange) {
      this.props.onChange(jsmeEvent.src.smiles())
    }
  }

  componentDidMount() {
    this.handleChange = this.handleChange.bind(this);
    if (jsmeIsLoaded) {
      this.handleJsmeLoad()
    } else {
      jsmeCallbacks[this.id] = this.handleJsmeLoad
    }

  }

  componentWillUnmount() {
    jsmeCallbacks[this.id] = undefined;
  }

  componentDidUpdate(prevProps) {
    if (this.jsmeApplet !== null) {
      if (this.props.height !== prevProps.height || this.props.width !== prevProps.width) {
        this.jsmeApplet.setSize(this.props.width, this.props.height)
      }
      if (this.props.options !== prevProps.options) {
        this.jsmeApplet.options({options: this.props.options})
      }
    }
  }

  render() {
    return <div ref={this.myRef} id={this.id}></div>
  }
}

Jsme.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  options: PropTypes.string,
  onChange: PropTypes.func
}
