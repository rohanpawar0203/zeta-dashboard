import React, { Fragment } from 'react';
import ApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { H4, H6, Image } from '../../../AbstractElements';
import avtar from '../../../assets/images/avatar.jpg';
import { TotalEarning, WeeklyEvent } from '../../../Pages/DashBoard/ChartsData/TotalEvents';

const DailyEarning = () => {
  return (
    <Fragment>
      <Col xl="3" md="6" className="dash-xl-50 box-col-6">
        <Card className='pb-0 o-hidden earning-card'>
          <CardHeader className="earning-back"></CardHeader>
          <CardBody className="p-0">
            <div className="earning-content" style={{ position: 'relative' }}>
              < Image attrImage={{ className: 'img-fluid', src: `${avtar}`, alt: '' }} />
              <Link to={`${process.env.PUBLIC_URL}/blog/blogsingle`} >
                <H4>Today's Earning</H4>
              </Link>
              <span>(Mon 15 - Sun 21)</span>
              <H6>$573.67</H6>
              <ApexChart id="earning-chart" options={TotalEarning.options} series={TotalEarning.series} type='area' height={145} />
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xl="3" md="6" className="dash-xl-50 box-col-6">
        <Card className='weekly-column'>
          <CardBody className="card-body p-0">
            <ApexChart options={WeeklyEvent.options} series={WeeklyEvent.series} id="weekly-chart" type='bar'
              height='230' />
          </CardBody>
        </Card>
      </Col>
    </Fragment >
  );
};
export default DailyEarning;