export const Input = ({ id, require, label, type, placeholder, title, reactHookForm, className, errors, ...rest }) => {
    return (
        <div className='flex-1'>
            <label htmlFor={id} className='text-gray-300'>{label}</label> {require && <span className='text-rose-500 text-xl'>*</span>}
            <input
                {...rest}
                id={id}
                {...reactHookForm}
                type={type}
                name={title}
                placeholder={placeholder}
                className={className} />
            {errors && <p className="text-rose-500">{errors.message}</p>}
        </div>
    )
}