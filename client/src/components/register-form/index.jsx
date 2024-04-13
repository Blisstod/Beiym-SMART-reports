import {Formik, Form, Field} from "formik";
import cn from "classnames";

import styles from './style.module.sass'
import {useNavigate} from "react-router-dom";

const roles = [
    {value: 'student', label: 'Ученик'},
    {value: 'parent', label: 'Родитель'},
    {value: 'teacher', label: 'Учитель'},
]

const initialValues = {
    role: ''
}

const RegisterForm = () => {
    const navigate = useNavigate()

    const onSubmit = ({role}) => {
        if (!role) {
            return
        }
        navigate(`/auth/register/${role}`)
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form
                className={cn('d-flex flex-column w-100')}
            >
                {
                    roles.map(role => (
                        <label key={role.value} >
                            <Field
                                type={'radio'}
                                name={'role'}
                                value={role.value}
                            />
                            {role.label}
                        </label>
                    ))
                }

                <button
                    className={cn(
                        styles.button,
                        'mt-3'
                    )}
                    type={'submit'}
                >
                    Далее
                </button>
            </Form>
        </Formik>
    )
}

export default RegisterForm