import React, { Component } from 'react'

import Jsme from 'jsme'

export default class App extends Component {
  render () {
    return (
      <div>
        <Jsme height="300px" width="400px" options="oldlook,star"/>
        <Jsme height="300px" width="600px"/>
      </div>
    )
  }
}
