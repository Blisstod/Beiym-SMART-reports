import TextInput from "../text-input/index.jsx";
import FormButton from "../form-button/index.jsx";
import * as yup from 'yup'
import cn from "classnames";
import styles from "./style.module.sass";
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import SelectInput from "../select-input/index.jsx";

// eslint-disable-next-line react/prop-types
const RegisterForm = ({initialValues, onSubmit, validationSchema, inputs}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object(validationSchema)}
        >
            <Form className={'d-flex flex-column w-100'}>
                {
                    // eslint-disable-next-line react/prop-types
                    inputs.map(value => {

                        if (value.type === 'select') {
                            return (
                                <div key={value.name}
                                     className={'mt-2'}
                                >
                                    <SelectInput
                                        hidden={true}
                                        placeholder={value.label}
                                        name={value.name}
                                    >
                                        {
                                            value.options.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </SelectInput>
                                </div>
                            )
                        }

                        return (
                            <div key={value.name}
                                 className={'mt-2'}>
                                <TextInput
                                    hidden={true}
                                    placeholder={value.label}
                                    name={value.name}
                                    type={value.name.includes('assword') ? 'password' : 'text'}
                                />
                            </div>
                        )
                    })
                }
                <FormButton text={'Регистрация'} />

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

export default RegisterForm