import s from './Registration.module.css';
import Button from "../components/SuperButton/SuperButton";
import {SuperInput} from '../components/SuperInput/SuperInput';

export const Registration: React.FC = () => {
    return (
        <>
            <div className={s.pageWrapper}>
                <div className={s.pageContainer}>
                    <div className={s.pageHeader}>
                        <p className={s.pageLogo}>
                            <span>SignUp</span> page
                        </p>
                    </div>
                    <div className={s.pageHr}></div>
                    <form>
                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Login: </label>
                            {/*<InputTextPage/>*/}
                            <SuperInput/>
                        </div>

                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Your Password: </label>
                            <SuperInput changeType="password"/>
                            {/*<InputTextPage/>*/}

                        </div>
                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Repeat Password: </label>
                            <SuperInput changeType="password"/>
                            {/*<InputTextPage/>*/}

                        </div>

                        <div className={s.formStyle}>
                            <Button>
                                SignUp
                            </Button>
                            {/*<Button btnPrimary>*/}
                            {/*SignUp*/}
                            {/*</Button>*/}
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};
