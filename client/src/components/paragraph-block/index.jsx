
import styles from './style.module.sass'

const ParagraphBlock = ({title, text}) => {

    return (
        <div className={styles.root}>
            <div className={styles.title}>{title}</div>
            <p className={styles.paragraph}>
                {text}
            </p>
        </div>
    )
}

export default ParagraphBlock