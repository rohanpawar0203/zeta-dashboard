import React from 'react';
import { Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu } from 'reactstrap';
import { Btn, H5 } from '../../../../AbstractElements';
import { AnotherLink, DropdownButton, DropdownWithDivider } from '../../../../Constant/index';

const WithDivider = () => {
  return (
    <Col sm="12" xl="6">
      <Card>
        <CardHeader className="pb-0">
          <H5>{DropdownWithDivider}</H5><span>{'Use a class'} <code>{'.dropdown-divider'}</code></span>
        </CardHeader>
        <CardBody>
          <div className="dropdown">
            <Dropdown>
              <Btn attrBtn={{ color: 'primary', className: 'dropbtn' }}  >{DropdownButton} <span><i className="icofont icofont-arrow-down"></i></span></Btn>
              <DropdownMenu className="dropdown-content">
                <DropdownItem href="#">{'Link 1'}</DropdownItem>
                <DropdownItem href="#">{'Link 2'}</DropdownItem>
                <DropdownItem href="#">{'Link 3'}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#">{AnotherLink}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WithDivider;