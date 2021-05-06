import logo from '../../logo/logo.png'
import MenuList from "../MenuList/MenuList";
import {NavLink} from "react-router-dom";

const HeaderMenu = () => {
    return (
        <div className={'header'}>
            <div className={'container'}>
                <div className={'header-logo'}>
                    <img src={logo} alt="logo"/>
                </div>
                {false ?
                    <div className={'header-username'}>userName</div>
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