import React from 'react'
import PropTypes from 'prop-types'
import {loadScript} from '../lib/helpers'

class SeerbitCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.checkout = this.checkout.bind(this)
    this.state = {
      ready: false
    }
  }

  componentDidMount() {
    if (this.props.scriptStatus) this.props.scriptStatus('loading')
    const scriptUrl = `https://checkout.seerbitapi.com/api/v${this.props.version}/seerbit.js`
    loadScript(scriptUrl, this.props.scriptId, r => this.notifyLoadScriptReady(r), e => this.notifyLoadScriptError(e))
  }

  notifyLoadScriptError(e) {
    if (this.props.scriptStatus) this.props.scriptStatus('fail: ' + e)
  }

  notifyLoadScriptReady() {
    this.setState({ready: true})
    if (this.props.scriptStatus) this.props.scriptStatus('ready')
  }

  checkout() {
    if (!this.state.ready) return false
    let seerbitOptions = {
      tranref: this.props.tranref,
      currency: this.props.currency,
      description: this.props.description,
      country: this.props.country,
      amount: this.props.amount,
      callbackurl: this.props.callbackurl,
      callback: this.props.callback,
      public_key: this.props.public_key,
      full_name: this.props.full_name,
      email: this.props.email,
      mobile_no: this.props.mobile_no,
      customization: this.props.customization,
      clientappcode: this.props.clientappcode
    }

    window.SeerbitPay(seerbitOptions, this.props.callback, this.props.close)
  }
  render() {
    const CTAElem = this.props.type
    return (
      <div className='seerbit-pay' id='seerbit-pay'>
        <CTAElem
          className={this.props.className}
          onClick={this.checkout}
          disabled={this.props.disabled}
          type={this.props.type === 'button' ? 'button' : null}
        >
          {this.props.title}
        </CTAElem>
      </div>
    )
  }
}

SeerbitCheckout.propTypes = {
  version: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  scriptId: PropTypes.string,
  currency: PropTypes.string,
  clientappcode: PropTypes.string,
  country: PropTypes.string,
  description: PropTypes.string,
  tranref: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  public_key: PropTypes.string.isRequired,
  callback: PropTypes.func,
  callbackurl: PropTypes.string,
  close: PropTypes.func,
  scriptStatus: PropTypes.func,
  full_name: PropTypes.string,
  email: PropTypes.string,
  mobile_no: PropTypes.string,
  customization: PropTypes.object
}

SeerbitCheckout.defaultProps = {
  title: 'Checkout',
  currency: 'NGN',
  type: 'button',
  version: '2',
  ClassName: '',
  scriptId: 'seerbit-reactjs',
  disabled: false
}

// export default SeerbitCheckout;
