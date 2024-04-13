import * as yup from 'yup'
import RegisterForm from "../register-form/index.jsx";

const REQUIRED = 'Это поле обязательно для заполнения'

const values = [
    {name: 'name', label: 'Имя', validation: yup.string().required(REQUIRED)},
    {name: 'secondName', label: 'Фамилия', validation: yup.string().required(REQUIRED)},
    {name: 'email', label: 'Электронная почта', validation: yup.string().required(REQUIRED).email()},
    {name: 'password', label: 'Пароль', validation: yup.string().required(REQUIRED).min(3, 'Пароль слишком короткий')},
    {name: 'confirmPassword', label: 'Повторно введите пароль', validation: yup.string().required(REQUIRED).oneOf([yup.ref('password')], 'Пароли не совпадают')},
    {name: 'classId', label: 'ID класса', validation: yup.string().required(REQUIRED)},
    {
        name: 'subjects', label: 'Выберите профильные предметы', validation: yup.string(),
        type: 'select',
        options: [
            {value: 'fiz', label: 'физика'},
            {value: 'math', label: 'математика'},
            {value: 'chemistry', label: 'химия'},
        ]
    }
]

const initialValues = {}
const validationSchema = {}
values.forEach(value => {
    initialValues[value.name] = ''
    validationSchema[value.name] = value.validation
})

const RegisterStudentForm = () => {
    const onSubmit = () => {

    }
    return (
        <RegisterForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            inputs={values}
        />
    )
}

export default RegisterStudentForm