import React, { createContext, useReducer, useState, useEffect } from 'react';
import './App.scss';
import { reducer } from './c/reducer';

// Pages
import { PAGE } from './c/pages';

// Components
import { Topbar } from './c/topbar';
import { Nav } from './c/nav';
import { _Fetch } from './c/fetch';

export let AppContext = createContext(null);

function App() {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState("home");
  const [state, dispatch] = useReducer(reducer, {
    nav: [],
    form: null,
    validFields: [],
    page: "home",
    local: "en_US",
    o: window.o
  });

  useEffect(() => {

    if (window.Prototype) {
      delete Object.prototype.toJSON;
      delete Array.prototype.toJSON;
      delete String.prototype.toJSON;
    }

    _Fetch('init', '', (res) =>
      dispatch({
        type: "init",
        payload: res
      })
    )

    window.onscroll = () => {
      setOffset(window.pageYOffset)
    }

  }, [])

  useEffect(() => calculation(state), [state]) // Подсчитываем символы в полях

  useEffect(() => setPage(state.page), [state.page])


  return (

    <AppContext.Provider value={{ state, dispatch }}>

      <Topbar />

      <Nav offset={offset} />

      {state.form && <PAGE p={page} />}

    </AppContext.Provider>
  );
}

export default App;

// Подсчёт символов на главной
function calculation(state) {
  let sum = 0
  if (state.form && typeof state.form === "object") {
    let rep = Object.entries(state.form).filter((k) => {
      let valid = false
      const [key, value] = k
      const valueType = typeof value
      const notIN = ['catalog_items']

      for (let n in notIN) {
        if (key.includes(notIN[n])) return false
      }

      if (state.local && key.includes(state.local)) {

        switch (valueType) {
          case 'object':
            valid = true
            break;

          case 'string':
            if (value.length > 1) {
              valid = true
            }
            break;

          default:
            break;
        }
      }
      return valid
    })

    let dep = [];
    for (let key in rep) {
      dep.push(rep[key][1])
    }

    while (dep.length > 0) {
      const value = dep.pop();
      if (typeof value === "string") {
        sum += value.length
      }
      else if (typeof value === "object") {
        for (let p in value) {
          dep.push(value[p])
        }
      }
    }
  }
  window.sum = sum
  document.querySelectorAll(".how-many-simbols").forEach(k => k.innerText = sum)
}