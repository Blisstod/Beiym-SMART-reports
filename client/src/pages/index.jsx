import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

import {RootLayout, AuthLayout, RegisterLayout} from './layouts'
const LoginPage = lazy(() => import('./login-page'))
const RegisterPage = lazy(() => import('./register-page'))
const RegisterTeacherPage = lazy(() => import('./register-teacher-page'))
const RegisterStudentPage = lazy(() => import('./register-student-page'))
const RegisterParentPage = lazy(() => import('./register-parent-page'))
const MainPage = lazy(() => import('./main-page'))
const UserPage = lazy(() => import('./user-page'))


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <MainPage />
            },
            {
                path: 'me',
                element: <UserPage />
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
