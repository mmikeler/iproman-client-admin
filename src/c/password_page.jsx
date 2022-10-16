import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { _Fetch } from "./fetch";
import { UNCONTROL_FORM, UNC_INPUT } from "./inputs/uncontrol_form";
import { __ } from "./lang";
import { Section } from "./section";


export function PASSWORD_PAGE() {

  const { state, dispatch } = useContext(AppContext)
  const [newPass, setNewPass] = useState(null)

  const action = () => {
    _Fetch('RESET_PASSWORD', { userID: state.o.user.data.ID }, (res) => { setNewPass(res.code) })
  }

  return (
    <Section title="PASSWORD" static>
      <div className="w-100">
        <p>
          <span className="bold">{__(182, 'Your login')}:</span>
          <span className="mx-3">{window.location.hostname}</span>
          <span className="text-primary pointer" onClick={() => dispatch({
            type: 'SET_PAGE',
            payload: 'mydomen',
          })}>{__(185, 'Change')}</span>
        </p>

        <div className="delimeter"></div>

        <UNCONTROL_FORM
          action="RESET_PASSWORD"
          theme={__(183, 'Reset the password')}
          successMessage={__(187, 'The password has been sent to the specified mailbox')}
          btntext={__(183, 'Reset the password')}>
          <UNC_INPUT
            name="user_email"
            type="email"
            label={__(24, 'Email')}
            min="5"
            maxLength="100"
            width="100"
            notice={__(186, 'A new password will be sent to this address')}
            required
            defaultValue={state.o.user.data.user_email}
          />
        </UNCONTROL_FORM>

      </div>
    </Section>
  )
}