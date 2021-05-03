import {NavLink} from "react-router-dom";

const MenuList = () => {
    const links = [
        {to: '/', label: 'Home'},
        {to: '/products', label: 'Products'},
        {to: '/about', label: 'About'}
    ]
    const renderLinks = (links) => {
        return links.map((link, index) => {
            return (
                <span className={'menu'} key={index}>
                <NavLink exact to={link.to}>
                    {link.label}
                </NavLink>
            </span>
            )
        })
    }

    return (
        <div className={'menu'}>
            {renderLinks(links)}
        </div>
    )
}
export default MenuList