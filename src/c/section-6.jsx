import React from "react";
import { Section } from "./section";
import { Field } from "./inputs/input";
import icon from '../img/about-icon.png'
import { __ } from "./lang";

export function Section6(props) {
  return (
    <Section
      title="META"
      id="s6"
      className="part"
      icon={icon}
      fields={false}>
      <p className="notice"><i>{__(50, "Make changes in...")}</i></p>
      <div className="col-10">
        <Field
          key="page_title"
          type="textarea"
          l="Title"
          f="s6_1"
          className="input"
          max="500"
          min="0"
        />
        <Field
          key="page_description"
          type="textarea"
          l="Description"
          f="s6_2"
          className="input"
          max="500"
          min="0"
        />
        <Field
          key="page_keywords"
          type="textarea"
          l="Keywords"
          f="s6_3"
          className="input"
          max="500"
          min="0"
        />
      </div>
    </Section>
  )
}