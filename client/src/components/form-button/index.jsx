import cn from "classnames";
import styles from "./style.module.sass";

const FormButton = ({text}) => {
    return (
        <button
            className={cn(
                styles.button,
                'mt-3'
            )}
            type={'submit'}
        >
            {text}
        </button>
    )
}

export default FormButton