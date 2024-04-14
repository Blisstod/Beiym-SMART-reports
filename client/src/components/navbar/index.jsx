
import logo from '../../assets/icons/beyim-logo.svg'

import styles from './style.module.sass'
import {Link} from "react-router-dom";

import avatar from '../../assets/icons/avatar.svg'
import SubjectNavItem from "../subject-nav-item/index.jsx";
import {Accordion} from "react-bootstrap";


// TODO: get user name from store

const Navbar = () => {
    return (
        <nav className={styles.root}>
            <Link className={styles.profileLink} to={'/me'}>
                <img src={avatar} alt={'user avatar'} />
                username
            </Link>

            <div className={styles.tabsLayout}>
                <ul className={styles.tabsList}>

                </ul>
            </div>

            <img className={styles.logo} src={logo} alt={'beyim logo'}/>
        </nav>
    )
}

export default Navbar