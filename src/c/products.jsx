import { useContext } from "react"
import { AppContext } from "../App"
import { Label } from "./inputs/input"
import { FileField } from "./inputs/file"
import { Notice } from "./notice"
import PlusBtn from '../img/plus-btn.png'
import { __, _F } from "./lang"

export function Products() {
  const { state, dispatch } = useContext(AppContext)
  const products = typeof state.form[_F('products', state.local)] === "object" ? state.form[_F('products', state.local)] : false
  const list = products && products.map((p, i) => {
    return <Product key={i} v={p} index={i} />
  })
  return (
    <>
      {list}
      {(!list || list.length < 4) &&
        <Add
          label={__(78, "Add a product") + ' (max. 4)'}
          action={() => dispatch({
            type: 'addNewProduct',
          })}
        />}
    </>
  )
}

function Product(props) {

  const { dispatch } = useContext(AppContext)

  const params = props.v.params !== undefined && props.v.params.map((p, i) => {
    return <Parameter
      key={'p' + i}
      l={`${props.index + 1}.${i + 1} ${__(65 + i, 'Description of the parameter')}`}
      productIndex={props.index}
      paramIndex={i}
      width="95"
      min="5"
      max="70"
      p={__(144, "Describe the main parameter...")}
    />
  })

  const deleteProduct = () => {
    if (window.confirm(__(74, "Delete product") + '?')) {
      dispatch({
        type: "removeProduct",
        payload: props.index
      })
      dispatch({
        type: "syncProducts"
      })
    }
  }

  if (props.index > 1) {
    return (
      <>
        <div className="d-flex align-center j-between w100p">
          <p className="fs-18 bold">{props.index + 1}. {__(60 + props.index, 'Description of the product')}</p>
          <div className="badge option" onClick={deleteProduct}>{__(74, 'Delete product')}</div>
        </div>
        <div className="col-10 d-flex j-between">
          <div className="col-8">
            <ProductOption
              l={__(64, "The product name")}
              f="name"
              width="100"
              p={__(147, "Name of the product or service")}
              className="input"
              productIndex={props.index}
              min="5"
              max="70"
            />
            <ProductOption
              l={__(76, "Product description")}
              f="caption"
              width="100"
              p={__(146, "Description of the product or service")}
              className="input"
              productIndex={props.index}
              min="15"
              max="150"
            />
            <ProductOption
              l={__(73, "Button text")}
              f="btnText"
              width="100"
              p={__(142, "Enter text")}
              className="input"
              productIndex={props.index}
              min="5"
              max="25"
            />
          </div>
          <div className="col-2">
            <FileField
              l="&nbsp;"
              f={`product_${props.index}_thumb`}
              note={__(77, "Upload a product image...")}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="d-flex align-center j-between w100p">
        <p className="fs-18 bold">{props.index + 1}. {__(60 + props.index, 'Description of the first parameter')}</p>
        <div className="badge option" onClick={deleteProduct}>{__(74, 'Delete product')}</div>
      </div>
      <ProductOption
        l={__(64, "The products name")}
        f="name"
        width="100"
        p={__(147, "Name of the product or service")}
        className="input"
        productIndex={props.index}
        min="5"
        max="70"
      />
      {params !== undefined && params.length > 0 && params}
      {params !== undefined && params.length <= 0 &&
        <Notice
          t={__(148, "Your product is missing parameters")}
          c="warning"
        />
      }
      {params !== undefined && params.length <= 5 &&
        <Add
          label={__(75, 'Add text box - product option') + " (max 6)"}
          action={() => dispatch({
            type: 'addNewParamToProduct',
            payload: props.index
          })}
        />
      }
      <ProductOption
        l={__(71, "Price and currency")}
        f="price"
        width="100"
        p={__(140, "Enter data")}
        className="input"
        productIndex={props.index}
        min="5"
        max="15"
      />
      <ProductOption
        l={__(72, "Additional condition to the price")}
        f="condition"
        width="100"
        p={__(141, "Enter condition text")}
        className="input"
        productIndex={props.index}
        min="5"
        max="40"
      />
      <ProductOption
        l={__(73, "Button text")}
        f="btnText"
        width="100"
        p={__(142, "Enter text")}
        className="input"
        productIndex={props.index}
        min="5"
        max="25"
      />
    </>
  )
}

function Parameter(props) {
  const { state, dispatch } = useContext(AppContext);
  const v = state.form[_F('products', state.local)][props.productIndex].params ? state.form[_F('products', state.local)][props.productIndex].params[props.paramIndex] : '';

  const change = (e) => {
    if (e.target.value.length > props.max) return
    dispatch({
      type: "updateProductParameter",
      payload: {
        productIndex: props.productIndex,
        paramIndex: props.paramIndex,
        value: e.target.value
      }
    })
  }

  const remove = (e) => {
    dispatch({
      type: "removeParamFromProduct",
      payload: {
        productIndex: props.productIndex,
        paramIndex: props.paramIndex,
      }
    })
  }

  const onBlur = (e) => {
    dispatch({
      type: "syncProducts"
    })
  }

  return (
    <div className="parameter d-flex align-center w100p">
      <Label counter={L(state, props)} v={L(state, props, true)}  {...props}>
        <input
          className="input"
          onChange={change}
          onBlur={onBlur}
          type="text"
          placeholder={props.p}
          value={v} />
      </Label>
      <i onClick={remove} className="remove"></i>
    </div>

  )
}

function ProductOption(props) {
  const { state, dispatch } = useContext(AppContext);
  const v = state.form[_F('products', state.local)][props.productIndex][props.f]
    ? state.form[_F('products', state.local)][props.productIndex][props.f] : '';

  const change = (e) => {
    if (props.max !== undefined && e.target.value.length > props.max) return
    dispatch({
      type: "updateProductOption",
      payload: {
        productIndex: props.productIndex,
        productField: props.f,
        value: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    dispatch({
      type: "syncProducts"
    })
  }

  return (
    <div className="parameter d-flex align-center w100p">
      <Label counter={props.max ? props.max - v.length : false} v={L(state, props, true)} {...props}>
        <input
          className="input"
          onChange={change}
          onBlur={onBlur}
          type="text"
          placeholder={props.p}
          max={props.max && props.max}
          value={v} />
      </Label>
    </div>

  )
}

export function Add(props) {
  return (
    <div className="add w100p" >
      <div onClick={props.action}>
        <img src={PlusBtn} alt="" />
        {props.label}
      </div>
    </div>
  )
}

function L(state, props, getValue = false) {
  const p = state.form[_F('products', state.local)][props.productIndex]

  let n = 0;
  if (props.productIndex === undefined) {
    n = p[props.paramIndex]
    n = n !== undefined ? n.length : 0
  }
  else if (props.productIndex !== undefined && props.paramIndex !== undefined) {
    n = state.form[_F('products', state.local)][props.productIndex].params[props.paramIndex]
    n = n !== undefined ? n.length : 0
  }
  else if (props.productIndex !== undefined && props.f !== undefined) {
    n = state.form[_F('products', state.local)][props.productIndex][props.f]
    n = n !== undefined ? n.length : 0
  }
  else if (props.count !== undefined) {
    n = props.count
  }

  if (getValue) // Если нужно получить только value поля
    return n

  if (props.max - n < 0) {
    return 0
  }
  else {
    return props.max - n
  }
}