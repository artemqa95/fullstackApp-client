import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import ProductCreate from "../components/ProductCreate/ProductCreate";


const Products = props => {
    console.log(props)
    return (
        <div className={'content-admin'}>
            <div className={'container'}>
                <div className={'sidebar'}>
                    <NavLink to={'/products/create'}>NEW PRODUCT</NavLink>
                    <NavLink to={'/products/edit'}>MY PRODUCTS</NavLink>
                </div>
                <Switch>
                    <Route path={'/products/create'} component={ProductCreate}/>
                </Switch>
            </div>
        </div>
    )
}

export default Products