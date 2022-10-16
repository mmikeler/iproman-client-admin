import { AppContext } from "../../App";
import React, { useRef, useState, useContext, useEffect } from "react";
import { Fetch, _Fetch } from "../fetch";
import { __, _f, _F } from "../lang";

export function FileField(props) {

  const { state, dispatch } = useContext(AppContext)
  const [fileData, setFileData] = useState(null)
  const [upload, uploaded] = useState(false)
  const [uploadPanel, uploadPanelToggle] = useState(false)
  const wrapper = useRef()

  const f = props.nolocal !== true ? _f(props.f) : props.f

  const change = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    uploaded(true)
    uploadPanelToggle(false)
    reader.onloadend = () => {

      let data = new FormData()
      data.append('action', 'upload_file')
      data.append('file', file)
      data.append('meta_key', f)

      // допы для галереи продуктов
      if (f === "catalog_item_gallery_item") {
        data.append("item_index", props.item_i)
        data.append("gallery_index", props.gallery_i)
      }

      fetch(state.options.ajaxUrl, {
        method: 'POST',
        body: data
      })
        .then(res => res.json())
        .then(
          (result) => {
            setFileData(result);
            if (f === "catalog_item_gallery_item") {
              dispatch({
                type: 'UPD_CATALOG_ITEM_GALLERY_ITEM',
                payload: {
                  item_i: props.item_i,
                  gallery_i: props.gallery_i,
                  id: result
                }
              })
            }
            else {
              dispatch({
                type: 'updateField',
                payload: {
                  f: f,
                  v: result,
                  type: props.type
                }
              })
            }
          },
          // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            // error
          }
        )
    }

    reader.readAsDataURL(file)
  }

  const remove = (e) => {
    e.stopPropagation()
    if (f === "catalog_item_gallery_item") {
      dispatch({
        type: 'REMOVE_CATALOG_ITEM_GALLERY_ITEM',
        payload: {
          item_i: props.item_i,
          gallery_i: props.gallery_i,
        }
      })
    }
    else {
      dispatch({
        type: "updateField",
        payload: {
          f: f,
          v: ""
        }
      })
    }
    setFileData(null)
    let data = new FormData()
    data.append('action', 'remove_thumb')
    data.append('meta_key', f)

    if (f === "catalog_item_gallery_item" && state.form[_f("catalog_items")] !== undefined) {
      data.append('item_i', props.item_i)
      data.append('gallery_i', props.gallery_i)
    }

    fetch(state.options.ajaxUrl, {
      method: 'POST',
      body: data
    })

    props.removeCB();
  }

  useEffect(() => {
    let data = new FormData()
    data.append('action', 'get_thumb')

    if (state.form[f] && state.form[f] !== undefined) {
      if (f !== "catalog_item_gallery_item") {
        data.append('file_id', state.form[f])
      }
    }
    if (f === "catalog_item_gallery_item" && state.form[_F("catalog_items", state.local)] !== undefined) {
      data.append('file_id', state.form[_F("catalog_items", state.local)][props.item_i]["gallery"][props.gallery_i])
    }

    fetch(state.options.ajaxUrl, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(
        (result) => {
          setFileData(result)
          uploaded(false)
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          // error
        }
      )
  }, [fileData, state.local])

  const isVideo = (url) => {
    let arr = url ? url.toString().split('.') : [];
    if (arr[arr.length - 1] === 'mp4') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {uploadPanel &&
        <UploadPanel
          {...props}
          closeAction={() => uploadPanelToggle(false)}
          setFileData={setFileData}
          change={change} />
      }
      <div ref={wrapper} fieldkey={props.f} className="ff-wrapper" onClick={() => uploadPanelToggle(true)}>
        <div className="header">
          <span className="label">{props.l}</span>
        </div>
        <div
          className={`logo-wrapper${isVideo(fileData) ? " video" : ""}`}
          style={{ background: "#fff url(" + fileData + ") no-repeat center / contain" }}
        >
          {<DeleteBtn remove={remove} file={fileData} />}
          {isVideo(fileData) &&
            <video width="100%" src={fileData} />
          }
          {!fileData &&
            <div className="ff-notice">{props.note}</div>
          }
          {
            upload && <div className="uploader">{__(150, "Loading")}</div>
          }
        </div>

      </div>
    </>
  )
}

function DeleteBtn(props) {
  let str = <div onClick={props.remove} className="remove-file badge"><i className="bi bi-x-lg"></i></div>
  if (props.file) {
    return str
  }
  else {
    return null
  }
}

function UploadPanel(props) {

  return (
    <div className="offcanvas offcanvas-end show" style={{ display: 'flex' }} aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">{__(106, 'Add image')}</h5>
        <button type="button" className="btn-close" aria-label="Close" onClick={props.closeAction}></button>
      </div>
      <div className="offcanvas-body">
        <label className="field">
          <span className="upload-btn">{__(105, "Add new image")}</span>
          <input onChange={props.change} type="file" accept=".jpg, .jpeg, .png, .mp4" />
        </label>
        <p className="text-center">{__(107, 'or choose from the collection')}</p>
        <MediaCollection {...props} closeAction={props.closeAction} />
      </div>
    </div>
  )
}

function MediaCollection(props) {

  const { state, dispatch } = useContext(AppContext)
  let list = []

  const change = (mediaFile) => {
    // Если работаем в каталоге
    if (props.f === 'catalog_item_gallery_item') {
      dispatch({
        type: 'UPD_CATALOG_ITEM_GALLERY_ITEM',
        payload: {
          item_i: props.item_i,
          gallery_i: props.gallery_i,
          id: mediaFile[1]
        }
      })
    }
    // Общий случай
    else {
      dispatch({
        type: 'updateField',
        payload: {
          f: _F(props.f, state.local),
          v: mediaFile[1]
        }
      })
      Fetch(_F(props.f, state.local), mediaFile[1])
    }
    // Закрываем медиагалерею
    props.setFileData(mediaFile[0])
    props.closeAction()
  }

  if (state.form?.media && state.form.media?.length > 0) {
    list = state.form.media.map((file, i) => {
      return (
        <div
          key={i}
          onClick={() => change(file)}
          className="placeholder-glow uploaded"
          style={{ backgroundImage: `url(${file[0]})` }}>
        </div>
      )
    })
  }
  else {
    let i = 10;
    while (i > 0) {
      i--;
      list.push(
        <div className="placeholder-glow">
          <div className="placeholder"></div>
        </div>
      )
    }
  }

  useEffect(() => {
    _Fetch('get_media_collection', '', (res) => {
      dispatch({
        type: 'UPD_MEDIA',
        payload: res
      })
    })
  }, [])

  return (
    <div className="media-collection">
      {list}
    </div>
  )
}