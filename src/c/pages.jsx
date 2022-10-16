// Компоненты страниц
import { useContext } from 'react';
import { AppContext } from '../App';

import { SectionOne } from './section-1';
import { SectionTwo } from './section-2';
import { SectionThree } from './section-3';
import { SectionFour } from './section-4';
import { SectionFive } from './section-5';
import { Section6 } from './section-6';
import { CATALOG_PAGE } from './catalog_page';
import { Section7 } from './section-7';
import { SUPPORT_PAGE } from './support_page';
import { DOMAIN_PAGE } from './mydomen_page';
import { MAIL_PAGE } from './mail_page';
import { PASSWORD_PAGE } from './password_page';

import { __ } from './lang';
import { ADMIN_LANG_SWITCHER } from './lang-switcher';
import { PAGE_LANG_TABS } from './page-lang-tabs';


export function PAGE(props) {
  let page = props.p
  let pageComp = ""
  let header = true

  switch (page) {
    case 'mysupport':
      pageComp = <SUPPORT_PAGE />
      header = false
      break
    case 'mydomen':
      pageComp = <DOMAIN_PAGE />
      header = false
      break
    case 'mymail':
      pageComp = <MAIL_PAGE />
      header = false
      break
    case 'mypassword':
      pageComp = <PASSWORD_PAGE />
      header = false
      break
    case "catalog":
      pageComp = <CATALOG_PAGE />
      break
    case "blog":
      pageComp = <BLOG />
      break
    case "faq":
      pageComp = <FAQ />
      break
    case "add_page":
      pageComp = <ADD_PAGE />
      break
    case 'settings':
      pageComp = <SETTINGS />
      break
    default:
      pageComp = <HOME />
  }

  return (
    <>
      {header && <PAGE_HEADER />}
      <div className="container pt-4 position-relative">
        {pageComp}
      </div>
    </>
  )
}

function PAGE_HEADER() {
  return (
    <div className="container">
      <div className="page-header mt20">
        <PAGE_LANG_TABS locals />
        <ADMIN_LANG_SWITCHER />
      </div>
    </div>
  )
}

function HOME() {

  const { state } = useContext(AppContext)

  return (
    <>
      <h2>{__(20, "Main page data")}</h2>
      <SectionOne />
      <SectionTwo />
      <Section7 />
      <SectionThree />
      <SectionFour />
      <div className="bottom-bar">
        <div className="bb-item">
          <span className='active-local mx-2'>{state.local}</span>
          <span className="how-many-simbols">{window.sum}</span> / 5000
        </div>
      </div>
    </>
  )
}

function BLOG() {
  return (
    <PAGE_IN_PROGRESS />
  )
}

function FAQ() {
  return (
    <PAGE_IN_PROGRESS />
  )
}

function ADD_PAGE() {
  return (
    <PAGE_IN_PROGRESS />
  )
}

function SETTINGS() {
  return (
    <div className="container pt-4">
      <h1>{__(19)}</h1>
      <Section6 />
      <SectionFive />
    </div>
  )
}

function PAGE_IN_PROGRESS() {
  return (
    <div className="page-in-progress">
      <div className="container position-relative">
        <p>{__(125)}</p>
      </div>
    </div>
  )
}