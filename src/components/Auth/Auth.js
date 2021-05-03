import {NavLink} from "react-router-dom";

const Auth = ({type}) => {
    return (
        <div className={'auth'}>
            <div className={'container'}>
                <h1>{type.toUpperCase()}</h1>
                <div><input type="text" placeholder={'Your name...'}/></div>
                {type === 'registration' ?
                    <div><input type="email" placeholder={'Your email...'}/></div>
                    : null}
                <div><input type="password" placeholder={'Your password'}/></div>
                <div>
                    <button className={'button'}>SUBMIT</button>
                    {type === 'registration' ?
                        <button className={'button'}>
                            <NavLink to={'/login'}>LOGIN</NavLink>
                        </button>
                        :
                        <button className={'button'}>
                            <NavLink to={'/registration'}>REGISTRATION</NavLink>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth