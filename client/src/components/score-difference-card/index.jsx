import {Card} from "react-bootstrap";

import arrowUpIcon from '../../assets/icons/arrow-up.svg'

import style from './style.module.sass'
import cn from "classnames";

const calculateDifference = (prev, current) => {
    const res = (current - prev) / prev * 100
    return res.toFixed(1)
}

const ScoreDifferenceCard = ({prev, current}) => {

    const change = calculateDifference(prev, current)

    return (
        <Card className={style.root}>
            <Card.Title className={style.title}> Разница с преведущем экзаменом</Card.Title>
            <div className={'d-flex justify-content-between align-items-center'}>
                <Card.Text className={style.text}>{prev} {'>'} {current}</Card.Text>
                <Card.Text className={cn(style.textSmall, 'd-flex')}>
                    {change < 0 ? change : `+${change}`}
                    <img
                        className={cn({[style.arrowDown]: change < 0})}
                        src={arrowUpIcon}
                        alt={'arrow'}
                    />
                </Card.Text>
            </div>
        </Card>
    )
}

export default ScoreDifferenceCard