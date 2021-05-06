import {NavLink} from "react-router-dom";
import is from 'is_js'
import {useEffect, useState} from "react";
import {SERVER_URL} from "../../config/config";
import {connect} from "react-redux";
import {changeRegStatus, sendRegistrationForm} from "../../redux/actions/auth";

const Registration = props => {
    const [validOptions, setValidOptions] = useState({
        isFormValid: false,
        message: null,
        formSubmitted: false,
        formControls: {
            username: {
                value: '',
                type: 'text',
                name: 'username',
                placeholder: 'Your name...',
                errorMessage: 'Username must be 4 or more symbols',
                valid: false,
                validation: {
                    minLength: 4,
                    required: true,
                }
            },
            email: {
                value: '',
                type: 'email',
                name: 'email',
                placeholder: 'Your email...',
                errorMessage: 'Email is not correct',
                valid: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                name: 'password',
                placeholder: 'Your password',
                errorMessage: 'Password must be 6 or more symbols',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    })

    useEffect(() => {
        if (validOptions.formSubmitted) {
            if (props.regPreventedInfo) {
                const entries = Object.entries(props.regPreventedInfo)
                setValidOptions({
                    ...validOptions,
                    message: `${entries[0][0]} ${entries[0][1]} is already exists`,
                    formSubmitted: false
                })
            } else {
                setValidOptions({
                    ...validOptions,
                    message: 'Registration is success!',
                    formSubmitted: false
                })
            }
        }
        // eslint-disable-next-line
    }, [props.regPreventedInfo])

    const validateControl = (value, validation) => {
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

    const onChangeHandler = (event, controlName) => {
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

    const renderInputs = () => {
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
                        onChange={event => onChangeHandler(event, controlName)}
                    />
                </div>
            )
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (validOptions.isFormValid) {
            const data = new FormData(event.target)
            props.sendRegistrationForm(data)

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
                formSubmitted: true
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

    const messageClasses = ['creationform-message']
    if (validOptions.message === 'Registration is success!') messageClasses.push('success')
    else messageClasses.push('error')

    return (
        <form className={'auth'}
              method={'POST'}
              action={`${SERVER_URL}/registration`}
              onSubmit={submitHandler}>
            <div className={'container'}>
                <h1>LOGIN</h1>
                {renderInputs()}
                <div className={'auth-buttons'}>
                    <button className={'button'}>SUBMIT</button>
                    <NavLink to={'/login'}>
                        <button type={'submit'} className={'button'}>LOGIN</button>
                    </NavLink>
                </div>
                <div className={messageClasses.join(' ')}>{validOptions.message}</div>
            </div>
        </form>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        sendRegistrationForm: data => dispatch(sendRegistrationForm(data)),
        changeRegStatus: status => dispatch(changeRegStatus(status))
    }
}

function mapStateToProps(state) {
    return {
        regPreventedInfo: state.auth.regPreventedInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)