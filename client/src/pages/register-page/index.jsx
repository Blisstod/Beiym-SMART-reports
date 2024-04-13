
import cn from 'classnames'

import logo from '../../assets/icons/beyim-logo.svg'
import styles from './style.module.sass'
import RegisterForm from "../../components/register-form/index.jsx";

const RegisterPage = () => {
    return (
        <section
            className={cn(
                styles.root,
                'pt-5'
            )}
        >
            <img
                className={cn(styles.logo, )}
                src={logo}
                alt={'Beyim logo'}
            />

            <h1
                className={cn(
                    'h1 text-center',
                    'mt-5'
                )}
            >
                Кем вы являетесь?
            </h1>

            <div className={cn(
                'mt-3',
                'offset-3 col-6',
                'offset-sm-4 col-sm-4',
                'offset-lg-5 col-lg-2'
            )}>
                <RegisterForm />
            </div>
        </section>
    )
}

export default RegisterPage