import RegisterStudentForm from "../../components/register-student-form/index.jsx";
import cn from "classnames";

const RegisterStudentPage = () => {
    return (
        <div className={cn(
            'mt-3',
            'offset-2 col-8',
            'offset-sm-3 col-sm-6',
            'offset-lg-4 col-lg-4',
            // 'offset-xxl-5 col-xxl-2',
        )}>
            <RegisterStudentForm/>
        </div>
    )
}

export default RegisterStudentPage