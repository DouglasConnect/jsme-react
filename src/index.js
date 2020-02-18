import './JSME_2017-02-26/jsme/jsme.nocache'
import React, { Component } from 'react'
// import styles from './styles.css'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

export default class Jsme extends React.Component {
  constructor(props) {
    super()
    console.log("test")
    this.myRef = React.createRef()
    if (props.hasOwnProperty("id")) {
      this.id = props.id
    }
    else {
      this.id = "jsme" + getRandomInt(1, 100000)
    }
  }
  componentDidMount() {
    jsmeApplet = new JSApplet.JSME(this.id, "380px", "340px");
  }

  componentWillUnmount() {
  }

  render() {
    return <div ref={this.myRef} id={this.id}>
      <p>{this.id}</p>
      </div>
  }
}
