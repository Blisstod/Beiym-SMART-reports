import cn from "classnames";
import RegisterTeacherForm from "../../components/register-teacher-form/index.jsx";

const RegisterTeacherPage = () => {
    return (
        <div className={cn(
            'mt-3',
            'offset-2 col-8',
            'offset-sm-3 col-sm-6',
            'offset-lg-4 col-lg-4',
            // 'offset-xxl-5 col-xxl-2',
        )}>
            <RegisterTeacherForm/>
        </div>
    )
}

export default RegisterTeacherPage