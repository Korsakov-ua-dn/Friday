import Button from './Button'

export const ButtonPage = () => {

    const showAlert = () => {
        alert('button was clicked')
    }

    return (

        <Button
            // red // пропсу с булевым значением не обязательно указывать true
            onClick={showAlert}
        >
            delete {/*// название кнопки попадёт в children*/}
        </Button>

    )
}