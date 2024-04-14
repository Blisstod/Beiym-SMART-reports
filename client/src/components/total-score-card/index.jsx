import {Card} from "react-bootstrap";

import styles from './style.module.sass'

const TotalScoreCard = ({all, total}) => {
    return (
        <Card className={styles.root}>
            <Card.Title className={styles.title}>Общий балл за последний экзамен</Card.Title>
            <Card.Text className={styles.text}>{total} / {all} Баллов</Card.Text>
        </Card>
    )
}

export default TotalScoreCard