import {Outlet, useLocation} from "react-router-dom";
import cn from "classnames";
import styles from "../../register-page/style.module.sass";
import logo from "../../../assets/icons/beyim-logo.svg";

const RegisterLayout = () => {
    const location = useLocation()

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

                {
                    location.pathname === '/auth/register/'?
                        null
                        :
                        <>
                            <h1
                                className={cn(
                                    'h1 text-center',
                                    'mt-5 mb-0'
                                )}
                            >
                                Регистрация
                            </h1>
                            <h2
                                className={cn(
                                    'h5 text-center',
                                    'mt-0'
                                )}
                            >
                                Пожалуйста, введите свое имя, логин и пароль
                            </h2>
                        </>
                }

                <Outlet/>
            </section>
        </>
    )
}

export default RegisterLayout