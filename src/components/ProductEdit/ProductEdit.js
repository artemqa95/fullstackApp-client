import ProductEditCard from "../ProductEditCard/ProductEditCard";
import {connect} from "react-redux";
import {useEffect} from "react";
import {getCardsInfo} from "../../redux/actions/cards";

const ProductEdit = props => {

    useEffect(() => {
        if (!props.cardsInfo) {
            props.getCardsInfo()
        }
        // eslint-disable-next-line
    }, [])

    let cards = null
    if (props.cardsInfo) {
        cards = [...props.cardsInfo]
            .map((card, index) => {
                return <ProductEditCard
                    name={card.name}
                    image={card.picture}
                    id={card.id}
                    key={index}/>
            })
    }

    return (
        <div className={'content-admin-editform'}>
            {cards}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        cardsInfo: state.cards.cardsInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCardsInfo: () => dispatch(getCardsInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);