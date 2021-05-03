const Card = () => {
    return (
        <div className={'card'}>
            <div className={'card-logo'}>
                <img src="" alt=""/>
            </div>
            <div className={'card-items'}>
                <div>
                    <div className={'card-name'}>
                        Name product
                    </div>
                    <div className={'card-description'}>
                        description product
                    </div>
                    <div>
                        <button className={'button'}>
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card