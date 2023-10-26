import React, { Fragment } from 'react';
import ChartistGraph from 'react-chartist';
import { Col, Card, CardBody } from 'reactstrap';
import { HolesInData } from '../../../Constant/index';
import CommenHeader from '../Commen';

const HolesInDataClass = ({ chartData }) => {
  return (
    <Fragment>
      <Col xl="6" md="12" sm="12" className='box-col-12' >
        <Card>
          <CommenHeader title={HolesInData} />
          <CardBody>
            <ChartistGraph
              data={chartData.chart11Data}
              options={chartData.chart11Options}
              type={'Line'}
              className="ct-2 flot-chart-container" />
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default HolesInDataClass;