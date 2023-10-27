import React from 'react';
import { Button } from 'reactstrap';

const Btn = (props) =>{
    const { children = '' } = props;
    return <div>
        <Button  {...props.attrBtn}>{children}</Button>
    </div>;
};

export default Btn;