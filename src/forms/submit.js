export const submitHandler = (event, validOptions, setValidOptions, sendFormHandler) => {
    event.preventDefault()
    if (validOptions.isFormValid) {
        const data = new FormData(event.target)
        sendFormHandler(data)
        const formControls = {...validOptions.formControls}
        Object.keys(validOptions.formControls).forEach(controlName => {
            formControls[controlName].value = '';
            formControls[controlName].valid = false;
        })
        event.target.reset();
        setValidOptions({
            ...validOptions,
            formControls,
            isFormValid: false,
            formSubmitted: true,
            message: ''
        })
    } else {
        const notValidControl = Object.keys(validOptions.formControls).find(controlName => {
            return !validOptions.formControls[controlName].valid
        })
        setValidOptions({
            ...validOptions,
            message: validOptions.formControls[notValidControl].errorMessage
        })
    }
}