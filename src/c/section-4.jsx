import { Section } from "./section"
import { CHECKBOX, Field, Label } from "./inputs/input"
import { FileField } from "./inputs/file";
import icon from '../img/form-icon.png'
import { useContext } from "react"
import { AppContext } from "../App"
import { Add } from "./products"
import { _F, _f, __ } from "./lang"

export function SectionFour() {
  const { state } = useContext(AppContext)

  const scrollUp = () => {
    document.getElementById("root").scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const confirm = (fields) => {
    let valid = true
    fields.forEach(f => {
      switch (f) {
        case 's4_6':
          let obj = state.form[_F('s4_6', state.local)]
          for (let p in obj) {
            if (typeof obj[p] === 'string' && obj[p].length < 5)
              valid = false
          }
          break;

        case 's4_8':
          let m = state.form[_F('s4_8', state.local)]
          if (m === undefined || m === "") {
            valid = false
          }
          break;

        default:
          if (state.form[_F(f, state.local)]?.length < 5) {
            valid = false
          }
          break;
      }
    })
    return valid
  }

  return (
    <Section
      className="part"
      fields={['s4_1', 's4_6', 's4_7', 's4_8']}
      defaultTitle="Contacts"
      confirmFunction={confirm}
      f="s4_title"
      id="s4"
      icon={icon}>
      <div className="col-10 d-flex j-between">
        <div className="col-8">
          <Field
            l={__(111, "Block header")}
            p={__(142, "Enter text")}
            f="s4_0"
            width="100"
            className="input"
            min="5"
            max="150"
          />
          <Field
            l={__(112, "Email to which requests will be sent")}
            p={__(48, "Your email")}
            f="s4_1"
            width="100"
            className="input"
            min="5"
            max="50"
          />
          <div className="mt20 mb10 bold w100p">{__(113, "The client will indicate...")}</div>
          <div className="col-10 d-flex">
            <label className="d-flex align-center mr20">
              <CHECKBOX f="s4_2" />
              <div className="ml5 label">Whatsapp</div>
            </label>
            <label className="d-flex align-center mr20">
              <CHECKBOX f="s4_3" />
              <div className="ml5 label">Telegram</div>
            </label>
            <label className="d-flex align-center mr20">
              <CHECKBOX f="s4_4" />
              <div className="ml5 label">Viber</div>
            </label>
            <label className="d-flex align-center mr20">
              <CHECKBOX f="s4_11" />
              <div className="ml5 label">Email</div>
            </label>
            <label className="d-flex align-center">
              <CHECKBOX f="s4_5" />
              <div className="ml10 label">{__(114, "Telephone call")}</div>
            </label>
          </div>
          <Subjects />
          <Field
            l={__(118, "Text on the Submit Request button")}
            f="s4_7"
            p={__(120, "Send a message")}
            width="100"
            className="input"
            min="5"
            max="25"
          />
        </div>
        <div className="col-2">
          <FileField
            f={`s4_8`}
            l="&nbsp;"
            note={`${__(46, "Recommended size")} 430х500px`}
            btnText={__(99, 'Upload')}
          />
        </div>
      </div>
      <div className="col-10">
        <p className="bold">{__(119, "Additional features...")}</p>
        <label className="d-flex align-center mb20">
          <CHECKBOX f="s4_9" />
          <div className="ml10 label">{__(120, "Send a message")}</div>
        </label>
        <label className="d-flex align-center mb20">
          <CHECKBOX f="s4_10" />
          <div className="ml10 label">{__(121, "Enter promo code")}</div>
        </label>
      </div>
      <div className="delimeter"></div>
      <div className="footer w100p">
        <p className="fs-18 tac bold">{__(122, "The recommended amount of site filling is 5000 characters")}</p>
        <p className="fs-16 green tac">{__(123, "Completed characters")} <span className="how-many-simbols"> {window.sum}</span></p>
        <div className="d-flex j-center">
          <div className="btn" onClick={scrollUp}>{__(124, "Go up")}</div>
        </div>
      </div>
    </Section>
  )
}

function Subjects(props) {
  const { state, dispatch } = useContext(AppContext)

  const change = (e, i) => {
    if (e.target.value.length > 70) return
    dispatch({
      type: "updateSubject",
      payload: {
        index: i,
        value: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    dispatch({
      type: "syncSubjects"
    })
  }

  const fields = typeof state.form[_f("s4_6")] === "object" ? state.form[_f("s4_6")] : []
  const list = fields && fields.map((v, i) => {
    return (
      <Label
        key={i}
        l={__(116, "Topic name")}
        counter={70 - v.length}
        v={v.length}
        min="5"
        max="70"
      >
        <input
          className="input"
          onChange={(e) => { change(e, i) }}
          onBlur={onBlur}
          type="text"
          placeholder={props.p}
          min="5"
          max="70"
          value={v} />
      </Label>
    )
  })

  return (
    <>
      <div className="mt20 mb20 bold w100p">{__(115, "The client will be able...")}</div>
      {list}
      {list.length < 4 && <Add
        action={() => dispatch({ type: "addSubject" })}
        label={__(117, "Add topic") + " (max 4)"}
      />}
    </>
  )
}