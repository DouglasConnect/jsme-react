# jsme-react

This project wraps the BSD licensed [JSME molecule editor](https://peter-ertl.com/jsme/) (by B. Bienfait and P. Ertl) in a React component for easy use in React apps.

Please note that JSME was originally developed in Java and transpiled and you have to manually include it with a script tag in your HTML's head - this NPM library can't depend on it correctly and let your bundler take care of it because of how the JSME javascript is loaded.

## How to use

#### Step one: add a script tag to your HTML to load the upstream original or a local copy:

```html
<script src="https://peter-ertl.com/jsme/JSME_2017-02-26/jsme/jsme.nocache.js"></script>
```

#### Step two: add this library to your project

```bash
yarn add jsme-react
# or
npm install --save jsme-react
```

#### Step three: use the react component

```javascript
import Jsme from 'jsme'

export default class App extends Component {
  render () {
    return (
      <div>
        <Jsme/>
      </div>
    )
  }
}
```

# Development

Open two terminals, in one do `npm start` at the root level, in the other `npm start` in the example directory.


## License

BSD © [douglasconnect](https://github.com/douglasconnect)
