import MenuList from "../MenuList/MenuList";

const FooterMenu = () => {
    return (
        <>
            <div className={'spacer'}/>
            <div className={'footer'}>
                <div className={'container'}>
                    <MenuList/>
                    <div className={'footer-text'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterMenu