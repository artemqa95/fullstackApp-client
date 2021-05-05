import {SERVER_URL} from "../../config/config";
import {connect} from "react-redux";
import {deleteCard} from "../../redux/actions/cards";

const ProductEditCard = (props) => {

    const deleteHandler = () => {
        props.deleteCard({
            id:props.id,
            image:props.image
        })
    }

    return (
        <div className={'editform-card'}>
            <div className={'editform-card-icon'}>
                <img
                    src={`${SERVER_URL}/images/${props.image}`}
                    alt={"img"}
                />
            </div>
            <div className={'editform-card-content'}>
                <p>{props.name}</p>
                <div>
                    <span className={'editform-card-edit'}>Edit</span>
                    <span className={'editform-card-delete'} onClick={deleteHandler}>Delete</span>
                </div>
            </div>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        deleteCard: data => dispatch(deleteCard(data))
    }
}

export default connect(null, mapDispatchToProps)(ProductEditCard);