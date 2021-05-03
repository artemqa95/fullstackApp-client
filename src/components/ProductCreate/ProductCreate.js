const ProductCreate = () => {

    return (
        <div className={'content-admin-creationform'}>
            <div>
                <label htmlFor="creationform-productName">Name product</label>
                <input type="text" id={'creationform-productName'}/>
            </div>
            <div>
                <label htmlFor="creationform-description">Description</label>
                <input type="text" id={'creationform-description'}/>
            </div>
            <div className={'creationform-footer'}>
                <div className={'creationform-footer-input'}>
                    <label htmlFor="creationform-price">Price</label>
                    <input type="text" id={'creationform-price'}/>
                </div>
                <div>
                    Add image: <span className={'creationform-footer-img-add'}>Add file</span>
                </div>
                <div>
                    <button className={'button'}>ADD PRODUCT</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate