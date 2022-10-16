import { useContext } from "react";
import { AppContext } from "../App";
import { UNCONTROL_FORM, UNC_INPUT, UNC_LABEL, UNC_TEXTAREA } from "./inputs/uncontrol_form";
import { __ } from "./lang";
import { Section } from "./section";


export function DOMAIN_PAGE() {

  const { state } = useContext(AppContext)

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <Section title={__(165, 'Free domain change')} static>
          <UNCONTROL_FORM theme="Call to support: Change domain">
            <UNC_LABEL width="100" label={__(166, 'Please, change the current domain to')}>
              <div className="input-group mb-3">
                <input name="my_domain" required type="text" className="form-control" />
                <span className="input-group-text">biz.host</span>
              </div>
            </UNC_LABEL>
            <UNC_TEXTAREA
              name="user_message"
              label={__(163, 'Additionally inform')}
              min="1"
              rows="3"
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
      <div className="col-12 col-md-6">
        <Section title={__(167, 'Connecting your domain')} static>
          <UNCONTROL_FORM theme="Call to support: Change domain to my domain">
            <div className="alert alert-warning mb-5">
              <p>{__(168, 'Change the ns-servers in the DNS settings of the hosting where your domain is registered')}</p>
              <p>DNS settings → NS-server → NS1: ns1.nano.lv NS2: ns2.nano.lv</p>
            </div>

            <UNC_LABEL width="100" label={__(168, 'Specify the domain you want to attach')}>
              <div className="input-group mb-3">
                <input required name="my_domain" type="text" className="form-control" placeholder="mydomain.com" maxLength={30} />
              </div>
            </UNC_LABEL>
            <UNC_TEXTAREA
              name="user_message"
              label={__(163, 'Additionally inform')}
              min="1"
              rows="3"
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