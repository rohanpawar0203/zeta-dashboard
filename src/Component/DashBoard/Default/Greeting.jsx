import React, { Fragment } from 'react';
import { Card, CardBody, Col, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { H1, P, Image } from '../../../AbstractElements';
import dashImg from '../../../assets/images/images.svg';

const Greeting = () => {
  return (
    <Fragment>
      <Col xl="6" md="6" className="dash-xl-50 box-col-12">
        <Card className="profile-greeting">
          <CardBody>
            <Media>
              <Media body>
                <div className="greeting-user">
                  <H1>Hello, Harry Mendez</H1>
                  <P>Welcome back, your dashboard is ready!</P>
                  <Link to={`${process.env.PUBLIC_URL}/blog/blogsingle`} className="btn btn-outline-white_color" >
                    Get Started<i className="icon-arrow-right"></i></Link>
                </div>
              </Media>
            </Media>
            <div className="cartoon-img">
              <Image attrImage={{ className: 'img-fluid', src: `${dashImg}`, alt: '' }} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment >
  );
};
export default Greeting;