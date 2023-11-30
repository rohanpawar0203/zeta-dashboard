
import React, {useState, Fragment, useRef} from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { Btn, H5, UL } from '../../../AbstractElements';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EmailAddress, LoginWithJWT, Password, SignUp } from '../../../Constant';
import { handleResponse } from '../../../Services/Fack.Backend';
import FormHeader from './FormHeader';
import SignupWith from './SignupWith';
import appStore from '../../../Component/Live Chats/Client/AppStore';

const SignupTab = ({selected}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        companyName: '',
        contact : '',
        websiteLink : '',
        planId : '1234',
        store : '',
        productList : '',
    })  
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const isErrors = useRef(false);
    const history = useNavigate();
    const {setToken} = appStore();
    const handleFormChange = (e) => {
        const {value, name} = e.target;
        setUserData((pre) => ({
            ...pre, 
            [name] : value
        }));
    };
    const userSignup = async() => {
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: (JSON.stringify({...userData})),
        };
        try{
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, requestOptions);
            const resBody = await res.json();
            const {token, user} = resBody;
            if(`${res.status}` === '200'){
                setLoading(false);
                setUserData((pre) => {
                    for(let key in pre){
                    pre[key] = '';
                    }
                return pre;
                })
                if(token && user){
                    setToken(resBody.token);
                    setUserData(resBody.user);
                    localStorage.setItem('token', resBody.token);
                    localStorage.setItem('currentUser', JSON.stringify(resBody.user));
                    history(`${process.env.PUBLIC_URL}/store`);
                }
                toast.success('User signedup successfully')
            }else{
                toast.error(resBody?.msg)
            }

        }
            catch(err){
                toast.error(err.message)
            }
            setLoading(false);
        }
    const formValidate = () => {
            isErrors.current = false;
            setErrors({})
            let errorsObj = {};
            if (!userData?.email) {
              errorsObj = { email: "Email ID is required!" };
            }
            else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData?.email)) {
              errorsObj = {email: "Invalid Email ID!" };
            }
            if (!userData?.password) {
              errorsObj = { ...errorsObj, password: "Password is required!" };
            }
            if (!userData?.companyName) {
              errorsObj = { ...errorsObj, companyName: "Company Name is required!" };
            }
            if (!userData?.contact) {
              errorsObj = { ...errorsObj, contact: "Contact Number is required!" };
            }
            else if (!/^(0|91)?[6-9][0-9]{9}$/.test(userData?.contact)) {
                errorsObj = {...errorsObj, contact: "Invalid Contact Number!" };
              }
            if (!userData?.websiteLink) {
              errorsObj = { ...errorsObj, websiteLink: "Company Website is required!" };
            }
            else if (!/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(userData?.websiteLink)) {
              errorsObj = { ...errorsObj, websiteLink: "Invalid website link!" };
            }
            if(Object.values(errorsObj).length > 0){
                isErrors.current = Object.values(errorsObj).length > 0;
                setErrors(errorsObj);
            }
        }
  return (
    <Fragment>
            <Form className="theme-form login-form">
                <FormHeader selected={selected} />
                <FormGroup className='m-0 first-form-group'>
                    <Label className='p-0 mb-1 mt-2'>Company Name</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="companyName" className="form-control" type='text' onChange={e => handleFormChange(e)} placeholder="Company Name" required="" />
                    </InputGroup>
                    {errors.companyName && <Label className="fw-bolder mt-2 errTxt">{errors?.companyName}</Label>}
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0 mb-1 mt-2'>{EmailAddress}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input className="form-control" type="email" name="email" required="" onChange={e => handleFormChange(e)} placeholder="Email Address" />
                    </InputGroup>
                    {errors.email && <Label className="fw-bolder mt-2 errTxt">{errors?.email}</Label>}
                </FormGroup>
                <FormGroup className='m-0'> 
                    <Label className='p-0 mb-1 mt-2'>{Password}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-lock'></i></InputGroupText>
                        <Input className="form-control" name="password" type={togglePassword ? 'text' : 'password'} onChange={e => handleFormChange(e)} placeholder="Password" required="" />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? '' : 'show'}></span></div>
                    </InputGroup>
                    {errors.password && <Label className="fw-bolder mt-2 errTxt">{errors?.password}</Label>}
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0 mb-1 mt-2'>Contact</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="contact" className="form-control" type="text" onChange={e => handleFormChange(e)} placeholder="Contact Number" required="" />
                    </InputGroup>
                    {errors.contact && <Label className="fw-bolder mt-2 errTxt">{errors?.contact}</Label>}
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0 mb-1 mt-2'>Website Link</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="websiteLink" className="form-control" type="url" onChange={e => handleFormChange(e)} placeholder="Website URL" required="" />
                    </InputGroup>
                    {errors.websiteLink && <Label className="fw-bolder mt-2 errTxt">{errors?.websiteLink}</Label>}
                </FormGroup>
                {/* <FormPassword /> */}
                <FormGroup className='mt-3'>
                    {selected === 'firebase' ?
                        <Btn attrBtn={{ color: 'primary', className: 'btn-block', disabled: loading ? loading : loading, onClick: (e) => {
                            formValidate();
                            if(!isErrors.current){
                                userSignup();
                            }
                        }}} >{loading ? 'LOADING...' : SignUp}</Btn>
                        :
                        <Btn attrBtn={{ color: 'primary', className: 'btn-block', disabled: loading ? loading : loading, onClick: (e) => {}}} >{loading ? 'LOADING...' : LoginWithJWT}</Btn>
                    }
                </FormGroup>
                <SignupWith />
            </Form>
        </Fragment>
  );
};

export default SignupTab;