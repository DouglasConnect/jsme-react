import React from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

let jsmeIsLoaded = false;
const jsmeCallbacks = {};

// Export the setup function so that a user can override the super-lazy loading behaviour and choose to load it more eagerly.
export function setup(src = "https://peter-ertl.com/jsme/JSME_2017-02-26/jsme/jsme.nocache.js") {
  const script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);

  window.jsmeOnLoad = () => {
    Object.values(jsmeCallbacks)
      .forEach(f => f());
    jsmeIsLoaded = true;
  }
}

export class Jsme extends React.PureComponent {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
    this.id = "jsme" + getRandomInt(1, 100000)
  }

  handleJsmeLoad = () => {
    if (this.props.options) {
      this.jsmeApplet = new window.JSApplet.JSME(this.id, this.props.width, this.props.height, { options: this.props.options } );
    }
    else {
      this.jsmeApplet = new window.JSApplet.JSME(this.id, this.props.width, this.props.height);
    }
    this.jsmeApplet.setCallBack("AfterStructureModified", this.handleChange);
    this.jsmeApplet.readGenericMolecularInput(this.props.smiles)
  }

  handleChange = (jsmeEvent) => {
    if (this.props.onChange) {
      this.props.onChange(jsmeEvent.src.smiles())
    }
  }

  componentDidMount() {
    if (jsmeIsLoaded) {
      this.handleJsmeLoad();
    } else {
      if (!window.jsmeOnLoad) {
        setup(this.props.src);
      }
      jsmeCallbacks[this.id] = this.handleJsmeLoad;
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
      if (this.props.smiles !== prevProps.smiles) {
        this.jsmeApplet.readGenericMolecularInput(this.props.smiles)
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
  smiles: PropTypes.string,
  options: PropTypes.string,
  onChange: PropTypes.func,
  src: PropTypes.string,
}
