import { Section } from "./section"
import { Catalog } from "./catalog"
import { Products } from "./products"
import i1 from '../img/product-icon.png'
import { _F } from "./lang"
import { useContext } from "react"
import { AppContext } from "../App"

export function Section7() {

  const { state } = useContext(AppContext)

  const confirm = (obj) => {
    let valid = true;
    for (let m in obj) {
      let o = state.form[_F(obj[m], state.local)]
      if (typeof o === 'object') {
        if (o.length === 0) valid = false
        for (let k in o) {
          if (o[k].name === undefined || o[k].name.length < 5)
            valid = false
        }
      }
      else {
        valid = false
      }
    }
    return valid
  }

  return (
    <Section
      level="vip"
      fields={['products']}
      confirmFunction={confirm}
      id="products"
      f="s23_title"
      icon={i1}
      defaultTitle="Products">
      <Products />
      <Catalog />
    </Section>
  )
}