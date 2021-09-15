import { useState } from 'react'
import Checkbox from './Checkbox'

export const CheckboxPage = () => {

    const [checked, setChecked] = useState<boolean>(false)

    return (
        <Checkbox
            checked={checked}
            onChangeChecked={setChecked}
        >
            children {/*// этот текст попадёт в children*/}
        </Checkbox>
    )
}