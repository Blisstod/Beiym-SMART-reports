import {useField} from 'formik'

import style from './style.module.sass'
import cn from "classnames";

const ValidationError = ({error}) => {
    return (
        <div className={'text-danger form-text'}>{error}</div>
    )
}

const TextInput = ({label, hidden, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label hidden={hidden}>{label}</label>
            <input
                className={cn(style.input, 'w-100')}
                {...props}
                {...field}
            />
            {meta.touched && meta.error ? <ValidationError error={meta.error} /> : null }
        </>
    )
}

export default TextInput