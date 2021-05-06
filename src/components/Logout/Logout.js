import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {useEffect} from "react";
import {logout} from "../../redux/actions/auth";

const Logout = props => {
    useEffect(() => {
        props.logout()
    })
    return (
        <Redirect to={'/'}/>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)