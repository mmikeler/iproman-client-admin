import { AppContext } from "../../App";
import checkIcon from "../../img/check-icon.png";
import React, { useCallback, useContext } from "react";
import { Fetch } from "../fetch";
import { _f } from "../lang";
import { getFiledOptions } from "./fields-options";

export function Field(props) {

  const { state, dispatch } = useContext(AppContext);
  const f = _f(props.f)
  const v = state.form[f] ? state.form[f] : '';
  const fo = getFiledOptions(props)
  const min = props.min ?? fo.min
  const max = props.max ?? fo.max

  const change = (e) => {
    if (e.target.value.length > (max)) return

    dispatch({
      type: 'updateField',
      payload: {
        f: f,
        v: e.target.value,
        type: props.type
      }
    })
  }

  const onBlur = (e) => {
    Fetch(f, e.target.value)
  }

  const l = (getValue = false) => {
    let n = 0;
    if (f !== undefined && props.productIndex === undefined) {
      n = state.form[f]
      n = n !== undefined ? n.length : 0
    }
    else if (props.productIndex !== undefined && props.paramIndex !== undefined) {
      n = state.form.products[props.productIndex].params[props.paramIndex]
      n = n !== undefined ? n.length : 0
    }
    else if (props.productIndex !== undefined && f !== undefined) {
      n = state.form.products[props.productIndex][f]
      n = n !== undefined ? n.length : 0
    }
    else if (props.count !== undefined) {
      n = props.count
    }

    if (getValue) // Если нужно получить только value поля
      return n

    if (max - n < 0) {
      return 0
    }
    else {
      return max - n
    }
  }

  return (
    <Label counter={l()} v={l(true)} {...props}>
      {
        props.type === 'textarea' &&
        <textarea
          fieldkey={f}
          placeholder={props.p}
          onChange={change}
          onBlur={onBlur}
          className="input"
          rows="5"
          min={min}
          max={max}
          value={v}>
        </textarea>
      }
      {props.type !== "textarea" &&
        <input
          fieldkey={f}
          className="input"
          onChange={change}
          onBlur={onBlur}
          min={min}
          max={max}
          f={props.f}
          disabled={props.disabled}
          placeholder={props.p}
          value={v} />
      }
    </Label>
  )
}

export function Label(props) {
  const fo = getFiledOptions(props)
  const min = props.min ?? fo.min
  const max = props.max ?? fo.max
  return (
    <label className={`field ${props.width ? 'w' + props.width + 'p' : ''}`} style={{ width: props.width + '%' }}>
      <div className="header">
        <span className="label">{props.l}:</span>
        <div className="length">
          <div className="field-value-range">
            {min} - {max}
          </div>
          <Counter {...props} min={min} max={max} />
        </div>
      </div>
      {props.children}
    </label>
  )
}

export function Counter(props) {
  const { counter, v, min, max } = { ...props }

  let valid = false;
  if (min !== undefined && max !== undefined) {
    if (v >= min && v <= max) valid = true
  }
  else if (max === undefined) {
    if (v >= min) valid = true
  }
  else if (min === undefined) {
    if (v <= max) valid = true
  }

  if (counter === undefined || isNaN(counter)) {
    return null
  }

  return (
    <>
      {props.counter}
      {valid && <img src={checkIcon} alt="" />}
    </>
  )
}

export function OptionalInput(props) {
  const { state, dispatch } = useContext(AppContext)
  const f = _f(props.f + "_open")
  const fo = getFiledOptions(props)
  const min = props.min ?? fo.min
  const max = props.max ?? fo.max

  const change = useCallback((e) => {
    const val = e.target.checked ? 1 : 0
    dispatch({
      type: 'updateField',
      payload: {
        f: f,
        v: val
      }
    })
    Fetch(f, val)
  })

  return (
    <div className="optional-input" disabled={!state.form[f]}>
      <div className="oi__left">
        <div className={`social-icon ${props.f}`}></div>
        <label className="switch">
          <input
            onChange={change} type="checkbox"
            checked={state.form[f] === undefined || state.form[f] == "0" ? false : true} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="oi__right">
        <Field
          l={props.l}
          f={props.f}
          disabled={!state.form[f]}
          mask={props.mask}
          p={props.p}
          type={props.type}
          min={min}
          max={max}
          className="input" />
      </div>
    </div>
  )
}

export function CHECKBOX(props) {

  const { state, dispatch } = useContext(AppContext)
  const f = props.nolocale ? props.f : _f(props.f)

  const change = (e, k) => {
    const value = e.target.checked ? 1 : 0
    dispatch({
      type: 'updateField',
      payload: {
        f: k,
        v: value
      }
    })
    Fetch(k, value)
  }

  return (
    <div className="form-check form-switch">
      <input
        onChange={(e) => change(e, f)}
        checked={+state.form[f]}
        disabled={props.disabled}
        className="form-check-input"
        role="switch"
        type="checkbox" />
    </div>
  )
}