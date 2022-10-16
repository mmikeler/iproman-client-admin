import { useContext } from "react";
import { AppContext } from "../App";
import { Fetch } from "./fetch";
import { locals } from "./lang";


export function ADMIN_LANG_SWITCHER() {
  const { state } = useContext(AppContext)

  const switchLocal = (e) => {
    Fetch("admin_locale", e.target.value, (result) => { window.location.reload() })
  }

  let options = [];
  for (let key in locals) {
    options.push(<option key={key} value={locals[key]}>{key}</option>)
  }

  return (
    <div className="lang-switcher">
      <div className="form-input">
        <select className="form-select" value={state.form.admin_locale} onChange={switchLocal}>
          {options}
        </select>
      </div>
    </div>
  )
}