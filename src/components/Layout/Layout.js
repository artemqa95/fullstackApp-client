import FooterMenu from "../FooterMenu/FooterMenu";
import {Route, Switch, Redirect} from 'react-router-dom'
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import ProductsPage from "../../pages/ProductsPage";

const Layout = () => {
    return (
        <div className={'layout'}>
            <HeaderMenu/>
            <Switch>
                <Route path={'/products'} component={ProductsPage}/>
                <Route path={'/about'} component={AboutPage}/>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/registration'} component={RegistrationPage}/>
                <Route path={'/'} exact component={HomePage}/>
                <Redirect to={'/'}/>
            </Switch>
            <FooterMenu/>
        </div>
    )
}

export default Layout