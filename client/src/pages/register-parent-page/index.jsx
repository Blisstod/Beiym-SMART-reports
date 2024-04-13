
import cn from "classnames";
import RegisterParentForm from "../../components/register-parent-form";

const RegisterParentPage = () => {
    return (
        <div className={cn(
            'mt-3',
            'offset-2 col-8',
            'offset-sm-3 col-sm-6',
            'offset-lg-4 col-lg-4',
            // 'offset-xxl-5 col-xxl-2',
        )}>
            <RegisterParentForm/>
        </div>
    )
}

export default RegisterParentPage