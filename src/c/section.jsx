import React, { useState } from "react";
import { useRef } from "react";
import collapsIcon from '../img/section_header_collaps_icon.png';
import { useContext } from "react";
import { AppContext } from "../App";
import { Fetch } from "./fetch";
import { useEffect } from "react";
import { __, _f, _F } from "./lang";
import { _getFiledOptions } from "./inputs/fields-options";

export function Section(props) {
  const [visible, setVisible] = useState(false)
  const section = useRef(false);

  const toogle = () => {
    if (section.current.classList.contains('closed')) {
      section.current.classList.remove('closed')
      setVisible(true)
    }
    else {
      section.current.classList.add('closed')
      setVisible(false)
    }
  }

  return (
    <div id={props.id} className={`section${props.static ? '' : ' closed'}`} ref={section} level={props.level}>
      <div className="section__header" onClick={toogle}>
        <img className="icon" src={props.icon} alt="" />
        {props.title ? props.title : <INPUT f={_f(props.f)} d={props.defaultTitle} />}
        <div className="d-flex flex-nowrap ml-a">
          <GetVipMess level={props.level} />
          <ValidateSection fields={props.fields} confirmFunction={props.confirmFunction} parent={section} />
          {!props.static && <img className="collaps-icon" src={collapsIcon} alt="" />}
        </div>
      </div>
      <div className="section__body">

        <LevelBorder level={props.level} />

        {(visible || props.static) && props.children}

        <div className="section__footer w100p">
          {!props.static && <span onClick={toogle} className="collapse-icon"><i className="bi-arrow-up-square"></i></span>}
        </div>

      </div>
    </div>
  )
}

function INPUT(props) {

  const { state, dispatch } = useContext(AppContext)
  const [focus, setFocus] = useState(false)
  let f = props.f

  const click = (e) => {
    e.stopPropagation();
  }

  const change = (e) => {
    dispatch({
      type: "updateField",
      payload: {
        f: f,
        v: e.target.value
      }
    })
  }

  const blur = (e) => {
    setFocus(false)
    Fetch(f, e.target.value)
  }

  return (
    <div className="editable-section-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
      </svg>
      <input type="text"
        value={state.form[f] ?? props.d}
        onClick={click}
        onChange={change}
        onBlur={blur}
        onFocus={() => setFocus(true)}
        maxLength="25" />
      {focus && <div className="section-title-notice">{__(153, "This text acts...")}</div>}
    </div>
  )
}

function ValidateSection(props) {
  /* 
  ** Проверяем ключи state.form на присутствие пустых строк в значениях
  ** Если в значении массив, проверям его на наличие пустых значений
  ** вплоть до двух уровней вложенности
  */

  const { state, dispatch } = useContext(AppContext)
  const [validate, setValidate] = useState(true)

  const validIcon = "data: image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCA4NSAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik00Mi4yMzUzIDIyLjIxMTdDMzkuMTk4NCAyNC41NTk4IDM3Ljg0NzkgMjcuNzU3NiAzNy44NDc5IDI3Ljc1NzZDMzcuODQ3OSAyNy43NTc2IDQzLjY3NTMgMjkuNDA3MSA0OC41NzU4IDI3LjMyNzlDNTEuMDE4NCAyNi4yOTE2IDUyLjc2ODkgMjQuNTI0MyA1My45MTE0IDIzLjAxMjNDNDkuODkxOSAyMy4zNjA0IDQ1Ljg4MzEgMjIuOTU0MSA0Mi4yMzUzIDIyLjIxMTdaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjxwYXRoIGQ9Ik0yNy45Mzk4IDE4LjU0OTRDMjcuODEyMSAxOC40OTY3IDI3LjY3NjQgMTguNDY1OCAyNy41MzgzIDE4LjQ1OEMyNy4zNjI4IDE4LjQxNzUgMjcuMTgzMiAxOC4zOTY5IDI3LjAwMyAxOC4zOTY4SDIuMzAxNjFDMS42ODczOSAxOC40MDc3IDEuMTAyMDggMTguNjU2NCAwLjY3MTYyNiAxOS4wODkzQzAuMjQxMTc2IDE5LjUyMjEgMCAyMC4xMDQ2IDAgMjAuNzExM0MwIDIxLjMxOCAwLjI0MTE3NiAyMS45MDA1IDAuNjcxNjI2IDIyLjMzMzRDMS4xMDIwOCAyMi43NjYyIDEuNjg3MzkgMjMuMDE0OSAyLjMwMTYxIDIzLjAyNThIMjAuNjIyN0MxOC40ODE0IDI1LjM1MTMgMTcuNTU3NiAyNy40ODggMTcuNTU3NiAyNy40ODhDMTcuNTU3NiAyNy40ODggMjUuNDU3NCAyOS43MjM2IDMyLjEgMjYuOTA0OUMzNS4xNjc0IDI1LjYwMzYgMzcuNDMyNiAyMy40NTE4IDM4Ljk3NjYgMjEuNTEzQzM0LjQxNjQgMjAuNDE3MSAzMC4zNDM0IDE5LjUzNzIgMjcuOTM5OCAxOC41NDk0WiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIvPgo8cGF0aCBkPSJNODMuNzI2NSAzLjQwOTk0Qzc4LjIyMDMgLTIuNDkwMjMgNjguODEzOSAzLjg0NDk4IDY4LjQzMTYgNC4xMDg1N0M2OC40MDg2IDQuMTE3NjMgNjguMzg2NCA0LjEyNTE5IDY4LjM2MzUgNC4xMzVDNjcuNzgxNSA0LjM4MDQ3IDY0LjgxNjYgMTMuNTE5MiA1MS44NzEgMTguMjAxOUM0OS43ODU1IDE4Ljk1NzIgNDcuNTYzOSAxOS4xMDE1IDQ1LjQyOTUgMTkuMTQ5OEg0NS40MjI2QzQ2LjkxNDYgMTkuMDY2NCA0OC4zOTUzIDE4Ljg0MjggNDkuODQ0NCAxOC40ODIxQzUwLjIxMzQgMTguNDI5NiA1MC41NzM2IDE4LjMyOCA1MC45MTUgMTguMThDNjEuODE4OCAxNC44MSA2Ny4zMTA0IDMuNDM5NCA2Ny4zMTA0IDMuNDM5NEw1OS41NjQzIDEuMjQ0NThDNTUuNTA0NSAwLjA5NDYzMDUgNTEuMjU2OCAtMC4yNjMyMzYgNDcuMDU4NCAwLjE5MDk3OEw0Mi4zOTg4IDAuNjk0NzQ0SDE4LjEzMDNDMTYuODYwMSAwLjY5NDc0NCAxNS43NzcyIDEuNjcwNTUgMTUuNzMyIDIuOTI0M0MxNS43MjA1IDMuMjM1MTggMTUuNzcyNiAzLjU0NTE2IDE1Ljg4NTEgMy44MzU3MUMxNS45OTc3IDQuMTI2MjcgMTYuMTY4NCA0LjM5MTQzIDE2LjM4NzEgNC42MTUzNUMxNi42MDU3IDQuODM5MjYgMTYuODY3OCA1LjAxNzM0IDE3LjE1NzggNS4xMzg5NEMxNy40NDc3IDUuMjYwNTQgMTcuNzU5NSA1LjMyMzE1IDE4LjA3NDUgNS4zMjMwNUgzNC4yNDUxQzMyLjY5NzggNi41ODc2IDMxLjI3MjggNy45OTEzOCAyOS45ODg1IDkuNTE2MzFIMTAuMjEzNkM4Ljk0MjYyIDkuNTE2MzEgNy44NjA1IDEwLjQ5MjEgNy44MTUzOCAxMS43NDY2QzcuODAzOTggMTIuMDU3NCA3Ljg1NjEgMTIuMzY3MyA3Ljk2ODYzIDEyLjY1NzdDOC4wODExNiAxMi45NDgyIDguMjUxOCAxMy4yMTMzIDguNDcwMzYgMTMuNDM3MkM4LjY4ODkyIDEzLjY2MTEgOC45NTA5MiAxMy44MzkyIDkuMjQwNzEgMTMuOTYwOEM5LjUzMDUgMTQuMDgyNSA5Ljg0MjE0IDE0LjE0NTMgMTAuMTU3IDE0LjE0NTRIMjcuMjM5MkMyNy45MDIyIDE0Ljc5MjYgMjkuNzQ2OCAxNi40MTY1IDMyLjMwNTcgMTcuMjQyQzM4LjM3NzggMTkuNjM3NyA0OC43OTM2IDIyLjY2NzggNTguNDcxNSAyMC4yNzU5QzU2LjAxNjcgMjUuODkyOSA1OC4wNzE1IDMyLjAzNTUgNTguMDcxNSAzMi4wMzU1QzU4LjA3MTUgMzIuMDM1NSA2Ni4yNjM1IDI5LjYzNjcgNjkuODIxOSAyMy42OTA1QzcyLjA4NjMgMTkuOTA1MSA3MS45MjggMTUuNTk3IDcxLjUxMzUgMTIuOTY1NkM3My44MjA3IDEyLjE3ODYgNzYuMjQwNCAxMS4xMDkyIDc4Ljc3ODYgOS43MTc5N0M4Ni44MzA2IDUuMjk1ODYgODUuMzM3OCA1LjEzNTc0IDgzLjcyNjUgMy40MDk5NFpNNDkuMjk5OSAyLjc5NDRDNDkuNTc5MSAyLjQ4ODkxIDQ5Ljk0MzYgMi4yNzE4NiA1MC4zNDc1IDIuMTcwNTdDNTAuNzUxNCAyLjA2OTI4IDUxLjE3NjYgMi4wODgyOCA1MS41Njk2IDIuMjI1MThDNTEuOTYyNiAyLjM2MjA4IDUyLjMwNTcgMi42MTA3NiA1Mi41NTU5IDIuOTM5OUM1Mi44MDYgMy4yNjkwNCA1Mi45NTIgMy42NjM5MiA1Mi45NzUzIDQuMDc0ODJDNTIuOTk4NyA0LjQ4NTcxIDUyLjg5ODQgNC44OTQyNSA1Mi42ODcyIDUuMjQ4OThDNTIuNDc1OSA1LjYwMzcgNTIuMTYzMSA1Ljg4ODc2IDUxLjc4ODEgNi4wNjgyNUM1MS40MTMxIDYuMjQ3NzQgNTAuOTkyNyA2LjMxMzYzIDUwLjU3OTkgNi4yNTc2M0M1MC4xNjcgNi4yMDE2MyA0OS43ODAyIDYuMDI2MjQgNDkuNDY4MSA1Ljc1MzU1QzQ5LjA0OTYgNS4zODI1MSA0OC43OTY5IDQuODYyODUgNDguNzY1NCA0LjMwODI4QzQ4LjczMzkgMy43NTM3MSA0OC45MjYgMy4yMDkzOCA0OS4yOTk5IDIuNzk0NFpNNDAuNzIwOSAxNS40MDc0QzQwLjM1NDIgMTUuMDg0NSA0MC4xMzIyIDE0LjYzMTEgNDAuMTAzNSAxNC4xNDY4QzQwLjA3NDkgMTMuNjYyNCA0MC4yNDE5IDEzLjE4NjYgNDAuNTY4IDEyLjgyMzZMNDUuOTIxMiA2LjkwNDU4QzQ2LjI0ODkgNi41NDIzMyA0Ni43MDg4IDYuMzIzNDYgNDcuMTk5OSA2LjI5NjEyQzQ3LjY5MSA2LjI2ODc4IDQ4LjE3MjkgNi40MzUyMiA0OC41Mzk3IDYuNzU4ODJDNDguOTA2MiA3LjA4MjYzIDQ5LjEyNzYgNy41MzY5MSA0OS4xNTUxIDguMDIxODNDNDkuMTgyNiA4LjUwNjc0IDQ5LjAxNDEgOC45ODI2MSA0OC42ODY1IDkuMzQ0ODdMNDMuMzMzMyAxNS4yNjQ3QzQzLjAwNTMgMTUuNjI0NSA0Mi41NDY0IDE1Ljg0MTUgNDIuMDU2OSAxNS44NjgzQzQxLjU2NzQgMTUuODk1IDQxLjA4NzEgMTUuNzI5MyA0MC43MjA5IDE1LjQwNzRaTTc3Ljc2MzggNC4xNTM4OUM3Ny43MzA5IDQuNTM5MDcgNzcuNDcwMSA0Ljk1NDQ3IDc3LjE2ODggNS4xOTAxMkM3Ni44MDEgNS40NzcxMiA3Ni40MTk0IDUuNTE3MTUgNzUuOTcwNCA1LjUxNzE1Qzc1LjA3NDkgNS41MTcxNSA3NC41MjQzIDQuNTA3MzUgNzQuNTkzOSAzLjc0NjA0Qzc0LjYyNjggMy4zNjA4NSA3NC44ODY4IDIuOTQ1NDUgNzUuMTg4OSAyLjcwOTgxQzc1LjU1NjcgMi40MjI4IDc1LjkzNzYgMi4zODI3OCA3Ni4zODcyIDIuMzgyNzhDNzcuMjc1OSAyLjM4MzUzIDc3LjgyODggMy4zOTI1NyA3Ny43NjM4IDQuMTUzODlaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXIpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjE3LjkxMzIiIHkxPSItNi4zMzgzMSIgeDI9IjQ3Ljk1MDEiIHkyPSIyOC41OTQ2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMwMERBNUQiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA4MDQ5Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhciIgeDE9IjI0NzQuNjIiIHkxPSI2NjUuOTc3IiB4Mj0iNDE2NC4yIiB5Mj0iODI4MS4zNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBEQTVEIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwODA0OSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXIiIHgxPSIyNjg3NCIgeTE9Ii01ODM5Ljc1IiB4Mj0iMzUxMDguOCIgeTI9IjE2OTQ5LjMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzAwREE1RCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDgwNDkiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSI4NSIgaGVpZ2h0PSIzMi4wMzU1IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
  const invalidIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCA1MSAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0Ljk0MzEgMjMuMTMyMkMyMy4xNTE4IDI0LjUzNSAyMi4zNTQyIDI2LjQ0NjEgMjIuMzU0MiAyNi40NDYxQzIyLjM1NDIgMjYuNDQ2MSAyNS43OTI4IDI3LjQzMTggMjguNjgzOSAyNi4xODk1QzMwLjEyNSAyNS41NzA0IDMxLjE1NzkgMjQuNTE0NiAzMS44MzE2IDIzLjYxMTJDMjkuNDYxMSAyMy44MTg5IDI3LjA5NTQgMjMuNTc2MiAyNC45NDMxIDIzLjEzMjJaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMl8yMjkpIi8+CjxwYXRoIGQ9Ik0xNi41MDg1IDIwLjk0NDFDMTYuNDMxOSAyMC45MTI0IDE2LjM1MjEgMjAuODk0NSAxNi4yNzE0IDIwLjg4OTZDMTYuMTcwNCAyMC44NjU5IDE2LjA2NTMgMjAuODUyOSAxNS45NTcgMjAuODUyOUgxLjM4MjQzQzAuNjE5MTE5IDIwLjg1MjkgMCAyMS40NzIgMCAyMi4yMzUzQzAgMjIuOTk4NiAwLjYxOTExOSAyMy42MTc4IDEuMzgyNDMgMjMuNjE3OEgxMi4xOTA5QzEwLjkyNzQgMjUuMDA3NSAxMC4zODI1IDI2LjI4MzIgMTAuMzgyNSAyNi4yODMyQzEwLjM4MjUgMjYuMjgzMiAxNS4wNDM4IDI3LjYxOTIgMTguOTYyOSAyNS45MzQ2QzIwLjc3MzEgMjUuMTU2NiAyMi4xMDc0IDIzLjg3MTkgMjMuMDIwNiAyMi43MTM1QzIwLjMyOTkgMjIuMDYwMiAxNy45MjY3IDIxLjUzNDggMTYuNTA4NSAyMC45NDQxWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzJfMjI5KSIvPgo8cGF0aCBkPSJNNDkuNDIzNiAxMS44OTkzQzQ2LjE3NCA4LjM3NDM5IDQwLjYyNjQgMTIuMTU5MiA0MC4zOTkxIDEyLjMxNzJDNDAuMzg2MSAxMi4zMjIxIDQwLjM3MyAxMi4zMjcgNDAuMzU5MiAxMi4zMzI3QzQwLjAxNTQgMTIuNDgwMSAzOC4yNjY0IDE3LjkzODEgMzAuNjI3NiAyMC43MzU2QzI5LjM5NzUgMjEuMTg2MSAyOC4wODYgMjEuMjcyNCAyNi44Mjc0IDIxLjMwMThDMjYuODI1NyAyMS4zMDE4IDI2LjgyNDkgMjEuMzAxOCAyNi44MjMzIDIxLjMwMThDMjcuNjkwOSAyMS4yNDk2IDI4LjU2NjYgMjEuMTI0MiAyOS40MzI2IDIwLjkwMjZDMjkuNjU1IDIwLjg3MDggMjkuODY3NiAyMC44MDk3IDMwLjA2NjMgMjAuNzIyNUMzNi40OTc4IDE4LjcxMDQgMzkuNzM4NCAxMS45MTcyIDM5LjczODQgMTEuOTE3MkMzOS43Mzg0IDExLjkxNzIgMzYuMDM4NCA5Ljk5Mzg4IDMxLjU0IDkuNTY1MzhWOC42OTY5OUMzMS41NCA4LjAwODYzIDMxLjI1NDkgNy4zODU0MyAzMC43OTcxIDYuOTM5MDJDMzEuNjYxNCA2LjIxODg4IDMyLjIxMjkgNS4xMzQ2MSAzMi4yMTI5IDMuOTI0MDdDMzIuMjEyOSAxLjc2MDQyIDMwLjQ1MjUgMCAyOC4yODg4IDBDMjYuMTI1MiAwIDI0LjM2NDcgMS43NjA0MiAyNC4zNjQ3IDMuOTI0MDdDMjQuMzY0NyA1LjE1MzM1IDI0LjkzMzQgNi4yNTIyOCAyNS44MjEzIDYuOTcyNDFDMjUuMzgzIDcuNDE2MzkgMjUuMTExOCA4LjAyNTczIDI1LjExMTggOC42OTY5OVYxMC4yNTEzQzI1LjA4NzMgMTAuMjU5NCAyNS4wNjI5IDEwLjI2ODQgMjUuMDM4NSAxMC4yNzY2SDEwLjY4NzFDOS45MjM4MSAxMC4yNzY2IDkuMzA0NjkgMTAuODk1NyA5LjMwNDY5IDExLjY1OUM5LjMwNDY5IDEyLjQyMjMgOS45MjM4MSAxMy4wNDE0IDEwLjY4NzEgMTMuMDQxNEgyMC4yMjgxQzE5LjIxMDYgMTMuODgwNSAxOC4zNzMxIDE0Ljc1NzggMTcuNzE2NiAxNS41NDU2SDYuMDE2MDNDNS4yNTI3MiAxNS41NDU2IDQuNjMzNjEgMTYuMTY0NyA0LjYzMzYxIDE2LjkyOEM0LjYzMzYxIDE3LjY5MTMgNS4yNTI3MiAxOC4zMTA0IDYuMDE2MDMgMTguMzEwNEgxNi4wOTQ2QzE2LjQ4NTcgMTguNjk3NCAxNy41NzQgMTkuNjY3NiAxOS4wODM1IDIwLjE2MTNDMTkuMDg0MyAyMC4xNjEzIDE5LjA4NDMgMjAuMTYyMSAxOS4wODUxIDIwLjE2MjFDMjIuNjY3OSAyMS41OTM0IDI4LjgxMzQgMjMuNDAzNSAzNC41MjQgMjEuOTc0NkMzMy4wNzU2IDI1LjMzMDEgMzQuMjg3OCAyOSAzNC4yODc4IDI5QzM0LjI4NzggMjkgMzkuMTIwMSAyNy41NjYzIDQxLjIxODYgMjQuMDE0NUM0Mi41NTQ2IDIxLjc1MzEgNDIuNDYwOSAxOS4xNzk2IDQyLjIxNjUgMTcuNjA2NkM0My41Nzc4IDE3LjEzNjUgNDUuMDA1OCAxNi40OTc5IDQ2LjUwMjMgMTUuNjY2MUM1MS4yNTQ5IDEzLjAyNjcgNTAuMzc0MiAxMi45MzA2IDQ5LjQyMzYgMTEuODk5M1pNMjguMjg4OCAxLjc5NDYzQzI5LjQ2MzUgMS43OTQ2MyAzMC40MTkxIDIuNzUwMTkgMzAuNDE5MSAzLjkyNDg5QzMwLjQxOTEgNS4wOTk1OCAyOS40NjM1IDYuMDU1MTQgMjguMjg4OCA2LjA1NTE0QzI3LjExNDEgNi4wNTUxNCAyNi4xNTg2IDUuMDk5NTggMjYuMTU4NiAzLjkyNDg5QzI2LjE1ODYgMi43NTAxOSAyNy4xMTQxIDEuNzk0NjMgMjguMjg4OCAxLjc5NDYzWk0yNi41MzQ5IDkuNDIzNjRDMjYuNTM0OSA4LjQyMjQ2IDI3LjM0NjMgNy42MTEwOSAyOC4zNDc1IDcuNjExMDlDMjkuMzQ4NyA3LjYxMTA5IDMwLjE2IDguNDIyNDYgMzAuMTYgOS40MjM2NFYxNy41OTM2QzMwLjE2IDE4LjU5NDcgMjkuMzQ4NyAxOS40MDYxIDI4LjM0NzUgMTkuNDA2MUMyNy45NjM4IDE5LjQwNjEgMjcuNjA4NiAxOS4yODY0IDI3LjMxNjIgMTkuMDgzNUMyNy4xNzkzIDE5LjAyNjUgMjcuMDY1MiAxOC45MjQ3IDI2Ljk5MjcgMTguNzk2OEMyNi43MDg0IDE4LjQ3NjYgMjYuNTM0OSAxOC4wNTU1IDI2LjUzNDkgMTcuNTkzNlY5LjQyMzY0Wk00NS45MDUyIDEyLjM0NDlDNDUuODg1NiAxMi41NzQ2IDQ1LjczMTcgMTIuODIzMSA0NS41NTQxIDEyLjk2NEM0NS4zMzc0IDEzLjEzNTkgNDUuMTExNyAxMy4xNTk1IDQ0Ljg0NyAxMy4xNTk1QzQ0LjMxOTEgMTMuMTU5NSA0My45OTQxIDEyLjU1NjcgNDQuMDMyNCAxMi4xMDEzQzQ0LjA1MTkgMTEuODcxNiA0NC4yMDU5IDExLjYyMzEgNDQuMzgzNSAxMS40ODIyQzQ0LjYwMDIgMTEuMzEwMyA0NC44MjU4IDExLjI4NjcgNDUuMDkwNiAxMS4yODY3QzQ1LjYxOTMgMTEuMjg2NyA0NS45NDQzIDExLjg4OTUgNDUuOTA1MiAxMi4zNDQ5WiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzJfMjI5KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzJfMjI5IiB4MT0iMjQuNjU3IiB5MT0iMjMuMzM5MyIgeDI9IjI2LjU2ODYiIHkyPSIyNi45MzU1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iOC4wOTgyNGUtMDciIHN0b3AtY29sb3I9IiNGNTQ3NDciLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkYzRjNGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8yXzIyOSIgeDE9IjUuNTkzMzYiIHkxPSIyMS4xODY0IiB4Mj0iNy45MjEwOSIgeTI9IjI3Ljc5MjQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSI4LjA5ODI0ZS0wNyIgc3RvcC1jb2xvcj0iI0Y1NDc0NyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjNGM0YiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDJfbGluZWFyXzJfMjI5IiB4MT0iMTUuNjk4OCIgeTE9IjEuNjMwMTYiIHgyPSIzMy42NzU5IiB5Mj0iMjIuMjc4MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjguMDk4MjRlLTA3IiBzdG9wLWNvbG9yPSIjRjU0NzQ3Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGM0YzRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="

  const tryValidate = () => {
    let valid = true;
    const minFieldValueLength = state.o.admin_settings.min_title_value_length;


    if (props.confirmFunction) {
      if (!props.confirmFunction(props.fields)) valid = false
    }
    else {
      if (props.fields) {
        props.fields.forEach((f) => {
          const fo = _getFiledOptions(f)
          f = _F(f, state.local)
          // Общий случай
          if (state.form[f] === undefined || state.form[f].length < fo.min) {
            valid = false
          }
          else {
            // Проверяем массивы
            if (typeof state.form[f] === 'object') {
              let rep = []
              while (rep.length > 0) {

              }
              state.form[f].forEach((el) => {
                console.log(el);
                for (let k in el) {
                  if (typeof el[k] === "string" && el[k].length < 3) {
                    valid = false
                  }
                  if (typeof el[k] === 'object') {
                    el[k].forEach(m => {
                      if (m.length === minFieldValueLength) {
                        valid = false
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
    setValidate(valid)
  }

  useEffect(() => {
    tryValidate()
  }, [state.local, state.form, props.fields])

  if (!props.fields) return null // Если проверять нечего, выходим

  return (
    <img src={validate ? validIcon : invalidIcon} alt="" className="section-valid-icon mr20" />
  )
}

function LevelBorder(props) {
  const { state } = useContext(AppContext)
  const needBorder = props.level === "vip" && state.form._ip_user_level !== "vip" ? true : false;

  if (needBorder) {
    return (
      <div className="level-border-wrapper">
      </div>
    )
  }
  else {
    return null;
  }
}

function GetVipMess(props) {
  const { state } = useContext(AppContext)
  const needBorder = props.level === "vip" && state.form._ip_user_level !== "vip" ? true : false;

  if (needBorder) {
    return (
      <div className="get-vip-mess">
        <i
          className="get-vip-mess-icon bi-exclamation-circle mr20"
          data-bs-toggle="tooltip"
          title="Это блок доступен в полной версии"></i>
        <span>Раздел доступен<br />в полной версии</span>
      </div>
    )
  }
  else {
    return null
  }
}