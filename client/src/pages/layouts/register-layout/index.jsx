import {Outlet} from "react-router-dom";
import cn from "classnames";
import styles from "../../register-page/style.module.sass";
import logo from "../../../assets/icons/beyim-logo.svg";

const RegisterLayout = () => {
    return (
        <>
            <section
                className={cn(
                    styles.root,
                    'pt-5'
                )}
            >
                <img
                    className={cn(styles.logo,)}
                    src={logo}
                    alt={'Beyim logo'}
                />

                <Outlet/>
            </section>
        </>
    )
}

export default RegisterLayout