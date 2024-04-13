import {Form, Formik} from "formik";
import TextInput from "../text-input/index.jsx";
import FormButton from "../form-button/index.jsx";
import * as yup from 'yup'

const initialValues = {
    email: '',
    password: ''
}

const LoginForm = () => {

    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object({
                email: yup.string().email().required('Это поле обязательно для заполнения'),
                password: yup.string().required('Это поле обязательно для заполнения')
            })}
        >
            <Form className={'d-flex flex-column w-100'}>
                <div className={'mt-2'}>
                    <TextInput
                        hidden={true}
                        placeholder={'Электронная почта'}
                        type={'email'}
                        name={'email'}
                    />
                </div>


                <div className={'mt-2'}>
                    <TextInput
                        hidden={true}
                        placeholder={'Пароль'}
                        type={'password'}
                        name={'password'}
                    />
                </div>

                <FormButton text={'Войти'} />
            </Form>
        </Formik>
    )
}

export default LoginForm