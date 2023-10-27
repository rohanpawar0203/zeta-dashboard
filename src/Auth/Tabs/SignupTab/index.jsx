
import React, {useState, Fragment} from 'react';
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { Btn, H5, UL } from '../../../AbstractElements';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EmailAddress, LoginWithJWT, Password, SignUp } from '../../../Constant';
import { handleResponse } from '../../../Services/Fack.Backend';
import FormHeader from './FormHeader';
import SignupWith from './SignupWith';

const SignupTab = ({selected}) => {
    const [userData, setUserData] = useState({
        emai: 'test@gmail.com',
        password: 'test123',
        companyName: 'abc',
        contact : '1234567891',
        websiteLink : 'www.abc.com',
        planId : '001',
        store : '',
        productList : '',
    })
    const [loading, setLoading] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const history = useNavigate();
    const handleFormChange = (e) => {
        const {value, name} = e.target;
        setUserData((pre) => ({
            ...pre, 
            [name] : value
        }));
    };
    const userSignup = async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: (JSON.stringify({...userData})),
        };
        try{
            const res = await fetch(`https://ulai.in/backend/auth/register`, requestOptions);
            const resBody = await res.json();
            if(`${res.status}` === '200'){
                toast.success('User signedup successfully')
                history(`${process.env.PUBLIC_URL}/signin`)
            }
        }
            catch(err){
                toast.error(err.message)
            }
        }
  return (
    <Fragment>
            <Form className="theme-form login-form">
                <FormHeader selected={selected} />
                <FormGroup className='m-0 first-form-group'>
                    <Label className='p-0'>Company Name</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="companyName" className="form-control" type='text' onChange={e => handleFormChange(e)} placeholder="Company Name" required="" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0'>{EmailAddress}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input className="form-control" type="email" name="email" required="" onChange={e => handleFormChange(e)} placeholder="Email Address" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'> 
                    <Label className='p-0'>{Password}</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-lock'></i></InputGroupText>
                        <Input className="form-control" name="password" type={togglePassword ? 'text' : 'password'} onChange={e => handleFormChange(e)} placeholder="Password" required="" />
                        <div className="show-hide" onClick={() => setTogglePassword(!togglePassword)}><span className={togglePassword ? '' : 'show'}></span></div>
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0'>Contact</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="contact" className="form-control" type="text" onChange={e => handleFormChange(e)} placeholder="Contact Number" required="" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0'>Website Link</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="websiteLink" className="form-control" type="url" onChange={e => handleFormChange(e)} placeholder="Website URL" required="" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0'>Plan ID</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-list'></i></InputGroupText>
                        <Input name="planId" className="form-card-checklist" type='text' onChange={e => handleFormChange(e)} placeholder="Plan ID" required="" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='m-0'>
                    <Label className='p-0'>Store</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-email'></i></InputGroupText>
                        <Input name="store" className="form-control" type={togglePassword ? 'text' : 'password'} onChange={e => handleFormChange(e)} placeholder="Store" required="" />
                    </InputGroup>
                </FormGroup>
                <FormGroup className='mb-2'>
                    <Label className='p-0'>Product List</Label>
                    <InputGroup>
                        <InputGroupText><i className='icon-list'></i></InputGroupText>
                        <Input name="productList" className="form-control" type='text' onChange={e => handleFormChange(e)} placeholder="Product List" required="" />
                    </InputGroup>
                </FormGroup>
                {/* <FormPassword /> */}
                <FormGroup className='m-0'>
                    {selected === 'firebase' ?
                        <Btn attrBtn={{ color: 'primary', className: 'btn-block', disabled: loading ? loading : loading, onClick: (e) => {userSignup()}}} >{loading ? 'LOADING...' : SignUp}</Btn>
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