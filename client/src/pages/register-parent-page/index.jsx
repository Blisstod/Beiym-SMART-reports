
import styles from './style.module.sass'
import cn from "classnames";
import RegisterParentForm from "../../components/register-parent-form/index.jsx";
import RegisterRoleForm from "../../components/register-role-form/index.jsx";

const RegisterParentPage = () => {
    return (
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

            <div className={cn(
                'mt-3',
                'offset-2 col-8',
                'offset-sm-3 col-sm-6',
                'offset-lg-4 col-lg-4',
                'offset-xxl-5 col-xxl-2',
            )}>
                <RegisterParentForm/>
            </div>
        </>
    )
}

export default RegisterParentPage