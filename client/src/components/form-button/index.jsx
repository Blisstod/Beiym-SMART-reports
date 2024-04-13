import cn from "classnames";
import styles from "./style.module.sass";

const FormButton = () => {
    return (
        <button
            className={cn(
                styles.button,
                'mt-3'
            )}
            type={'submit'}
        >
            Далее
        </button>
    )
}

export default FormButton