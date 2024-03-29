import classNameObj from "./InputField.module.css"

export default function InputField({input, meta, ...props}) {
    console.log(props)
    let hasError = meta.error && meta.touched

    return (
        <div className={classNameObj.InputFieldContainer}>
            <input {...input} {...props}></input>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
