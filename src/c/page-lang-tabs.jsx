import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { Fetch } from "./fetch";
import { _F, getLangName } from "./lang";
import { LOCALE_DIRECTION } from "./locale_direction";

export function PAGE_LANG_TABS(props) {
  const { state } = useContext(AppContext)

  const list = (() => {
    let out = state.form.site_languages.map((l, i) => {
      return <TAB key={i} local={l} title={getLangName(l)} />
    })

    return out;
  })

  return (
    <div className="page-lang-tabs">
      {list()}
      <div className="ml20">
        <LOCALE_DIRECTION />
      </div>
    </div>
  )
}

function TAB(props) {
  const { state, dispatch } = useContext(AppContext)
  const [disabled, toggle] = useState(true)

  useEffect(() => {
    const fields = ["s1_1", "s1_2", "s1_3", "s1_4"]
    let valid = true
    for (let f in fields) {
      let fname = _F(fields[f], props.local)
      if (state.form[fname] === undefined || state.form[fname].length < 5) {
        valid = false
        break
      }
    }
    toggle(valid)
  })

  useEffect(() => {
    if (!disabled) {
      const f = _F("lang_on", props.local)
      dispatch({
        type: "updateField",
        payload: {
          f: f,
          v: 0
        }
      })
      Fetch(f, 0)
    }
  }, [disabled])

  return (
    <div
      className="lang-tab"
      current={state.local === props.local ? 1 : 0}
      onClick={() => dispatch({
        type: "SWITCH_LOCAL_PAGE",
        payload: props.local
      })}>

      <div className="lang-tab__label">{props.title}</div>
    </div>
  )
}