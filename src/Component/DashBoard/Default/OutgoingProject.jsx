import React, { Fragment } from 'react';
import { MoreHorizontal } from 'react-feather';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Media, Table } from 'reactstrap';
import { H5, H6, Image, LI, UL } from '../../../AbstractElements';
import { Done } from '../../../Constant';
import { OutGoing } from '../../../Data/DashDefault';

const OutgoingProject = ({ val }) => {
  return (
    <Fragment>
      <Col xl="4" className={`dash-35 ${val ? 'col-md-6 dash-xl-50 box-col-6' : 'col-md-12 dash-xl-50 dash-lg-100 box-col-12'}`}>
        <Card className='ongoing-project'>
          <CardHeader className="card-no-border">
            <Media className="media-dashboard">
              <Media body >
                <H5 attrH5={{ className: 'mb-0' }}>{val ? 'Ongoing Projects' : 'Recent Orders'}</H5>
              </Media>
              <div className="icon-box onhover-dropdown"><MoreHorizontal />
                <div className="icon-box-show onhover-show-div">
                  <UL>
                    <LI><a href='#javascript'>{Done}</a></LI>
                    <LI><a href='#javascript'> Pending</a></LI>
                    <LI><a href='#javascript'>Rejected</a></LI>
                    <LI><a href='#javascript'>In Progress</a></LI>
                  </UL>
                </div>
              </div>
            </Media>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="table-responsive">
              <Table className="table-bordernone">
                <thead>
                  <tr>
                    <th><span>{val ? 'Name' : 'Product Name'}</span></th>
                    <th><span>{val ? 'Date' : 'Customer'}</span></th>
                    <th><span>{val ? 'Project' : 'Price'}</span></th>
                    {!val && <th><span>Quantity</span></th>}
                    <th><span>Status</span></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    OutGoing.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <Media>
                              <div className="square-box me-2">
                                <Image attrImage={{ className: 'img-fluid b-r-5', src: `${val ? item.img : item.img2}`, alt: '' }} />
                              </div>
                              <Media body className="ps-2">
                                <div className="avatar-details">
                                  <Link to={`${process.env.PUBLIC_URL}/ecommerce/productlist`}>
                                    <H6>{val ? item.name : item.name1}</H6>
                                  </Link>
                                  <span>{val ? item.team : item.title1}</span></div>
                              </Media>
                            </Media>
                          </td>
                          <td className="img-content-box">
                            <H6>{item.date}</H6><span>{item.time}</span>
                          </td>
                          <td>
                            {val ?
                              <><H6>{item.title}</H6><span>{item.prize}</span> </> :
                              <><H6>{item.prize}</H6><span>NOK</span></>
                            }
                          </td>
                          {!val &&
                            <td>
                              <H6>{item.qty}</H6>
                            </td>
                          }
                          <td>
                            <div className={item.class}>{item.status}</div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment >
  );
};
export default OutgoingProject;