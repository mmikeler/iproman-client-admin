import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { UNC_INPUT, UNC_TEXTAREA, UNCONTROL_FORM, UNC_LABEL } from "./inputs/uncontrol_form";
import { __ } from "./lang";
import { Section } from "./section";


export function MAIL_PAGE() {

  const { state, dispatch } = useContext(AppContext)
  const selfDomen = window.location.hostname
  const [domainName, setDomanName] = useState('')

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <Section title={__(171, 'Change mail') + ' biz.host'} static>
          <p className="h6 bold d-flex justify-content-between w-100">
            <span>{__(172, 'Your mail')}: {state.form.site_mail || 'Not added'}</span>
            {state.form.site_mail &&
              <a target="_blank" rel="noreferrer" href={`https://${selfDomen}/webmail`}>{__(176, 'Go to Webmail')}</a>}
          </p>
          <div className="delimeter"></div>
          <UNCONTROL_FORM theme="Call to support: Change mail" btntext={__(174, 'I understand, still send')}>
            <UNC_LABEL width="100" label={__(173, 'Please, change the current mail to')}>
              <div className="input-group mb-3">
                <input
                  name="new_site_mail"
                  required
                  type="text"
                  maxLength={50}
                  className="form-control" />
                <span className="input-group-text">@{selfDomen}</span>
              </div>
            </UNC_LABEL>
            <UNC_TEXTAREA
              name="user_message"
              label={__(163, 'Additionally inform')}
              min="1"
              rows="2"
              maxLength="1500"
              width="100"
            />
            <UNC_INPUT
              name="user_email"
              type="email"
              label={__(24, 'Email')}
              min="5"
              maxLength="100"
              width="100"
              required
              defaultValue={state.o.user.data.user_email}
            />
            <div className="delimeter"></div>
            <div className="alert alert-warning" role="alert">
              <p>{__(175, 'Changing the mail name will create a new mailbox. All information from the current mailbox will be deleted and is no longer available.')}</p>
            </div>
          </UNCONTROL_FORM>
        </Section>
      </div>
      <div className="col-12 col-md-6">
        <Section title={__(177, 'Connect mail on your domain')} static>
          <div className="alert alert-warning mb-3" role="alert">
            <p>{__(178, 'In order to connect mail on your domain, you need to send domain.Go to the Manage Domains page and connect your domain if you haven`t already')}</p>
            <div onClick={() => dispatch({
              type: 'SET_PAGE',
              payload: 'mydomen'
            })} className="text-end bold pointer text-decoration-underline">
              {__(179, 'Go to domain management')}
            </div>
          </div>

          <p className="h6 bold d-flex justify-content-between w-100">
            <span>{__(172, 'Your mail')}: {state.form.site_mail || 'Not added'}</span>
            {state.form.site_mail &&
              <a target="_blank" rel="noreferrer" href={`https://${selfDomen}/webmail`}>{__(176, 'Go to Webmail')}</a>}
          </p>

          <div className="delimeter"></div>

          <UNCONTROL_FORM theme='Call to support: Change mail with user domain'>

            <UNC_LABEL width="100" label={__(6, 'Domain')}>
              <input
                name="user_domain"
                type="text"
                min="3"
                maxLength="100"
                width="100"
                required
                placeholder="mydomain"
                onChange={(e) => setDomanName(e.target.value)}
                className="form-control" />
              <span className="small">{__(24, 'Specify the name of the domain on which you want to connect mail')}</span>
            </UNC_LABEL>

            <UNC_LABEL width="100" label={__(181, 'Enter the email name you want')}>
              <div className="input-group mb-3">
                <input
                  name="new_site_mail"
                  required
                  type="text"
                  maxLength={50}
                  className="form-control" />
                <span className="input-group-text">@{domainName}</span>
              </div>
            </UNC_LABEL>

            <div className="delimeter"></div>

            <UNC_TEXTAREA
              name="user_message"
              label={__(163, 'Additionally inform')}
              min="1"
              rows="2"
              maxLength="1500"
              width="100"
            />
            <UNC_INPUT
              name="user_email"
              type="email"
              label={__(24, 'Email')}
              min="5"
              maxLength="100"
              width="100"
              required
              defaultValue={state.o.user.data.user_email}
            />

          </UNCONTROL_FORM>
        </Section>
      </div>
    </div>
  )
}