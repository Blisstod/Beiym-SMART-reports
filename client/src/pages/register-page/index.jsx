
import cn from 'classnames'
import RegisterRoleForm from "../../components/register-role-form/index.jsx";

const RegisterPage = () => {
    return (
        <>
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
                <RegisterRoleForm/>
            </div>
        </>
    )
}

export default RegisterPage