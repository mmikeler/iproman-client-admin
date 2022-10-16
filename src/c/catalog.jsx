import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { __ } from "./lang"

export function Catalog() {
  const { state, dispatch } = useContext(AppContext)
  const catalogItems = typeof state.form["catalog_items"] === "object" ? state.form["catalog_items"] : false
  const catalogDisabled = catalogItems && catalogItems.length > 0 ? false : true

  useEffect(() => {
    if (catalogDisabled) {
      dispatch({
        type: "updateField",
        payload: {
          f: "catalog_on",
          v: false
        }
      })
    }
  }, [state.form["catalog_items"]])

  // Ничего не показываем если нет vip
  if (state.form._ip_user_level === undefined || state.form._ip_user_level !== "vip") {
    return null;
  }

  return (
    <>
      <div className="delimeter"></div>
      <div className="alert alert-primary w-100 text-center" role="alert">
        {__(79, "You can place more products on")} <span className="fs-5 bold text-decoration-underline pointer" onClick={() => { dispatch({ type: "SET_PAGE", payload: "catalog" }) }}>{__(44, "Catalog management ")}</span>
      </div>
    </>
  )
}