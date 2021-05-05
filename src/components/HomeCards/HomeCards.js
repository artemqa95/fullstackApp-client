import Card from "./Card";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getCardsInfo} from "../../redux/actions/cards";
import {MAX_CARDS_NUMBER as maxCardsCount} from "../../config/config";

const HomeCards = props => {
    useEffect(() => {
        props.getCardsInfo()
        console.log(props.cardsInfo)
        // eslint-disable-next-line
    }, [])
    let cards = null
    if (props.cardsInfo) {
        cards = [...props.cardsInfo]
        cards.slice(maxCardsCount)
        cards = cards.map((card, index) => {
            return <Card
                name={card.name}
                description={card.description}
                image={card.picture}
                key={index}/>
        })
    }
    return (
        <section className={'content'}>
            <div className={'container'}>
                <h1>OUR PRODUCTS</h1>
                <div className={'content-cards'}>
                    {cards}
                </div>
            </div>
        </section>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeCards)