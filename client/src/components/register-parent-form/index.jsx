import {Form, Formik} from "formik";
import * as yup from 'yup'
import TextInput from "../text-input";
import FormButton from "../form-button/index.jsx";
import {Link} from "react-router-dom";

import styles from './styles.module.sass'
import cn from "classnames";

const REQUIRED = 'Это поле обязательно для заполнения'

const values = [
    {name: 'name', label: 'Имя', validation: yup.string().required(REQUIRED)},
    {name: 'secondName', label: 'Фамилия', validation: yup.string().required(REQUIRED)},
    {name: 'email', label: 'Электронная почта', validation: yup.string().required(REQUIRED).email()},
    {name: 'password', label: 'Пароль', validation: yup.string().required(REQUIRED).min(3, 'Пароль слишком короткий')},
    {name: 'confirmPassword', label: 'Повторно введите пароль', validation: yup.string().required(REQUIRED).oneOf([yup.ref('password')], 'Пароли не совпадают')},
    {name: 'childEmail', label: 'Электронная почта вашего ребенка', validation: yup.string().required(REQUIRED)},
]

const initialValues = {}
const validationSchema = {}
values.forEach(value => {
    initialValues[value.name] = ''
    validationSchema[value.name] = value.validation
})


const RegisterParentForm = () => {

    const onSubmit = ({name, secondName, email, password, childEmail}) => {
        // TODO: implement request
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object(validationSchema)}
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
                                type={value.name.includes('assword')? 'password' : 'text'}
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