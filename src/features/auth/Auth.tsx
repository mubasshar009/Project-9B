import React, {FC,useState} from "react"
import { useForm } from "react-hook-form"
import User from '../../interfaces/user.interface';
import * as Yup from 'yup';
import http from "../../services/api";
import { saveToken,setAuthState } from "./authSlice";
import { setUser } from "./userSlice";
import { AuthResponse } from "../../services/mirage/routes/user";
import { useAppDispatch } from "../../store";
import { useDispatch } from "react-redux";

const schema = Yup.object().shape({
    username:Yup.string()
    .required("What ? No UserName")
    .max(16,'UserName Cannot be Longer than 16 Characters'),
    password:Yup.string().required('Without Password None Shall Pass'),
    email:Yup.string().email("Please Provide a valid Email Adress(abc@xy.com)")
})


const Auth = () => {
    const { handleSubmit, register,errors } = useForm<User>({
        validationSchema:schema,
    });
    const [isLogin, setIsLogin ] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const submitForm = (data:User) => {
        const path = isLogin ? '/auth/login' : '/auth/signup';
        http
        .post<User ,AuthResponse>(path,data)
        .then((res) =>{
            if(res) {
                const {user, token} = res;
                dispatch(saveToken(token));
                dispatch(setUser(user));
                dispatch(setAuthState(true))
            }
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }


    return (
        <div className="auth">
            <div className="card">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="inputWrapper">
                        <input ref={register} name="username" placeholder="UserName" 
                        type="text" />
                        {errors && errors.username && (
                            <p className="error">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="inputWrapper">
                        <input 
                        ref={register}
                        name="password"
                        type="password"
                        placeholder="password" />
                        {errors && errors.password.message}
                    </div>
                    {!isLogin && (
                        <div className="inputwrapper">
                            <input type="text" ref={register} name="email"
                            placeholder="Email (Optional)" />
                            {errors && errors.email && (
                                <p className="error">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="inputWrapper">
                        <button type="submit" disabled={loading}>
                            {isLogin ? 'Login':"Create Account"}
                        </button>
                    </div>
                    <p onClick={() => setIsLogin(!isLogin)}
                        style={{cursor:'pointer',opacity:0.7}}
                    >
                        {isLogin ? 'No Account ? Create One' :'Already have an Account?'}
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default Auth
