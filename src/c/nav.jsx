import { useContext } from "react"
import { AppContext } from "../App"
import { __ } from "./lang"


export function Nav(props) {

  const { state, dispatch } = useContext(AppContext)

  const nav = () => {
    const list = [
      { title: __(14, "Home"), tag: "home" },
      { title: __(15, "Catalog"), tag: "catalog" },
      //{ title: __(16, "Blog"), tag: "blog" },
      //{ title: __(17, "FAQ"), tag: "faq" },
      //{ title: __(18, "+Add page"), tag: "add_page" },
    ]

    return list.map((point, i) => {
      return (
        <div
          key={i}
          current={point.tag === state.page ? 1 : 0}
          onClick={() => dispatch({ type: "SET_PAGE", payload: point.tag })}
          className="main-nav__item">
          {point.title}
        </div>
      )
    })
  }

  return (
    <div className={`main-nav ${props.offset > 90 && 'fixed'}`}>
      {nav()}
      <PremiumNav />
    </div>
  )
}

function PremiumNav() {
  const { state, dispatch } = useContext(AppContext)

  return (
    <>
      <div className="nav-delimeter"></div>
      <div current={state.page === "settings" ? 1 : 0} onClick={() => dispatch({ type: "SET_PAGE", payload: "settings" })} className="main-nav__item">{__(19, 'Site settings')}</div>
    </>

  )
}