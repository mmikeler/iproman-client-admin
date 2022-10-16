import { useContext } from "react"
import { AppContext } from "../App"


export const locals = {
    English: "en_US",
    Русский: "ru_RU",
    Latviešu: "lv",
}

export function __(n, defaultN = false) {
    if (defaultN) {
        return window.localize ? window.localize[n] : defaultN
    }
    else {
        return window.localize ? window.localize[n] : "[get text]"
    }
}

export function _f(fieldName) {
    const { state } = useContext(AppContext)
    return fieldName + "[" + state.local + "]"
}

export function _F(fieldName, local) {
    return fieldName + "[" + local + "]"
}

export function getLangName(slug) {

    for (let l in locals) {
        if (locals[l] === slug) slug = l
    }

    return slug
}