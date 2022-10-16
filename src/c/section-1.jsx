import React from "react";
import { Section } from "./section";
import { Field, OptionalInput } from "./inputs/input";
import { FileField } from "./inputs/file";

import i1 from '../img/contacts_header_icon.png'
import { __ } from "./lang";

export function SectionOne() {
  return (
    <Section
      title={__(21, "Contact information")}
      id="s1"
      icon={i1}
      className="part"
      fields={['s1_1', 's1_2', 's1_3', 's1_4']}>
      <div className="col-8">
        <Field
          key="title"
          l={__(22, "Name of the business")}
          f="s1_1"
          className="input"
        />
        <Field
          key="phone"
          l={__(23, "Phone number")}
          f="s1_2"
          className="input"
          p="+__________"
        />
        <Field
          key="email"
          l={__(24, "Email")}
          f="s1_3"
          className="input"
        />
        <Field
          key="location"
          l={__(25, "Address")}
          f="s1_4"
          className="input"
        />
        <Field
          key="s1_6"
          l={__(53, "Contact button text (in the header)")}
          f="s1_6"
          className="input"
        />
      </div>
      <div className="col-2 company-logo">
        <FileField
          l={__(28, "Contact information")}
          btnText={__(30, "Upload your logo")}
          note={__(31, "Recommended size") + " 512х512px"}
          f="s1_5" />
      </div>
      <div className="col-8 s1__2">
        <div className="col-5">
          <div className="fs-18 mb10"><b>{__(26, "Social media")}:</b></div>
          <OptionalInput
            key="vk"
            l={__(27, "Link to") + " VK"}
            f="vk"
            className="input"
          />
          <OptionalInput
            key="fb"
            l={__(27) + " Facebook"}
            f="fb"
            className="input"
          />
          <OptionalInput
            key="ok"
            l={__(27) + " Instagram"}
            f="inst"
            className="input"
          />
        </div>
        <div className="col-5">
          <div className="fs-18 mb10"><b>{__(151, "Messengers")}:</b></div>
          <OptionalInput
            key="whatsapp"
            l="WhatsApp"
            f="whatsapp"
            className="input"
            p="+________"
            type="phone"
          />
          <OptionalInput
            key="viber"
            l="Viber"
            f="viber"
            className="input"
            p="+________"
            type="phone"
          />
          <OptionalInput
            key="telegram"
            l="Telegram"
            f="telegram"
            className="input"
            type="phone"
          />
        </div>
      </div>
    </Section>
  )
}