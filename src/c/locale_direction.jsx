import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { __, _F } from "./lang";
import { locals } from "./lang";
import { CHECKBOX } from "./inputs/input";
import { getLangName } from "./lang";


export function LOCALE_DIRECTION(props) {
	const [openLangList, setOpenLangList] = useState(false)
	return (
		<>
			<div
				onClick={() => setOpenLangList(true)}
				className="btn btn-with-icon green"
				title={__(108, 'Localization management')}>
				<div className="bi bi-translate"></div>
			</div>
			{openLangList && <LD_PLANC closeAction={setOpenLangList} />}
		</>
	)
}

function LD_PLANC(props) {

	const { state } = useContext(AppContext)

	const list = state.form.site_languages?.map((n, i) => {
		return <LIST_ITEM
			key={i}
			index={i}
			length={state.form.site_languages.length - 1}
			lang={getLangName(n)}
			defaultLang={state.form.default_site_lang} />
	})

	return (
		<div className="offcanvas offcanvas-start show" style={{ display: 'flex' }} aria-labelledby="offcanvasExampleLabel">
			<div className="offcanvas-header">
				<h5 className="offcanvas-title" id="offcanvasExampleLabel">{__(108, 'Localization management')}</h5>
				<button type="button" className="btn-close" aria-label="Close" onClick={() => props.closeAction(false)}></button>
			</div>
			<div className="offcanvas-body">
				<div className="site-languages-list">
					<h6 className="mb-3">{__(156, 'Your site may be available in these languages')}:</h6>
					{list}
				</div>
				<h6 className="mt-5">{__(157, 'You can add localization for a site from this list')}:</h6>
				<LangList {...props} />
			</div>
			<div className="offcanvas-footer">
				<div className="info">
					<ul>
						<li>{__(155, 'The first item in your list of added languages is the site`s default language')}</li>
						<li>{__(158, 'To change the main language of the site, move it to the top of the list')}</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

function LIST_ITEM(props) {

	const { dispatch } = useContext(AppContext)
	const disabled = props.index === 0

	const move = (vector) => {
		dispatch({
			type: 'MOVE_LANG_TO_LIST_POSITION',
			payload: props.index + vector
		})
	}

	const remove = () => {
		dispatch({
			type: 'REMOVE_LANG_FROM_SITE_LANGS',
			payload: props.index
		})
	}

	return (
		<div className="item" order={disabled ? 1 : ''}>
			{props.lang}
			<div className="options">
				{!disabled ?
					<>

						<div className="move-item d-flex me-3">
							<div onClick={() => move(-1)} className="bi bi-arrow-up-square"></div>
							{props.index < props.length && <div onClick={() => move(0)} className="bi bi-arrow-down-square"></div>}
						</div>

						<CHECKBOX
							f={_F("lang_on", locals[props.lang])}
							nolocale={true}
							disabled={false} />

						<div className="remove" onClick={remove}></div>

					</>

					: <span>{__(154, 'Default site language')}</span>}
			</div>
		</div>
	)
}

function LangList() {

	const { state, dispatch } = useContext(AppContext)
	const openLangs = state.form.site_languages

	const change = (lang, open) => {
		!open && locals[lang] &&
			dispatch({
				type: 'ADD_LANG',
				payload: locals[lang]
			})
	}

	const list = []
	for (let item in locals) {
		const open = openLangs.includes(locals[item]) ? 1 : 0
		list.push(
			<div
				onClick={() => change(item, open)}
				key={item}
				data-open={open}
				className="item">
				<span>{locals[item]}</span>{item}
			</div>
		)
	}

	return (
		<div className="lang-list">
			{list}
		</div>
	)
}