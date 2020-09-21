# jsme-react

This project wraps the BSD licensed [JSME molecule editor](https://peter-ertl.com/jsme/) (by B. Bienfait and P. Ertl) in a React component for easy use in React apps.

Please note that JSME was originally developed in Java and transpiled to Javascript. By modern Javascript standards it uses a few unconventional techniques to load. To accomodate this this library will perform a side effect when the component is being loaded in the browser of appending the script tag that loads the JSME Javascript entrypoint (which will then trigger a few more loads). This works with lazy loading of Javascript modules.

If for some reason you want this loading to happen at a specific (early) point in time you can call the setup function of this module which will perform the steps described above.

## How to use

#### Step one: add this library to your project

```bash
yarn add jsme-react
# or
npm install --save jsme-react
```

#### Step two: use the react component

```javascript
import { Jsme } from 'jsme'

export default class App extends Component {
  logSmiles(smiles) {
    console.log(smiles)
  }

  render () {
    return (
      <div>
        <Jsme height="300px" width="400px" options="oldlook,star"  onChange={this.logSmiles}/>
      </div>
    )
  }
}
```

## Props

Required props

* `height`: string, e.g. "300px"
* `width`: string, e.g. "400px"

Optional props
* `options`: string that is a comma separated string of JSME options. The available options are described on the [JSME documentation page](https://peter-ertl.com/jsme/JSME_2017-02-26/doc.html#JSME_API)
* `onChange`: event handler that is passed the smiles whenever it is changed in the editor
* `smiles`: the smiles to display (when not set an empty canvas will be shown)
* `src`: url of the jsme source code. Default value is `"https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js"`


# Development

Open two terminals, in one do `npm start` at the root level, in the other `npm start` in the example directory.


## License

BSD-3 © [EdelweissConnect](https://github.com/douglasconnect)
