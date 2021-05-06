import FooterMenu from "../FooterMenu/FooterMenu";
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import ProductsPage from "../../pages/ProductsPage";
import {connect} from "react-redux";
import {autoLogin} from "../../redux/actions/auth";
import Logout from "../Logout/Logout";
import {useEffect} from "react";
import HomeCards from "../HomeCards/HomeCards";


const Layout = props => {

    useEffect(() => {
     props.autoLogin()
    })
    return (
        <div className={'layout'}>
            <HeaderMenu username={props.username} isLogin={!!props.token}/>
            <Switch>
                <Route path={'/products'} render={props => <ProductsPage username={props.token && props.username}/>}/>
                <Route path={'/about'} component={AboutPage}/>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/registration'} component={RegistrationPage}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path={'/'} exact component={HomePage}/>
                <Redirect to={'/'}/>
            </Switch>
            <FooterMenu/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)