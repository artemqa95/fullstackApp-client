import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {SERVER_URL} from "../../config/config";
import {connect} from "react-redux";
import {changeRegStatus, sendRegistrationForm} from "../../redux/actions/auth";
import {renderInputs} from "../../forms/validation";
import {submitHandler} from "../../forms/submit";

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


    const messageClasses = ['creationform-message']
    if (validOptions.message === 'Registration is success!') messageClasses.push('success')
    else messageClasses.push('error')

    return (
        <form className={'auth'}
              method={'POST'}
              action={`${SERVER_URL}/registration`}
              onSubmit={event => submitHandler(event, validOptions, setValidOptions, props.sendRegistrationForm)}>
            <div className={'container'}>
                <h1>REGISTRATION</h1>
                {renderInputs(validOptions, setValidOptions)}
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