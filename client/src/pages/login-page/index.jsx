

import styles from './style.module.sass'
import cn from "classnames";
import logo from "../../assets/icons/beyim-logo.svg";
import LoginForm from "../../components/login-form/index.jsx";

const LoginPage = () => {
    return (
        <section
            className={cn(
                styles.root,
                'pt-5'
            )}
        >
            <img
                className={cn(styles.logo)}
                src={logo}
                alt={'Beyim logo'}
            />
            <h1
                className={cn(
                    'h1 text-center',
                    'mt-5 mb-0'
                )}
            >
                Вход
            </h1>
            <h2
                className={cn(
                    'h5 text-center',
                    'mt-0'
                )}
            >
                Пожалуйста, введите свой логин и пароль
            </h2>
            <div className={cn(
                'mt-3',
                'offset-2 col-8',
                'offset-sm-3 col-sm-6',
                'offset-lg-4 col-lg-4',
                // 'offset-xxl-5 col-xxl-2',
            )}>
                <LoginForm />
            </div>

        </section>
    )
}

export default LoginPage