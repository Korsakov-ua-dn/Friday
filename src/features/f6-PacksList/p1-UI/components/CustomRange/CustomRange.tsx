import React, {useState} from 'react';
import s from './CustomRange.module.css';


type SuperDoubleRangePropsType = {
    getMin: (min: number) => void
    getMax: (max: number) => void
}

const CustomRange: React.FC<SuperDoubleRangePropsType> = ({getMin, getMax}) => {

    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(300);

    const [minEnabled, setMinEnabled] = useState<boolean>(false);
    const [maxEnabled, setMaxEnabled] = useState<boolean>(false);

    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'min') {
            if (e.clientX < value2 - 15) {
                minEnabled && setValue1(e.clientX + 10);
            }
        }

        if (e.currentTarget.id === 'max') {
            if ((e.clientX > value1 + 5) && (e.clientX < 290)) {
                maxEnabled && setValue2(e.clientX + 10);
            }
        }
    };

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.id === 'min' && setMinEnabled(true);
        e.currentTarget.id === 'max' && setMaxEnabled(true);
    };

    const mouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.id === 'min' && setMinEnabled(false);
        e.currentTarget.id === 'max' && setMaxEnabled(false);
    };

    getMin(Math.ceil(value1 / 100));
    getMax(Math.ceil(value2 / 10));

    return (
        <>
            <div style={{width: 200}} className={s.slider}>
                <div className={s.min} style={{width: value1 - 100}} data-content={Math.ceil(value1 / 100)}>
                    <div id={'min'} className={s.minDrag} onMouseUp={mouseUpHandler} onMouseMove={mouseMoveHandler}
                         onMouseDown={mouseDownHandler}>
                        <div className={s.text}>{Math.ceil(value1 / 100)}</div>
                    </div>
                </div>

                <div className={s.max} style={{width: value2 - 100}} data-content={Math.ceil(value2 / 10)}>
                    <div id={'max'} onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler}
                         onMouseMove={mouseMoveHandler} className={s.maxDrag}>
                        <div className={s.text}>{Math.ceil(value2 / 10)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomRange;
