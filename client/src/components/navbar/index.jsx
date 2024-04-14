
import logo from '../../assets/icons/beyim-logo.svg'

import styles from './style.module.sass'
import {Link} from "react-router-dom";

const tabs = [
    {}
]

const Navbar = () => {
    return (
        <nav className={styles.root}>
            <img className={styles.logo} src={logo} alt={'beyim logo'}/>
        </nav>
    )
}

export default Navbar