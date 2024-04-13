import {Form, Formik} from "formik";
import * as yup from 'yup'
import TextInput from "../text-input";
import FormButton from "../form-button/index.jsx";
import {Link} from "react-router-dom";

import styles from './styles.module.sass'
import cn from "classnames";


const values = [
    {name: 'name', label: 'Имя'},
    {name: 'secondName', label: 'Фамилия'},
    {name: 'email', label: 'Электронная почта'},
    {name: 'password', label: 'Пароль'},
    {name: 'confirmPassword', label: 'Повторно введите пароль'},
    {name: 'childEmail', label: 'Электронная почта вашего ребенка'},
]

const initialValues = {}
values.forEach(value => initialValues[value.name] = '')

const RegisterParentForm = () => {

    const onSubmit = ({name, secondName, email, password, childEmail}) => {

    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className={'d-flex flex-column w-100'}>
                {
                    values.map(value => (
                        <div key={value.name}
                        className={'mt-2'}>
                            <TextInput
                                hidden={true}
                                placeholder={value.label}
                                name={value.name}
                            />
                        </div>
                    ))
                }

                <FormButton />

                <div className={cn(
                    styles.account,
                    'text-center mt-2'
                )}>
                    Уже есть аккаунт?
                    <Link to={'/auth/login'} className={'ms-1'}>
                        Войдите!
                    </Link>
                </div>
            </Form>
        </Formik>
    )
}

export default RegisterParentForm