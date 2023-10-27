import React, { Fragment, useState, useEffect, useRef} from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { Btn, H5, UL } from '../../../AbstractElements';
import { EmailAddress, LoginWithJWT, Password, SignIn } from '../../../Constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { firebase_app, Jwt_token } from '../../../Config/Config';
import man from '../../../assets/images/dashboard/1.png';
import { handleResponse } from '../../../Services/Fack.Backend';
import FormHeader from './FormHeader';
import FormPassword from './FormPassword';
import SignInWith from './SignInWith';

const LoginTab = ({ selected }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnDisable, setbtnDisable] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false);
    const history = useNavigate();
    const inputRef = useRef();
    const [value, setValue] = useState(
        localStorage.getItem('profileURL') || man
    );
    const [name, setName] = useState(
        localStorage.getItem('Name')
    );

    // const loginAuth = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setValue(man);
    //     setName('Emay Walter');
    //     setEmail('test@gmail.com');
    //     setPassword('test123');
    //     try {
    //         await firebase_app.auth().signInWithEmailAndPassword(email, password).then(function () {
    //             setValue(man);
    //             setName('Emay Walter');
    //             setTimeout(() => {
    //                 history(`${process.env.PUBLIC_URL}/dashboard/default`);
    //             }, 200);
    //         });
    //     } catch (error) {
    //         setTimeout(() => {
    //             toast.error('Oppss.. The password is invalid or the user does not have a password.');
    //         }, 200);
    //     }
    // };
    const userLogin = async(e) => {
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: (JSON.stringify({email, password})),
        };
        try{
            const res = await fetch(`https://ulai.in/backend/auth/login`, requestOptions);
            const resBody = await res.json();
            if(res.status.toString() === '200'){
                toast.success('User Logged In successfully')
                const {user, token} = resBody;
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', user);
                history(`${process.env.PUBLIC_URL}/dashboard/default`);
            }
        }
            catch(err){
                toast.error(err.message)   
            }
            setLoading(false)

    };
    const formValidate = () => {
        if((!email || !password) && !btnDisable){
         setTimeout(() => {setbtnDisable(true)}, 500)
        }
    }
    const btnStatusOnchange  = (element) => {
        if(btnDisable && email && password ){
            setbtnDisable(false);
         }
}
    return (
        <Fragment >
            <Form className="theme-form login-form">
                <FormHeader selected={selected} />
                <FormGroup>
                    <Label>{EmailAddress} <Label className='text-danger fw-bolder'>*</Label></Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input ref={inputRef} className="form-control" type="email" required={true} onChange={e => {
                            setEmail(e.target.value);
                            btnStatusOnchange()
                        }} placeholder="Email Address" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='mb-4'>
                    <Label>{Password} <Label className='text-danger fw-bolder'>*</Label></Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-lock'></i></InputGroupText>
                        <Input className="form-control" type={togglePassword ? 'text' : 'password'} onChange={e => {
                            setPassword(e.target.value);
                            btnStatusOnchange()
                        }} placeholder="Password" required={true} />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? '' : 'show'}></span></div>
                    </InputGroup>
                </FormGroup>
                {/* <FormPassword /> */}
                <FormGroup >
                    {selected === 'firebase' ?  <>
                        {btnDisable ? <Label className={`text-danger fw-bolder hidenTxt ${btnDisable && 'appearedTxt'}`}>Please enter all mandatory credentials in the form</Label> : 
                        <Btn attrBtn={{ color: 'primary', className: `btn-block mb-3 ${(loading || btnDisable) && 'btn-disabled'}`, disabled: loading || btnDisable, onClick: (e) => {
                            userLogin(e);
                        }, onMouseEnter : (e) => formValidate()}} >{loading ? 'LOADING...' : SignIn}</Btn>}
                        </>
                        :
                        <Btn attrBtn={{ color: 'primary', className: 'btn-block mb-3', disabled: loading ? loading : loading, onClick: (e) => {}}} >{loading ? 'LOADING...' : LoginWithJWT}</Btn>
                    }
                </FormGroup>
                <SignInWith />
            </Form>
        </Fragment>
    );
};

export default LoginTab;