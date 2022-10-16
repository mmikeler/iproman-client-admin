import React from "react";
import { Section } from "./section";
import { Field } from "./inputs/input";
import { FileField } from "./inputs/file";

import i1 from '../img/main_aff_icon.png'
import { __ } from "./lang";

export function SectionTwo(props) {
  return (
    <Section className="part" id="s2" title={__(32, "Main offer")} icon={i1}>
      <Section title={__(33, "Short presentation of your business")} fields={['s2_1', 's2_2']}>
        <Field
          l={__(34, "Title of a short presentation on the main page")}
          f="s2_1"
          width="100"
          p={__(35, "How do you introduce your business to a potential client in one or two sentences?")}
          className="input"
        />
        <Field
          l={__(36, "The text of first")}
          f="s2_2"
          width="100"
          p={__(37, "You need to present your offer or your business in such a way as to interest your potential client as much as possible. What was your client looking for before visiting the site? Supplier of certain goods or services. Write in such a way that the client understands that he found exactly what he was looking for. What will you sell to your client (briefly, as the detailed description of the products will be in subsequent blocks)? Why is it better to contact you?")}
          className="input"
          type="textarea"
        />
      </Section>
      <Section fields={['s2_3', 's2_4', 's2_5', 's2_6', 's2_7', 's2_8', 's2_9', 's2_10', 's2_11', 's2_12', 's2_13', 's2_14']} title={__(38, '4 important arguments')}>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(39, "Argument header")}
              f="s2_3"
              width="100"
              p={__(40, "Applications")}
              className="input"
            />
            <Field
              l={__(41, "Description of the argument")}
              f="s2_4"
              width="100"
              p={__(42, "Attracting customers for your business")}
              className="input"
            />
          </div>
          <div className="col-2">
            <FileField
              f="s2_5"
              l=""
              note={__(43, "Upload an image to display on the website of the argument. Size:") + " 100x100px"}
              btnText={false}
            />
          </div>
        </div>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(39, "Argument header")}
              f="s2_6"
              width="100"
              p={__(45, "Promotion")}
              className="input"
            />
            <Field
              l={__(41, "Description of the argument")}
              f="s2_7"
              width="100"
              p={__(47, "Advertising your product...")}
              className="input"
            />
          </div>
          <div className="col-2">
            <FileField
              f="s2_8"
              l=""
              note={__(43, "Upload an image to display...") + " 100x100px"}
              btnText={false}
            />
          </div>
        </div>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(39, "Argument header")}
              f="s2_9"
              width="100"
              p={__(49, "Web site")}
              className="input"
            />
            <Field
              l={__(41, "Description of the argument")}
              f="s2_10"
              width="100"
              p={__(51, "Order a website...")}
              className="input"
            />
          </div>
          <div className="col-2">
            <FileField
              f="s2_11"
              l=""
              note={__(43, "Upload an image to display...") + " 100x100px"}
              btnText={false}
            />
          </div>
        </div>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(39, "Argument header")}
              f="s2_12"
              width="100"
              p={__(54, "Advertising")}
              className="input"
            />
            <Field
              l={__(41, "Description of the argument")}
              f="s2_13"
              width="100"
              p={__(56, "Order advertising on the...")}
              className="input"
            />
          </div>
          <div className="col-2">
            <FileField
              f="s2_14"
              l=""
              note={__(43, "Upload an image to display...") + " 100x100px"}
              btnText={false}
            />
          </div>
        </div>
      </Section>

    </Section>
  )
}