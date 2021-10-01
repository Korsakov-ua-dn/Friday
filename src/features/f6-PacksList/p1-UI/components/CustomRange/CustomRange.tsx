import React, {useEffect, useState} from 'react';
import s from './CustomRange.module.css';


type SuperDoubleRangePropsType = {
    width?: number,
    getMin: (min: number) => void
    getMax: (max: number) => void
}

const CustomRange: React.FC<SuperDoubleRangePropsType> = ({getMin, getMax, width = 100}) => {

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(width - 10);
    const [minPoint, setMinPoint] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);
    const [editMin, setEditMin] = useState<boolean>(false);
    const [maxVal, setMaxVal] = useState<number>(width);
    const [minVal, setMinVal] = useState<number>(0);

    const [minEnabled, setMinEnabled] = useState<boolean>(false);
    const [maxEnabled, setMaxEnabled] = useState<boolean>(false);

    useEffect(()=>{
        getMin(minVal);
        getMax(maxVal);
    },[minVal,maxVal])


    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'min') {
            if ((e.clientX - minPoint) < max && (e.clientX - minPoint > 0)) {
                if (minEnabled) {
                    setMin((e.clientX - 6) - minPoint);
                    setMinVal((e.clientX) - minPoint);
                }
            }
        }
        if (e.currentTarget.id === 'max') {
            if (((e.clientX - minPoint) > min + 5) && ((e.clientX - minPoint) < width)) {
                if (maxEnabled) {
                    setMax((e.clientX - 6) - minPoint);
                    setMaxVal((e.clientX) - minPoint);
                }
            }
        }
    };


    const doubleClickHandler = () => {
        setEdit(true);
    };

    const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.id === 'min' && setMinEnabled(true);
        e.currentTarget.id === 'max' && setMaxEnabled(true);
    };
    const mouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.id === 'min' && setMinEnabled(false);
        e.currentTarget.id === 'max' && setMaxEnabled(false);
    };

    const setValueMin = () => {
        setEditMin(false);
        setMin(minVal);
    };
    const setValueMax = () => {
        setEdit(false);
        setMax(maxVal);
    };


    return (
        <>
            <div className={s.slider} style={{width}} onMouseMove={(event) => {
                setMinPoint(event.currentTarget.offsetLeft);
            }}>
                <div className={s.min} style={{width: min + 5}}>
                    <div id={'min'} className={s.minDrag} style={{left: min}}
                         onMouseMove={mouseMoveHandler}
                         onMouseUp={mouseUpHandler}
                         onMouseDown={mouseDownHandler}>
                        <div onDoubleClick={() => {
                            setEditMin(true);
                        }} className={s.textMin}>  {editMin ?
                            <input type={"number"} value={minVal} onChange={(e) => {

                                if ((+e.currentTarget.value < max - 10) && (+e.currentTarget.value >= 0
                                )) {
                                    setMinVal(+e.currentTarget.value);
                                }
                            }} autoFocus onBlur={setValueMin} style={{width: '40px', border: 'none'}}
                                   maxLength={2}/> : minVal} </div>
                    </div>
                </div>

                <div className={s.max} style={{width: max + 10}}>
                    <div id={'max'} style={{left: max}}
                         onMouseMove={mouseMoveHandler} className={s.maxDrag}
                         onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>


                        <div onDoubleClick={doubleClickHandler} className={s.textMax}>{edit ?
                            <input type={"number"} value={maxVal} onChange={(e) => {
                                if ((+e.currentTarget.value < width) && (+e.currentTarget.value > min + 5
                                )) {
                                    setMaxVal(+e.currentTarget.value);
                                }
                            }} autoFocus onBlur={setValueMax} style={{width: '40px', border: 'none'}}
                                   maxLength={2}/> : maxVal} </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomRange;
