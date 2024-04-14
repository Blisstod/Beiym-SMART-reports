

import commonScore from '../../assets/icons/common-score.svg'
import mathLiteracy from '../../assets/icons/math-literacy.svg'
import reading from '../../assets/icons/reading.svg'
import kazHistory from '../../assets/icons/kaz-history.svg'
import math from '../../assets/icons/math.svg'
import physics from '../../assets/icons/physics.svg'
import {Link} from "react-router-dom";

import styles from './style.module.sass'


// TODO: specify url (to), fetch from backend
const SubjectNavItem = ({subject}) => {

    let img = ''
    let text = ''
    switch (subject) {
        case 'commonScore':
            img = commonScore
            text = 'Общий балл'
            break
        case 'mathLiteracy':
            img = mathLiteracy
            text = 'Мат. Грамотность'
            break
        case 'reading':
            img = reading
            text = 'Грамотность чтения'
            break
        case 'kazHistory':
            img = kazHistory
            text = 'История Казахстана'
            break
        case 'math':
            img = math
            text = 'Математика'
            break
        case 'physics':
            img = physics
            text = 'Физика'
            break
    }


    return (
        <Link className={styles.root} to={`/${subject}`}>
            <img src={img} alt={'subject logo'}/>
            <div>{text}</div>
        </Link>
    )
}

export default SubjectNavItem