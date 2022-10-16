import { Section } from "./section"
import icon from '../img/about-icon.png'
import { Field } from "./inputs/input"
import { FileField } from "./inputs/file";
import { __ } from "./lang"

export function SectionThree(props) {
  return (
    <Section
      id="s3"
      className="part"
      defaultTitle={__(80, "About company")}
      f="s3_title"
      icon={icon}>
      <Section
        level="vip"
        fields={['s3_1', 's3_2', 's3_3']}
        title={__(81, "Article about your company")}>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(82, "Article title")}
              f="s3_1"
              width="100"
              p={__(83, "About our company ")}
              className="input"
            />
            <Field
              l={__(84, "The text of the article...")}
              f="s3_2"
              width="100"
              p={__(85, "Write the key data...")}
              className="input"
              type="textarea"
            />
          </div>
          <div className="col-2">
            <FileField
              l="&nbsp;"
              f="s3_3"
              note={__(46, "Recommended size") + " 1170х450 px"}
              className="input"
            />
          </div>
        </div>
      </Section>
      <Section level="vip" fields={['s3_4', 's3_5', 's3_6']} title={__(86, "Video presentation")}>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <Field
              l={__(87, "Title")}
              f="s3_4"
              width="100"
              p={__(142, "Enter text")}
              className="input"
            />
            <Field
              l={__(89, "Text")}
              f="s3_5"
              width="100"
              p={__(90, "Write information indicating...")}
              className="input"
              type="textarea"
            />
          </div>
          <div className="col-2">
            <FileField
              l="&nbsp;"
              f="s3_6"
              note={__(91, "Upload a video...")}
              type="video"
              className="input"
            />
          </div>
        </div>
      </Section>
      <Section
        level="vip"
        fields={['s2_1-1', 's2_1-2', 's2_1-3', 's2_2-1', 's2_2-2', 's2_2-3', 's2_3-1', 's2_3-2', 's2_3-3']}
        f="s33_title"
        defaultTitle={__(92, "Our advantages")}>
        <Points length={3} />
      </Section>
    </Section>
  )
}

function Points(props) {

  const points = () => {
    let out = [];

    for (let i = 0; i < props.length; i++) {
      out.push(
        <Point key={i} i={i + 1} />
      )

    }

    return out;
  }

  return points();
}

function Point(props) {
  return (
    <div className="point w100p">
      <p className="fs-18 bold">{props.i}. {__(92 + props.i, "advantage")}</p>
      <div className="col-10 d-flex j-between">
        <div className="col-8">
          <Field
            l={__(100, "Benefit heading")}
            f={`s2_${props.i}-1`}
            className="input"
            width="100"
            p={__(100 + props.i, "We are the best!")}
          />
          <Field
            l={__(96, "Description of the benefit")}
            f={`s2_${props.i}-2`}
            className="input"
            width="100"
            p={__(97, "Describe your benefit. Keep within 100 characters.")}
            type="textarea"
          />
        </div>
        <div className="col-2">
          <FileField
            f={`s2_${props.i}-3`}
            l="&nbsp;"
            note={__(98, "Upload a picture of the benefit. Size:") + ` 130х130px`}
            btnText={__(99, "Upload")}
          />
        </div>
      </div>
    </div>
  )
}