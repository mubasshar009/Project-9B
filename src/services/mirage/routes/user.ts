import {Response, Request } from 'miragejs';
import { handleErros } from '../server';
import { User } from '../../../interfaces/user.interface';

import { randomBytes } from 'crypto';


const generateToken = () => randomBytes(8).toString('hex')

export interface AuthResponse  {
    token:string;
    user:User;
}

const login = (schema:any , req:Request):AuthResponse | Response => {
    const {username  , password} = JSON.parse(req.requestBody);
    const user = schema.users.findBy({username});
    if(!user){
        return handleErros(null,'No User with That name Exist');
    }
    if(password !== user.password){
        return handleErros(null,'Password is Incorrect')
    }
    const token = generateToken();
    return {
        user:user.attrs as User,
        token,
    }
}
const signup = (schema:any,req:Request):AuthResponse | Response => {
    const data = JSON.parse(req.requestBody);
    const exUser = schema.users.findBy({username:data.username});

    if(exUser) {
        return handleErros(null, 'A user with that username is Already Exist')
    }
    const user = schema.users.create(data);
    const token = generateToken();
    return {
        user:user.attrs as User,
        token,
    }
}
export default {login,signup}