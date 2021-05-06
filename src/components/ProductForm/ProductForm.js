import {useState} from "react";
import {connect} from "react-redux";
import {editCard, postCardInfo, setEditItem} from "../../redux/actions/cards";
import {SERVER_URL} from "../../config/config";


const ProductForm = props => {

    const [validOptions, setValidOptions] = useState({
        isFileChosen: false,
        formSubmitted: false,
        message: null,
        isTouched: false
    })

    const [inputValues, setInputValues] = useState({
        nameValue: '',
        descriptionValue: '',
        priceValue: '',
    })

    const choseFileHandler = (event) => {
        if (event.target.files.length > 0) setValidOptions({
            ...validOptions,
            isFileChosen: true,
            formSubmitted: false,
            isTouched: true
        })
    }

    const changeInputHandler = (event, stateOption) => {
        setValidOptions({
            ...validOptions,
            message: null,
            formSubmitted: false,
            isTouched: true
        })
        setInputValues({
            ...inputValues,
            [stateOption]: event.target.value.trim()
        })
    }

    const resetForm = (form) => {
        form.reset();
        setValidOptions({
            ...validOptions,
            isFileChosen: false,
            formSubmitted: true,
            message: 'Form has been submitted'
        })
        setInputValues({
            nameValue: '',
            priceValue: '',
            descriptionValue: ''
        })
    }

    const itemIsValid = (value, option, minCount, setValidState) => {
        if (value.length < minCount) {
            setValidState({
                ...validOptions,
                message: `${option} cannot be less than ${minCount} letters`,
                formSubmitted: false
            })
            return false
        }
        return true
    }

    const submitHandler = event => {
        event.preventDefault();

        if (!props.isEditForm && !validOptions.isFileChosen) {
            setValidOptions({
                ...validOptions,
                message: `Need to download image`,
                formSubmitted: false
            })
            return
        }

        const nameIsValid = itemIsValid(inputValues.nameValue, 'Name', 1, setValidOptions)
        const descriptionIsValid = itemIsValid(inputValues.descriptionValue, 'Description', 1, setValidOptions)
        const priceIsValid = itemIsValid(inputValues.priceValue, 'Price', 1, setValidOptions)

        if (nameIsValid && descriptionIsValid && priceIsValid) {
            const data = new FormData(event.target)
            if (props.isEditForm) {
                const formShouldBeSubmitted = !compareValuesWithOrigin()
                if (formShouldBeSubmitted) props.editCard(data)
            } else {
                props.postCardInfo(data)
            }
            props.setEditItem(null)
            resetForm(event.target)
        }
    }

    const setEditValuesToInputs = () => {
        const {name, description, price} = props.cardsInfo.find(card => card.id === props.cardId)
        setValidOptions({
            ...validOptions,
            isTouched: true
        })
        setInputValues({
            nameValue: name,
            priceValue: price,
            descriptionValue: description,
        })
    }
    const compareValuesWithOrigin = () => {
        const {name, description, price} = props.cardsInfo.find(card => card.id === props.cardId)
        return inputValues.nameValue === name &&
            inputValues.descriptionValue === description &&
            inputValues.priceValue === price &&
            !validOptions.isFileChosen
    }


    const messageClasses = ['creationform-message']
    if (validOptions.formSubmitted) messageClasses.push('success')
    else messageClasses.push('error')
    if (props.isEditForm && !validOptions.isTouched) setEditValuesToInputs()

    return (
        <form className={'content-admin-creationform'}
              method={'POST'}
              action={`${SERVER_URL}/addcard`}
              encType={"multipart/form-data"}
              style={props.isEditForm ? {marginLeft: 0} : {}}
              onSubmit={submitHandler}>
            <div>
                <label htmlFor="creationform-productName">Name product</label>
                <input name={'name'}
                       onChange={event => changeInputHandler(event, 'nameValue')}
                       type={"text"}
                       id={'creationform-productName'}
                       maxLength={'30'}
                       value={inputValues.nameValue}/>
            </div>
            <div>
                <label htmlFor="creationform-description">Description</label>
                <input name={'description'}
                       onChange={event => changeInputHandler(event, 'descriptionValue')}
                       type={"text"}
                       id={'creationform-description'}
                       maxLength={'100'}
                       value={inputValues.descriptionValue}/>
            </div>
            <div className={'creationform-footer'}>
                <div className={'creationform-footer-input'}>
                    <label htmlFor="creationform-price">Price</label>
                    <input name={'price'}
                           onChange={event => changeInputHandler(event, 'priceValue')}
                           type={"text"}
                           id={'creationform-price'}
                           maxLength={'30'}
                           value={inputValues.priceValue}/>
                </div>
                <div className={'creationform-file'}>
                    <div>Add image:</div>
                    <label
                        htmlFor="creationform-file">{validOptions.isFileChosen ? 'File added' : 'Add file'}</label>
                    <input name={'image'}
                           onChange={choseFileHandler}
                           type={"file"}
                           id={'creationform-file'}
                           accept={'image/jpeg,image/png'}/>
                    {props.isEditForm ?
                        <input type="text" name={'id'} value={props.cardId} id={'creationform-id'}
                               readOnly={true}/> : null}
                </div>
                <div>
                    <button className={'button'}
                            type={'submit'}>{props.isEditForm ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</button>
                </div>
            </div>
            <div className={messageClasses.join(' ')}>{validOptions.message}</div>
        </form>
    )
}

function mapStateToProps(state) {
    return {
        cardsInfo: state.cards.cardsInfo,
        editItemId: state.cards.editItemId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postCardInfo: data => dispatch(postCardInfo(data)),
        editCard: data => dispatch(editCard(data)),
        setEditItem: id => dispatch(setEditItem(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)