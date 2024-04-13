import {Card} from "react-bootstrap";

import styles from './style.module.sass'

const LastExamTimeCard = ({days}) => {
    return (
        <Card className={styles.root}>
            <Card.Title className={styles.title}>Время с предыдущего экзамена</Card.Title>
            <Card.Text className={styles.text}>{days} дней</Card.Text>
        </Card>
    )
}

export default LastExamTimeCard