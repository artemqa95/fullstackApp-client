import is from "is_js";

export const validateControl = (value, validation) => {
    if (!validation) return true
    let isValid = true
    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (validation.email) {
        isValid = is.email(value) && isValid
    }
    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
    }
    return isValid
}

export const onChangeHandler = (event, controlName, validOptions, setValidOptions) => {
    const formControls = {...validOptions.formControls}
    const control = {...validOptions.formControls[controlName]}
    control.value = event.target.value.trim()
    control.valid = validateControl(control.value, control.validation)
    formControls[controlName] = control
    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid
    })
    setValidOptions({
        ...validOptions, formControls, isFormValid,
    })
}

export const renderInputs = (validOptions, setValidOptions) => {
    return Object.keys(validOptions.formControls).map((controlName, index) => {
        const control = validOptions.formControls[controlName];
        return (
            <div key={controlName + index}>
                <input
                    maxLength={'30'}
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    name={control.name}
                    placeholder={control.placeholder}
                    onChange={event => onChangeHandler(event, controlName, validOptions, setValidOptions)}
                />
            </div>
        )
    })
}

