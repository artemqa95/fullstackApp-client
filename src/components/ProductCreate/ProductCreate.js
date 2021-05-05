import {useState} from "react";
import {connect} from "react-redux";
import {postCardInfo} from "../../redux/actions/cards";


const ProductCreate = props => {

    const [validOptions, setValidOptions] = useState({
        isFileChosen: false,
        nameValue: '',
        descriptionValue: '',
        priceValue: '',
        formSubmitted: false,
        message: null
    })

    const choseFileHandler = (event) => {
        if (event.target.files.length > 0) setValidOptions({
            ...validOptions,
            isFileChosen: true,
            formSubmitted: false
        })
    }


    const changeInputHandler = (event, stateOption) => {
        setValidOptions({
            ...validOptions,
            [stateOption]: event.target.value.trim(),
            message: null,
            formSubmitted: false
        })
    }

    const isValid = (value, option, maxCount, minCount, isNum) => {
        if (isNum) {
            if (!Number(value)) {
                setValidOptions({
                    ...validOptions,
                    message: `${option} must be a number`,
                    formSubmitted: false
                })
                return false
            }
        } else {
            if (value.length > maxCount) {
                setValidOptions({
                    ...validOptions,
                    message: `${option} must be less than ${maxCount} letters`,
                    formSubmitted: false
                })
                return false
            }
        }
        if (value.length < minCount) {
            setValidOptions({
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
        const nameIsValid = isValid(validOptions.nameValue, 'Name', 30, 1, false)
        const descriptionIsValid = isValid(validOptions.descriptionValue, 'Description', 100, 1, false)
        const priceIsValid = isValid(validOptions.priceValue, 'Price', 30, 1, true)
        if (nameIsValid && descriptionIsValid && priceIsValid) {
            if (validOptions.isFileChosen) {
                const data = new FormData(event.target)
                props.postCardInfo(data)
                event.target.reset()
                setValidOptions({
                    ...validOptions,
                    nameValue: '',
                    priceValue: '',
                    descriptionValue: '',
                    isFileChosen: false,
                    formSubmitted: true,
                    message: 'Form has been submitted'
                })
            } else {
                setValidOptions({
                    ...validOptions,
                    message: `Need to download image`,
                    formSubmitted: false
                })
            }

        }
    }

    const messageClasses = ['creationform-message']
    if (validOptions.formSubmitted) messageClasses.push('success')
    else messageClasses.push('error')
    return (
        <form className={'content-admin-creationform'} method={'POST'} action={'http://localhost:3001/brat'}
              encType={"multipart/form-data"} onSubmit={submitHandler}>
            <div>
                <label htmlFor="creationform-productName">Name product</label>
                <input name={'name'} onChange={event => changeInputHandler(event, 'nameValue')} type="text"
                       id={'creationform-productName'}/>
            </div>
            <div>
                <label htmlFor="creationform-description">Description</label>
                <input name={'description'} onChange={event => changeInputHandler(event, 'descriptionValue')}
                       type="text" id={'creationform-description'}/>
            </div>
            <div className={'creationform-footer'}>
                <div className={'creationform-footer-input'}>
                    <label htmlFor="creationform-price">Price</label>
                    <input name={'price'} onChange={event => changeInputHandler(event, 'priceValue')} type="text"
                           id={'creationform-price'}/>
                </div>
                <div className={'creationform-file'}>
                    <div>Add image:</div>
                    <label htmlFor="creationform-file">{validOptions.isFileChosen ? 'File added' : 'Add file'}</label>
                    <input name={'image'} onChange={choseFileHandler} type="file" id={'creationform-file'}
                           accept={'image/jpeg,image/png'}/>
                </div>
                <div>
                    <button className={'button'} type={'submit'}>ADD PRODUCT</button>
                </div>
            </div>
            <div className={messageClasses.join(' ')}>{validOptions.message}</div>
        </form>
    )
}

function mapStateToProps(state) {
    return {
        cardsInfo: state.cards.cardsInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postCardInfo: data => dispatch(postCardInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate)