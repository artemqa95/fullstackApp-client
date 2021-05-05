import {SERVER_URL} from "../../config/config";

const Card = ({name, description, image}) => {
    return (
        <div className={'card'}>
            <div className={'card-logo'}>
                <img src={`${SERVER_URL}/images/${image}`} alt="card-logo"/>
            </div>
            <div className={'card-items'}>
                <div>
                    <div className={'card-name'}>
                        {name}
                    </div>
                    <div className={'card-description'}>
                        {description}
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