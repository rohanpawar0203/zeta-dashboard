import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Col, FormGroup, Row } from 'reactstrap';
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
            {/* <Row>    */}
             <div className='w-100 h-100 d-flex align-items-end'>
             <Col md='12' className="footer-copyright text-center positi">
              <P attrPara={{ className: 'mb-0' }}>Copyright 2023 © Ulai.in  </P>
            </Col>
             </div>
          {/* </Row>     */}
        </Fragment>
    );
};
export default SignInWith;