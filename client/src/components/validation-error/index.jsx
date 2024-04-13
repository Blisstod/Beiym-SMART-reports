const ValidationError = ({error}) => {
    return (
        <div className={'text-danger form-text'}>{error}</div>
    )
}

export default ValidationError