import {NavLink, Route, Switch} from "react-router-dom";
import ProductCreate from "../components/ProductForm/ProductForm";
import ProductEdit from "../components/ProductEdit/ProductEdit";
import HomeCards from "../components/HomeCards/HomeCards";
import {connect} from "react-redux";

const ProductsPage = props => {
    console.log(props)
    return (
        <div className={'content-admin'}>

            {props.username === 'administrator' && props.token?
                <div className={'container'}>
                    <div className={'sidebar'}>
                        <NavLink to={'/products/create'}>NEW PRODUCT</NavLink>
                        <NavLink to={'/products/edit'}>MY PRODUCTS</NavLink>
                    </div>
                    <Switch>
                        <Route path={'/products/create'} component={ProductCreate}/>
                        <Route path={'/products/edit'} component={ProductEdit}/>
                        <Route path={'/products'} render={() => <HomeCards isLimited={false}/>}/>
                    </Switch>
                </div>
                :
                <div className={'container'}>
                    <div className={'sidebar'}/>
                    <Switch>
                        <HomeCards isLimited={false}/>
                    </Switch>
                </div>
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
}


export default connect(mapStateToProps, null)(ProductsPage)