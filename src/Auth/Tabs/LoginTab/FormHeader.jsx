import React, { Fragment } from 'react';
import { H4, H6, P, UL } from '../../../AbstractElements';

const FormHeader = (props) => {
    const { selected = '' } = props;
    return (
        <Fragment>
            <div>
                <H4>{'Sign In'}</H4>
                <H6 attrH6={{className: 'my-1', style: {fontSize: '13px'}}}>{'Welcome back! Log in to your account.'}</H6>
                <H6 attrH6={{className: 'mb-4 mt-1', style: {fontSize: '13px'}}}><u>{'Please select login type using tabs provided'}</u></H6>
            </div>
        </Fragment>
    );
};
export default FormHeader;