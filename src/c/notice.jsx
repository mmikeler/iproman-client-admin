

export function Notice(props) {

    return (
        <div className={`notice ${props.c}`}>
            {props.t}
        </div>
    )
}