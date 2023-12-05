import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import { H5, P, UL } from '../../../AbstractElements';
import SocialAuth from './SocialAuth';

const SignInWith = () => {
    return (
        <Fragment>
            <P attrPara={{className:'d-flex gap-1 align-items-center'}}>Don't have account ?
                <Link className='ms-2' to={`${process.env.PUBLIC_URL}/signup`}>
                    <ul>Create New One</ul>
                </Link>
            </P>
        </Fragment>
    );
};
export default SignInWith;