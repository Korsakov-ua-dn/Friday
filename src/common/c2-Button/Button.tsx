import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.css';

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    green?: boolean
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        red, className, green,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : green ? s.green : s.default} ${s.btn} ${className}`;

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    );
};

export default Button;
