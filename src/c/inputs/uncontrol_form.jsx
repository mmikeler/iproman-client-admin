import { useRef, useState } from "react"
import { __ } from "../lang";
import checkIcon from "../../img/check-icon.png";
import { isJson } from "../fetch";
import { useContext } from "react";
import { AppContext } from "../../App";


export function UNCONTROL_FORM(props) {

  const { state } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [resultRequest, setResultRequest] = useState(null)
  const form = useRef();

  const submit = (e) => {
    setLoading(true)
    e.preventDefault()
    let data = new FormData(e.target)
    data.append('action', props.action || 'CALL_TO_SUPPORT')
    data.append('IPKEY', state.form.IPKEY)
    data.append('request_URL', window.location.hostname)
    data.append('userID', state.o.user.data.ID)

    props.theme && data.append('theme', props.theme)

    fetch(window.o.ajaxUrl, {
      method: 'POST',
      body: data,
      //mode: "no-cors"
    })
      .then(res => res.text())
      .then(res => {
        res === 'ok' ?
          setResultRequest(props.successMessage || __(169, 'Your message has been sent'))
          :
          setResultRequest(__(170, 'Error sending message. Try later.'))
        setLoading(false)
      })
      .catch(error => setLoading(false))
  }

  return (
    <form onSubmit={submit} className="uncontrol-form w100p d-flex justify-content-between" ref={form}>
      {props.children}
      <div className="delimeter"></div>

      {resultRequest &&
        <div className="alert alert-info d-flex col-12 col-md-8">
          <p>{resultRequest}</p>
          <button type="button" class="btn-close ps-3 ms-auto" onClick={() => setResultRequest(null)}></button>
        </div>
      }

      <button className="btn btn-with-icon green d-block ml-a">
        {loading ? __(188, 'Processing request') : props.btntext || __(120, 'Send a message')}
      </button>

    </form>
  )
}

export function UNC_INPUT(props) {

  const input = useRef()
  const [v, set] = useState(props.value)

  const setValue = (e) => {
    set(e.target.value)
  }

  return (
    <UNC_LABEL {...props} value={v}>
      <input
        onChange={setValue}
        ref={input}
        className="input"
        {...props} />
      <span className="small">{props.notice}</span>
    </UNC_LABEL>
  )
}

export function UNC_TEXTAREA(props) {

  return (
    <UNC_LABEL {...props}>
      <textarea className="input" {...props}></textarea>
    </UNC_LABEL>
  )
}

export function UNC_LABEL(props) {

  if (props.type === "hidden") return props.children

  return (
    <label className={`field`} style={{ width: props.width + '%' }}>
      <div className="header">
        <span className="label">{props.label}:</span>
        <div className="length">
          <div className="field-value-range">
            {props.min} - {props.maxLength}
          </div>
          <UNC_COUNTER {...props} />
        </div>
      </div>
      {props.children}
    </label>
  )
}

function UNC_COUNTER(props) {

  const length = props.value?.length
  let valid = length >= props.min && true

  return (
    <>
      {length}
      {valid && <img src={checkIcon} alt="" />}
    </>
  )
}