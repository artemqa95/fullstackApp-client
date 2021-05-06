import {SERVER_URL} from "../../config/config";
import {connect} from "react-redux";
import {deleteCard, setEditItem} from "../../redux/actions/cards";
import ProductCreate from "../ProductForm/ProductForm";

const ProductEditCard = (props) => {
    const deleteHandler = () => {
        props.deleteCard({
            id: props.id,
            image: props.image
        })
    }
    const editHandler = () => {
        props.setEditItem(props.id)
    }
    let template = (
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
                    <span className={'editform-card-edit'} onClick={editHandler}>Edit</span>
                    <span className={'editform-card-delete'} onClick={deleteHandler}>Delete</span>
                </div>
            </div>
        </div>
    )
    if (props.editItemId === props.id) template = <ProductCreate isEditForm={true} cardId={props.id}/>
    return template
};

function mapStateToProps(state) {
    return {
        editItemId: state.cards.editItemId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteCard: data => dispatch(deleteCard(data)),
        setEditItem: id => dispatch(setEditItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditCard);