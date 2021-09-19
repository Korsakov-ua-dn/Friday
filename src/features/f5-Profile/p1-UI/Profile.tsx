import React from "react";
import classes from './Profile.module.css'
import Button from "../../../common/c2-Button/Button";

export const Profile: React.FC = () => {


    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.avatar}>
                    <div className={classes.description}>
                        <div className={classes.ava}>
                            <img/>
                        </div>
                        <span>Petr Ivanov</span>
                        <span>Front-end developer</span>
                        <Button>LOG OUT</Button>
                    </div>
                    <div className={classes.numbers}>

                    </div>
                </div>
                    <div className={classes.cards}>
                        <div className={classes.input}>
                            <h2>Packs list</h2>
                            <input placeholder='Search...'/>
                        </div>
                        <div className={classes.list}>

                        </div>
                </div>
            </div>
        </>
    )
}