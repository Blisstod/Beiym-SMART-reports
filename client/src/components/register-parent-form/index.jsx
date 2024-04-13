import * as yup from 'yup'
import RegisterForm from "../register-form/index.jsx";

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
        <RegisterForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            inputs={values}
        />
    )
}

export default RegisterParentForm