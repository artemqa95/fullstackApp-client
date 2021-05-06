import {NavLink} from "react-router-dom";

const Login = () => {
    return (
        <form className={'auth'}>
            <div className={'container'}>
                <h1>LOGIN</h1>
                <div>
                    <input
                        type="text"
                        name={'username'}
                        placeholder={'Your name...'}/>
                </div>

                <div>
                    <input type="password"
                          name={'password'}
                          placeholder={'Your password'}/>
                </div>
                <div className={'auth-buttons'}>
                    <button className={'button'}>SUBMIT</button>
                    <NavLink to={'/registration'}>
                        <button className={'button'} type={'submit'}>REGISTRATION</button>
                    </NavLink>
                </div>
            </div>
        </form>
    )
}

export default Login