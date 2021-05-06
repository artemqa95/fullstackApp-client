import logo from '../../logo/logo.png'
import MenuList from "../MenuList/MenuList";
import {NavLink} from "react-router-dom";

const HeaderMenu = ({username, isLogin}) => {
    return (
        <div className={'header'}>
            <div className={'container'}>
                <div className={'header-logo'}>
                    <img src={logo} alt="logo"/>
                </div>
                {isLogin ?
                    <div className={'header-logged'}>
                        <div className={'header-username'}>{username}</div>
                        <div className={'header-login'}>
                            <NavLink to={'/logout'} exact>logout➲</NavLink>
                        </div>
                    </div>
                    :
                    <>
                        <MenuList/>
                        <div className={'header-login'}>
                            <NavLink to={'/login'} exact>login➲</NavLink>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default HeaderMenu