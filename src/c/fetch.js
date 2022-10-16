export function Fetch(key, value, cb = false) {
    let data = new FormData()
    data.append('action', 'update_meta')
    data.append('meta_key', key)
    data.append('meta_value', value)

    fetch(window.o.ajaxUrl, {
            method: 'POST',
            body: data,
        })
        .then(res => isJson(res) ? res.json() : "")
        .then(res => cb ? cb(res) : res)
        .catch()
}

export function _Fetch(action, options = false, cb = false) {
    let data = new FormData()
    data.append('action', action)
    options && data.append('options', JSON.stringify(options))

    fetch(window.o.ajaxUrl, {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then(res => cb ? cb(res) : res)
        .catch()
}

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}