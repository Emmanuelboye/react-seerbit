import React, { useState } from 'react';
import { loadScript } from './lib/helpers';

type Props = {
  tranref: string,
  public_key: string,
  amount: number,
  currency?: string,
  description?: string,
  country?: string,
  callbackurl?: string,
  full_name?: string,
  email?: string,
  mobile_no?: string,
  customization?: Object,
  clientappcode?: string,
  title?: string,
  type?: string,
  className?: string,
  scriptId?: string,
  version?: string,
  disabled?: boolean,
  callback?: Function,
  scriptStatus?: (status: string) => void,
  close?: Function
}

const SeerbitCheckout: React.FC<Props> = ({
  tranref,
  public_key,
  amount,
  currency='NGN',
  description,
  type='button',
  version='2',
  scriptId='seerbit-reactjs',
  disabled=false,
  title='Seerbit Checkout',
  email,
  full_name,
  mobile_no,
  country,
  callback,
  callbackurl,
  close,
  scriptStatus,
  customization,
  className='',
  clientappcode,
}: Props) => {
  const [ready, setReady] = useState(false);
  // let ready = false;

  function notifyLoadScriptError(error) {
    if (scriptStatus) scriptStatus('fail: ' + error)
  }

  function notifyLoadScriptReady() {
    // ready = true 
    setReady(true) 
    if (scriptStatus) scriptStatus('ready');
  }

  React.useEffect(() => {
    // document.addEventListener('DOMContentLoaded', () => {

      if (scriptStatus) scriptStatus('loading');
      const scriptUrl = `https://checkout.seerbitapi.com/api/v${version}/seerbit.js`
      loadScript(scriptUrl, scriptId, () => notifyLoadScriptReady(), e => notifyLoadScriptError(e))
    // });
  }, []);

  const handleCheckout = () => {
    if (ready === false) return false;
    let seerbitOptions = {
      tranref: tranref,
      currency: currency,
      description: description,
      country: country,
      amount: amount,
      callbackurl: callbackurl,
      callback: callback,
      public_key: public_key,
      full_name: full_name,
      email: email,
      mobile_no: mobile_no,
      customization: customization,
      clientappcode: clientappcode
    }
    window['SeerbitPay'](seerbitOptions, callback, close);
  }

  const CTAElem: any = type;

  return (
    <div className='seerbit-pay' id='seerbit-pay'>
      <CTAElem
        className={className}
        onClick={handleCheckout}
        disabled={disabled}
        type={type === 'button' ? 'button' : null}
      >
        {title}
      </CTAElem>
    </div>
  )
}

export default SeerbitCheckout;