import { useContext } from "react";
import { AppContext } from "../App";
import { _Fetch } from "./fetch";
import { __ } from "./lang";


export function GET_REG_DATA_MESSAGE() {
    const { dispatch } = useContext(AppContext)

    const change = (e, variant) => {
        e.preventDefault()
        _Fetch('IMPORT_REG_DATA', variant, res => {
            dispatch({
                type: 'init',
                payload: res
            })
        })
    }

    return (
        <div className="top-bar-mess-wrapper mess-info">
            <p>{__(159, 'Import registration data')}?</p>
            <a onClick={(e) => change(e, 1)} className="mx-2" href="/" target="_blank" rel="noopener noreferrer">{__(160, 'YES')}</a>
            <a onClick={(e) => change(e, 0)} className="mx-2" href="/" target="_blank" rel="noopener noreferrer">{__(161, 'NO')}</a>
        </div>
    )
}