//import './JSME_2017-02-26/jsme/jsme.nocache'
import React from 'react'
import styles from './styles.css'

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
  constructor() {
    super()
    this.myRef = React.createRef()
    this.id = "jsme" + getRandomInt(1, 100000)
  }

  handleJsmeLoad = () => {
      this.jsmeApplet = new window.JSApplet.JSME(this.id, "380px", "340px");
  }

  componentDidMount() {
    if (jsmeIsLoaded) {
      this.handleJsmeLoad()
    } else {
      jsmeCallbacks[this.id] = this.handleJsmeLoad
    }
  }

  componentWillUnmount() {
    jsmeCallbacks[this.id] = undefined;
  }

  render() {
    return <div ref={this.myRef} id={this.id}></div>
  }
}
