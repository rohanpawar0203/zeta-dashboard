import React, { Fragment } from 'react'
import { Card, CardBody, Col, Container, Form, Label, Row } from 'reactstrap';
import { Btn, H4 } from '../../AbstractElements';
import ScrollBar from "react-perfect-scrollbar";

const Customization = () => {
  return (
    <Fragment className="h-100">
    <Container className="h-100" fluid={true}>
      {/* <Row> */}
      <Col sm="12 h-100">
        <Card className="shadow-none h-100">
          {/* <CardHeader className="p-0 m-0 mt-2">
            <H5 attrH5={{ className: "my-0 mt-2" }}>{"Customize Bot"}</H5>
          </CardHeader> */}
          <CardBody className="p-0 m-0 pt-2 h-100">
            <Fragment className="h-100"> 
              <Form
                className="needs-validation "
                noValidate="" style={{height: '100%'}}>
                <ScrollBar>
                <H4>Chat Button Settings</H4>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Background Color"}</Label>
                    <input
                      className="form-control"
                      name="backgroundColor"
                      type="text"
                      placeholder="background color..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Introduction text"}
                    </Label>
                    <input
                      className="form-control"
                      name="ctaText"
                      type="text"
                      placeholder="Introduction text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Border Radius"}
                    </Label>
                    <input
                      className="form-control"
                      name="borderRadius"
                      type="text"
                      placeholder="Border Radius..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Left-side Spacing"}</Label>
                    <input
                      className="form-control"
                      name="marginLeft"
                      type="text"
                      placeholder="Left-side spacing..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Right-side Spacing"}
                    </Label>
                    <input
                      className="form-control"
                      name="marginRight"
                      type="text"
                      placeholder="Right-side spacing..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Bottom-side Spacing"}
                    </Label>
                    <input
                      className="form-control"
                      name="marginBottom"
                      type="text"
                      placeholder="Bottom-side spacing..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Icon Presence"}</Label>
                    <input
                      className="form-control"
                      name="ctaIconWATI"
                      type="text"
                      placeholder="Bot Name"
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                
                <H4>Brand Settings</H4>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Name"}</Label>
                    <input
                      className="form-control"
                      name="brandName"
                      type="text"
                      placeholder="Name..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Sub Title"}
                    </Label>
                    <input
                      className="form-control"
                      name="brandSubTitle"
                      type="text"
                      placeholder="Sub title..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Image"}
                    </Label>
                    <input
                      className="form-control"
                      name="brandImg"
                      type="file"
                      placeholder="Image"
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Welcome Text"}</Label>
                    <input
                      className="form-control"
                      name="welcomeText"
                      type="text"
                      placeholder="Welcome text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Message Text"}
                    </Label>
                    <input
                      className="form-control"
                      name="companyName"
                      type="text"
                      placeholder="Message text..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Background Color"}
                    </Label>
                    <input
                      className="form-control"
                      name="backgroundColor"
                      type="text"
                      placeholder="Background color..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom01">{"Text Info"}</Label>
                    <input
                      className="form-control"
                      name="ctaText"
                      type="text"
                      placeholder="Text info..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                  <Col md="4 mb-3" xl='3' sm='6'>
                    <Label htmlFor="validationCustom02">
                      {"Autoshow"}
                    </Label>
                    <input
                      className="form-control"
                      name="autoShow"
                      type="text"
                      placeholder="Autoshow..."
                      required={true}
                    />
                    <span></span>
                    <div className="valid-feedback">{"Looks good!"}</div>
                  </Col>
                </Row>
                <Btn attrBtn={{ color: "primary" }}>{"Submit"}</Btn>
                </ScrollBar>
              </Form>
            </Fragment>
          </CardBody>
        </Card>
      </Col>
      {/* </Row> */}
    </Container>
  </Fragment>
  )
}

export default Customization