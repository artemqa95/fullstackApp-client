import {NavLink, Redirect} from "react-router-dom";
import {useState} from "react";
import {renderInputs} from "../../forms/validation";
import {submitHandler} from "../../forms/submit";
import {SERVER_URL} from "../../config/config";
import {connect} from "react-redux";
import {sendLoginForm} from "../../redux/actions/auth";

const Login = props => {
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

    const messageClasses = ['creationform-message']
    if (validOptions.message === 'Registration is success!') messageClasses.push('success')
    else messageClasses.push('error')
    return !props.token ?
        <form className={'auth'}
              method={'POST'}
              action={`${SERVER_URL}/login`}
              onSubmit={event => submitHandler(event, validOptions, setValidOptions, props.sendLoginForm)}>
            <div className={'container'}>
                <h1>LOGIN</h1>
                {renderInputs(validOptions, setValidOptions)}
                <div className={'auth-buttons'}>
                    <button className={'button'}>SUBMIT</button>
                    <NavLink to={'/registration'}>
                        <button className={'button'} type={'submit'}>REGISTRATION</button>
                    </NavLink>
                </div>
                <div className={messageClasses.join(' ')}>{validOptions.message}</div>
            </div>
        </form>
        :
        <Redirect to={'/'}/>

}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginForm: data => dispatch(sendLoginForm(data))
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)