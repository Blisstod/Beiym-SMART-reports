import {Card} from "react-bootstrap";

import style from './style.module.sass'

const GoalScoreCard = ({goalScore, currentScore}) => {
    return (
        <Card className={style.root}>
            <Card.Title className={style.title}>Цель</Card.Title>
            <div className={'d-flex justify-content-between'}>
                <Card.Text className={style.text}>{goalScore}</Card.Text>
                <Card.Text className={style.text}>
                    {goalScore <= currentScore ? 'Достигнута!' : 'Не достигнута!'}
                </Card.Text>
            </div>
        </Card>
    )
}

export default GoalScoreCard