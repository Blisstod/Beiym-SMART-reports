import ValidationError from "../validation-error/index.jsx";
import {useField} from "formik";

import styles from './style.module.sass'
import cn from "classnames";

// eslint-disable-next-line react/prop-types
const SelectInput = ({label, hidden, options, ...props}) => {
    const [field, meta] = useField(props)

    return (
        <>
            <label hidden={hidden}>{label}</label>
            <select className={cn(styles.input, 'w-100')} {...field} {...props} />
            {meta.touched && meta.error ? <ValidationError error={meta.error} /> : null }
        </>
    )
}

export default SelectInput