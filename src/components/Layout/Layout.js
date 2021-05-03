import FooterMenu from "../FooterMenu/FooterMenu";
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from "../../pages/Home";
import About from "../../pages/About";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Products from "../../pages/Products";


const Layout = () => {
    const isAdmin = true;
    return (
        <div className={'layout'}>
            <HeaderMenu isAdmin={isAdmin} userName={'Administration name'}/>
            <Switch>
                <Route path={'/about'} component={About}/>
                {isAdmin?
                    <Route path={'/products'} component={Products}/>
                :
                    <Route path={'/products'} component={Home}/> }
                <Route path={'/login'} component={Login}/>
                <Route path={'/registration'} component={Registration}/>
                <Route path={'/'} exact component={Home}/>
                <Redirect to={'/'}/>
            </Switch>
            <FooterMenu/>
        </div>
    )
}

export default Layout