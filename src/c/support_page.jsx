import { useContext } from "react";
import { AppContext } from "../App";
import { UNCONTROL_FORM, UNC_INPUT, UNC_TEXTAREA } from "./inputs/uncontrol_form";
import { __ } from "./lang";
import { Section } from "./section";


export function SUPPORT_PAGE() {

  const { state } = useContext(AppContext)

  return (
    <Section title={__(9, 'Support')} static>
      <UNCONTROL_FORM theme="Call to support">
        <UNC_INPUT
          name="user_email"
          type="email"
          label={__(24, 'Email')}
          min="5"
          maxLength="10"
          width="45"
          required
          defaultValue={state.o.user.data.user_email}
        />
        <UNC_INPUT
          name="user_phone"
          type="tel"
          label={__(23, 'Phone number')}
          min="5"
          maxLength="50"
          width='45'
          required
        />
        <UNC_INPUT
          name="user_name"
          type="text"
          label={__(162, 'Your name')}
          min="1"
          maxLength="50"
          width="45"
          required
        />
        <UNC_INPUT
          name="subject"
          type="text"
          label={__(116, 'Topic name')}
          min="5"
          maxLength="200"
          width="45"
          required
        />
        <UNC_TEXTAREA
          name="user_message"
          label={__(163, 'Your message')}
          min="1"
          rows="5"
          maxLength="1500"
          width="100"
          required
        />
      </UNCONTROL_FORM>
    </Section>
  )
}