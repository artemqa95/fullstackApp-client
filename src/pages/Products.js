import {NavLink, Route, Switch} from "react-router-dom";
import ProductCreate from "../components/ProductCreate/ProductCreate";
import ProductEdit from "../components/ProductEdit/ProductEdit";


const Products = props => {
    return (
        <div className={'content-admin'}>
            <div className={'container'}>
                <div className={'sidebar'}>
                    <NavLink to={'/products/create'}>NEW PRODUCT</NavLink>
                    <NavLink to={'/products/edit'}>MY PRODUCTS</NavLink>
                </div>
                <Switch>
                    <Route path={'/products/create'} component={ProductCreate}/>
                    <Route path={'/products/edit'} component={ProductEdit}/>
                </Switch>
            </div>
        </div>
    )
}

export default Products