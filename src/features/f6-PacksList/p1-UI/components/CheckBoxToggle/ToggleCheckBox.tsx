import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from './ToggleCheckBox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
    checked?: boolean
}

export const ToggleCheckBox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, checked,// в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChange && onChange(e);
        onChangeChecked && onChangeChecked(e.currentTarget.checked);
        // && onChangeChecked(e.currentTarget.checked)
        // сделайте так чтоб работал onChange и onChangeChecked
    };

    const finalInputClassName = `${s.superInput} ${className ? className : ''}`;
    return (
        <label className={s.checkbox}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
            />
            <span className={!checked ? s.checkboxSwitch : s.checkboxSwitchChecked}></span>
            {children && <span className={s.spanClassName}>{children}</span>}
        </label> // благодаря label нажатие на спан передастся в инпут
    );
};

