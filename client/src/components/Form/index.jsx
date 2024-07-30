export const Input = ({ id, require, label, type, placeholder, title, reactHookForm, className, errors, labelStyles, ...rest }) => {
    return (
        <div className='flex-1'>
            <label htmlFor={id} className={labelStyles ? labelStyles : 'text-gray-300'}>{label}</label> 
            {require && <span className='text-rose-500 text-xl'>*</span>}
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

export const Select = ({ label, require, id, options, placeholder, reactHookForm, className, errors }) => {
    return (
        <div className="flex-1">
            <label htmlFor={id} className='text-gray-300'>{label}</label>{require && <span className='text-rose-500 text-xl'>*</span>}
            <select
                id={id}
                name={id}
                className={className}
                placeholder={placeholder}
                {...reactHookForm}>
                <option value="">{placeholder}</option>
                {
                    options.map((option, idx) => (
                        <option key={idx} value={option.value}>{option.name}</option>
                    ))
                }
            </select>
            {errors && <p className="text-rose-500">{errors.message}</p>}
        </div>
    )
}
