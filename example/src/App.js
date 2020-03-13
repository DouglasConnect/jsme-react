import React, { Component } from 'react'

import Jsme from 'jsme'

export default class App extends Component {
  logSmiles(smiles) {
    console.log(smiles)
  }
  render () {
    return (
      <div>
        <Jsme height="300px" width="400px" options="oldlook,star" onChange={this.logSmiles} />
        <Jsme height="300px" width="600px" smiles="CC=O" onChange={this.logSmiles}/>
      </div>
    )
  }
}
