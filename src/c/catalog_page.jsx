import { useContext, useEffect } from "react"
import { AppContext } from "../App"
import { CHECKBOX, Label, Field } from "./inputs/input"
import { FileField } from "./inputs/file"
import { __, _f, _F } from "./lang"
import { Add } from "./products"
import { Section } from "./section"
import { useState } from "react"

export function CATALOG_PAGE() {
  const { state, dispatch } = useContext(AppContext)

  const catalogItems = typeof state.form[_f("catalog_items")] === "object" ? state.form[_f("catalog_items")] : false
  const catalogDisabled = catalogItems && catalogItems.length > 0 ? false : true
  const list = catalogItems && catalogItems.map((p, i) => {
    return <CATALOG_ITEM p={p} i={i} key={i} />
  })

  useEffect(() => {
    if (catalogDisabled) {
      dispatch({
        type: "updateField",
        payload: {
          f: "catalog_on",
          v: false
        }
      })
    }
  }, [state.form[_F("catalog_items", state.local)]])

  return (
    <div className="container catalog-wrapper pt-4">
      <h2>{__(126, 'Catalog management')}</h2>

      <div className="d-flex align-center justify-between">
        <div className="d-flex align-center bold pointer" onClick={() => dispatch({ type: "SET_PAGE", payload: "home" })}>
          <i className="bi bi-arrow-left-circle mr10" style={{ fontSize: "1.5rem" }}></i>
          {__(127, 'To main')}
        </div>
        <label className="d-flex align-center m-a" disabled={catalogDisabled}>
          <CHECKBOX f="catalog_on" disabled={catalogDisabled} />
          <div className="ml5 label">{__(128, 'Enable Catalog Page')}</div>
        </label>
      </div>

      <CATALOG_TITLES />

      <Section
        title={__(5, "My products")}
        className="part mb50"
      >
        {list}

        <div className="mt30 w100p">
          <Add
            label={__(129)}
            action={() => dispatch({
              type: 'ADD_CATALOG_ITEM',
            })} />
        </div>
      </Section>

    </div>
  )
}

function CATALOG_TITLES() {
  return (
    <Section
      title={__(1, 'Page')}
      id="catalog"
      className="part mb50"
      fields={["catalog_0", "catalog_1", "catalog_2"]}
    >
      <Field
        l={__(130, 'Catalog page name')}
        p={__(131, 'Enter page name')}
        f="catalog_2"
        width="100"
        className="input"
        min="5"
        max="150"
      />
      <Field
        l={__(132, 'Catalog page title')}
        p={__(133, 'Enter page title')}
        f="catalog_0"
        width="100"
        className="input"
        min="5"
        max="150"
      />
      <Field
        l={__(134, 'Catalog page description')}
        p={__(135, 'Enter page description')}
        f="catalog_1"
        width="100"
        className="input"
        min="15"
        max="600"
      />

    </Section>
  )
}

function CATALOG_ITEM(props) {

  const { state, dispatch } = useContext(AppContext)

  const remove = () => {
    if (window.confirm(__(136, 'Remove product'))) {
      dispatch({
        type: "REMOVE_CATALOG_ITEM",
        payload: props.i
      })
      dispatch({
        type: "SYNC_CATALOG"
      })
    }
  }

  return (
    <div className="catalog-item collaps" num={props.i + 1}>
      <div className="catalog-item__header">
        <div className="product-name">{props.p.title}</div>
        <div onClick={(e) => { e.target.closest('.catalog-item').classList.remove("collaps") }} className="collapse-toogle__down bi-arrow-down-square fs-2"></div>
        <div onClick={(e) => { e.target.closest('.catalog-item').classList.add("collaps") }} className="collapse-toogle__up bi-arrow-up-square fs-2"></div>
        <div className="bi-x-square fs-2 catalog-item__close-btn pointer" onClick={remove}></div>
      </div>

      <div className="col-10 catalog-item__body mt-4">
        <CatalogItemField
          l={__(137, 'Product name to display in the catalog')}
          p={__(138, 'Enter product name')}
          f="title"
          index={props.i}
          width="100"
          className="input"
          min="5"
          max="70"
        />
        <CatalogItemField
          l={__(139, 'Product description to display in the catalog')}
          p={__(149, 'Enter product description')}
          f="description"
          type="textarea"
          index={props.i}
          width="100"
          className="input"
          min="15"
          max="1200"
        />
        <CatalogItemField
          l={__(71, 'Price and currency')}
          p={__(140, 'Enter data')}
          f="price"
          index={props.i}
          width="100"
          className="input"
          min="5"
          max="70"
        />
        <CatalogItemField
          l={__(72, 'Additional condition to the price')}
          p={__(141, 'Enter condition text')}
          f="price_caption"
          index={props.i}
          width="100"
          className="input"
          min="5"
          max="70"
        />
        <CatalogItemField
          l={__(73, 'Button text')}
          p={__(142, 'Enter text')}
          f="txt_btn"
          index={props.i}
          width="100"
          className="input"
          min="3"
          max="25"
        />
        <Gallery i={props.i} count={state.form[_f("catalog_items")][props.i]['gallery'].length} />

        <div className="mt-5 d-flex">
          <div onClick={(e) => { e.target.closest('.catalog-item').classList.add("collaps") }} className="collapse-toogle__up bi-arrow-up-square fs-2 m-a"></div>
        </div>
      </div>
    </div>
  )
}

function CatalogItemField(props) {
  const { state, dispatch } = useContext(AppContext);
  const v = state.form[_F("catalog_items", state.local)][props.index][props.f]
    ? state.form[_F("catalog_items", state.local)][props.index][props.f] : '';

  const change = (e) => {
    if (props.max !== undefined && e.target.value.length > props.max) return
    dispatch({
      type: "UPD_CATALOG_ITEM_FIELD",
      payload: {
        i: props.index,
        f: props.f,
        v: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    dispatch({
      type: "SYNC_CATALOG"
    })
  }

  return (
    <div className="parameter d-flex align-center w100p">
      <Label counter={props.max ? props.max - v.length : false} v={v} {...props}>
        {props.type !== "textarea" &&
          <input
            filedKey={props.f}
            className="input"
            onChange={change}
            onBlur={onBlur}
            type="text"
            placeholder={props.p}
            max={props.max && props.max}
            value={v} />
        }
        {props.type === "textarea" &&
          <textarea
            filedKey={props.f}
            className="input"
            onChange={change}
            onBlur={onBlur}
            rows="7"
            type="text"
            placeholder={props.p}
            max={props.max && props.max}
            value={v}></textarea>
        }
      </Label>
    </div>

  )
}

function Gallery(props) {
  let list = []

  for (let index = 0; index < 5; index++) {
    list.push(<FileField
      key={index}
      l=""
      f="catalog_item_gallery_item"
      item_i={props.i}
      gallery_i={index}
      note={__(143, 'Upload a product image')}
      nolocal={true}
      removeCB={(e) => {
        if (e.target.closest('.gallery')) {
          e.target.closest(".ff-wrapper").remove()
        }
      }}
    />)
  }

  return (
    <>
      <p className="bold">{__(145, 'Product gallery')}</p>
      <div className="gallery">
        {list}
      </div>
    </>
  )
}