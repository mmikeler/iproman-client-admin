import { useContext } from "react";
import { AppContext } from "../App";
import Logo from '../img/logo-white.png';
import { __ } from "./lang";
import { GET_REG_DATA_MESSAGE } from "./get_reg_data_mess";
import { Fetch } from "./fetch";

export function Topbar(props) {
  const { state, dispatch } = useContext(AppContext);
  const pages = window.o.pages

  const change = (pageSlug) => {
    dispatch({
      type: 'SET_PAGE',
      payload: pageSlug
    })
  }

  return (
    <div className="topbar">

      {state.form && state.form._ip_user_level !== "vip" && <LowVerMessage />}
      {state.form && state.form._ip_user_level === "vip" && <HightVerMessage />}
      {state.form &&
        state.form?._start_synch_date === "" &&
        state.form?.IPKEY !== "" &&
        <GET_REG_DATA_MESSAGE />}

      <div className="container">

        <div className="logo">
          <a href={window.o.homeUrl} target="_blank" rel="noopener noreferrer">
            <img src={Logo} alt="" />
          </a>
        </div>

        <div className="info">
          <span>{__(2, 'Admin panel')}</span>
          <span>{__(3, 'IPRoman business-site')} v{window.o.v}</span>
          <a className="full-version" href={pages.fullversion}>{__(4, 'Full version')}</a>
        </div>

        <div className="nav">
          {/* <div onClick={() => change('myproducts')} className="nav__link">{__(5, 'My Products')}</div> */}
          <div onClick={() => change('mydomen')} current={state.page === 'mydomen' ? 1 : 0}>{__(6, 'Domen')}</div>
          <div onClick={() => change('mymail')} current={state.page === 'mymail' ? 1 : 0}>{__(7, 'Mail')}</div>
          <div onClick={() => change('mypassword')} current={state.page === 'mypassword' ? 1 : 0}>{__(8, 'Password')}</div>
          <div onClick={() => change('mysupport')} current={state.page === 'mysupport' ? 1 : 0}>{__(9, 'Support')}</div>
        </div>

        <div className="user">
          <div className="user__avatar"></div>
          <div className="user__info">
            <b>{window.o.user.data.display_name}</b><br />
            <span>{window.o.user.data.user_email}</span>< br />
            <LOGOUT />
          </div>
        </div>
      </div>
    </div>
  )
}

function LOGOUT() {
  return <a className="logout-link" href="/iplogin">{__(10, 'Log out')}</a>
}

function LowVerMessage() {

  return (
    <div className="top-bar-mess-wrapper">
      <p>{__(11)}</p>
      <a href="/" target="_blank" rel="noopener noreferrer">{__(13, 'Go to full version')}</a>
    </div>
  )
}

function HightVerMessage() {
  const { state, dispatch } = useContext(AppContext)

  const close = (e) => {
    e.target.closest(".top-bar-mess-wrapper--alt, .top-bar-mess-wrapper").remove()
    Fetch('hvm', "1")
    dispatch({
      type: 'updateField',
      payload: {
        f: 'hvm',
        v: '1'
      }
    })
  }

  if (state?.form.hvm === 1) return null

  return (
    <div className="top-bar-mess-wrapper--alt">
      <p>{__(12, 'You are using the full version of the Admin Panel iProMan.business site. You can manage 20 site blocks.')}</p>
      <i onClick={close} className="bi bi-x-square pointer"></i>
    </div>
  )
}