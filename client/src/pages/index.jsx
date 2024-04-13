import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

import {RootLayout, AuthLayout, RegisterLayout} from './layouts'
const MainPage = lazy(() => import('./main-page'))
const LoginPage = lazy(() => import('./login-page'))
const RegisterPage = lazy(() => import('./register-page'))
const RegisterTeacherPage = lazy(() => import('./register-teacher-page'))
const RegisterStudentPage = lazy(() => import('./register-student-page'))
const RegisterParentPage = lazy(() => import('./register-parent-page'))


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <MainPage />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterLayout />,
                children: [
                    {
                        path: '',
                        element: <RegisterPage />
                    },
                    {
                        path: 'teacher',
                        element: <RegisterTeacherPage />
                    },
                    {
                        path: 'student',
                        element: <RegisterStudentPage />
                    },
                    {
                        path: 'parent',
                        element: <RegisterParentPage />
                    }
                ]
            }
        ]
    }
])
