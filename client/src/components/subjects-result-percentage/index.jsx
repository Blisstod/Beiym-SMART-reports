
import styles from './style.module.sass'
import cn from "classnames";

const getPercentage = (score, maxScore) => `${((score / maxScore) * 100).toFixed(1)} %`

const SubjectsResultPercentage = ({subjects}) => {
    return (
        <div className={styles.root}>
            <div className={styles.title}>Процент по предметам</div>
            <ul className={'mt-2 ps-0'}>
                {
                    subjects.map(subject => (
                        <li key={subject.name} className={cn(styles.subject, 'd-flex justify-content-between')}>
                            <div>{subject.name}</div>
                            <div>
                                {subject.score} / {subject.maxScore};
                                <span>{getPercentage(subject.score, subject.maxScore)}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SubjectsResultPercentage