import React from "react";
import { Section } from "./section";
import { Field } from "./inputs/input";
import { FileField } from "./inputs/file";
import icon from '../img/about-icon.png'
import { __ } from "./lang";

export function SectionFive(props) {
  return (
    <Section
      title={__(52, "Additionally")}
      id="s5"
      className="part"
      icon={icon}
      fields={false}>
      <div className="col-8">
        <Field
          key="copyright"
          l={__(55, "Copyright text")}
          f="s5_1"
          className="input"
          max="50"
          min="0"
        />
      </div>

      <div className="col-2 company-logo">
        <FileField
          l={__(57, "Favicon - icon on browser tab")}
          btnText={__(99, "Upload")}
          note={__(31, 'Recommended size') + " 512х512 px"}
          f="s6_4" />
      </div>

    </Section>
  )
}