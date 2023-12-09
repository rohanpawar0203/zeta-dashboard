import React, { Fragment } from 'react';
import { H3, H4, H6, P, UL } from '../../../AbstractElements';

const FormHeader = (props) => {
    const { selected = '' } = props;
    return (
        <Fragment>
            <div>
                <H3 attrH3={{className: 'mb-1'}}>{'Sign In'}</H3>
                <H6 attrH6={{className: 'mb-4 mt-1', style: {fontSize: '13px'}}}><u>{'Please select login type using tabs provided'}</u></H6>
            </div>
        </Fragment>
    );
};
export default FormHeader;