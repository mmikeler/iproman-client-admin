import { Fetch, isJson } from "./fetch"
import { locals, _F, __, } from "./lang"

export function reducer(state, action) {

  const {
    type,
    payload
  } = {
    ...action
  }
  let products;
  let sf = state.form;
  switch (type) {

    case "init":
      state.form = payload
      state.options = window.o

      for (let l in state.form) {
        let json = state.form[l];
        if (isJson(json)) {
          state.form[l] = JSON.parse(json)
        }
        switch (l) {
          case 'site_languages':
            state.form[l] = state.form[l].split(',')
            break;

          default:
            break;
        }
      }

      state.local = state.form?.site_languages[0]
      break

    case "setNavItem":
      state.nav.push(payload)
      break

    case "updateField":
      if (payload.f === 's1_2' || payload.type === 'phone') {
        if (payload.v[0] !== '+' && payload.v.length > 1) {
          state.form[action.payload.f] = '+' + action.payload.v;
        } else {
          state.form[action.payload.f] = action.payload.v;
        }
      } else {
        state.form[action.payload.f] = action.payload.v;
      }
      break

    case "addNewProduct":
      products = typeof state?.form[_F('products', state.local)] === 'object' ? state?.form[_F('products', state.local)] : []
      if (products.length < 4) {
        if (products.length < 2) {
          products.push({
            params: [''],
            price: "",
            condition: "",
            btnText: __(104, "Connect with us"),
          })
        } else {
          products.push({
            name: "",
            caption: "",
            btnText: __(104, "Connect with us"),
          })
        }
      }
      state.form[_F('products', state.local)] = products
      break

    case "removeProduct":
      products = state.form ? state.form[_F('products', state.local)] : false
      products.splice(payload, 1)
      break

    case "addNewParamToProduct":
      products = state.form ? state.form[_F('products', state.local)] : false
      let params = products[action.payload].params
      if (params.length < 6) {
        products[payload].params = params.concat([''])
      }
      break

    case "updateProductParameter":
      products = state.form ? state.form[_F('products', state.local)] : false
      products[payload.productIndex].params[payload.paramIndex] = payload.value
      break

    case "removeParamFromProduct":
      products = state.form ? state.form[_F('products', state.local)] : false
      products[payload.productIndex].params.splice(payload.paramIndex, 1);
      Fetch('products', prepareArray(state.form.products))
      break

    case "updateProductOption":
      products = state.form ? state.form[_F('products', state.local)] : false
      state.form[_F("products", state.local)][payload.productIndex][payload.productField] = payload.value
      break

    case "syncProducts":
      Fetch(_F('products', state.local), prepareArray(state.form[_F('products', state.local)]))
      break

    case "addSubject":
      if (state.form[_F("s4_6", state.local)] && state.form[_F("s4_6", state.local)].length <= 3) {
        state.form[_F("s4_6", state.local)].push('')
      }
      else {
        state.form[_F("s4_6", state.local)] = ['']
      }
      break

    case "updateSubject":
      state.form[_F("s4_6", state.local)][payload.index] = payload.value
      break

    case "syncSubjects":
      Fetch(_F('s4_6', state.local), prepareArray(state.form[_F('s4_6', state.local)]))
      break

    case "ADD_CATALOG_ITEM":
      let items = state.form[_F("catalog_items", state.local)]
      if (items === undefined || items === "") {
        items = []
      }
      items.push(newCatalogItem())
      state.form[_F("catalog_items", state.local)] = items
      break

    case "UPD_CATALOG_ITEM_FIELD":
      state.form[_F("catalog_items", state.local)][payload.i][payload.f] = payload.v
      break

    case "REMOVE_CATALOG_ITEM":
      state.form[_F("catalog_items", state.local)].splice(payload, 1)
      if (state.form[_F("catalog_items", state.local)].length === 0) {
        state.form['catalog_on'] = false
      }
      break

    case "UPD_CATALOG_ITEM_GALLERY_ITEM":
      state.form[_F("catalog_items", state.local)][payload.item_i].gallery[payload.gallery_i] = payload.id
      Fetch(_F('catalog_items', state.local), prepareArray(state.form[_F("catalog_items", state.local)]), (result) => { })
      break

    case "REMOVE_CATALOG_ITEM_GALLERY_ITEM":
      state.form[_F("catalog_items", state.local)][payload.item_i].gallery.splice(payload.gallery_i, 1);
      Fetch(_F('catalog_items', state.local), prepareArray(state.form[_F("catalog_items", state.local)]), (result) => { })
      break

    case "SYNC_CATALOG":
      Fetch(_F('catalog_items', state.local), prepareArray(state.form[_F("catalog_items", state.local)]), (result) => { })
      break

    case "SET_PAGE":
      state.page = payload
      break

    case "SWITCH_LOCAL_PAGE":
      state.local = payload
      break

    case "SET_SECTION_CONFIRM_STATUS":
      state[payload.sectionID] = payload.status
      break

    case "UPD_MEDIA":
      if (state.form.media?.length !== payload?.length)
        state.form.media = payload
      break

    case "ADD_LANG":
      state.form.site_languages.push(payload)
      Fetch('site_languages', state.form.site_languages)
      break

    case "MOVE_LANG_TO_LIST_POSITION":
      const arr = state.form.site_languages
      arr.splice(payload, 2, arr[payload + 1], arr[payload]);
      Fetch('site_languages', state.form.site_languages)
      break

    case "REMOVE_LANG_FROM_SITE_LANGS":
      const removeLocal = state.form.site_languages.splice(payload, 1)
      state.local = sf.site_languages[0]
      Fetch('site_languages', state.form.site_languages)
      Fetch('lang_on[' + removeLocal + ']', 0)
      document.cookie = "ip_lang=" + state.local + "; path=/; expires=" + new Date().getTime() + (2 * 86400) + "; domen=" + state.o.homeUrl.split('://')[1]
      break

    default:
      throw new Error();
  }
  return { ...state }
}

function prepareArray(array) {
  return JSON.stringify(array);
}

function newCatalogItem() {
  return {
    title: "",
    description: "",
    price: "",
    price_caption: "",
    txt_btn: "",
    gallery: []
  }
}