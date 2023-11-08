import React, { Fragment, useState } from "react";
import {
  CardBody,
  CardHeader,
  Card,
  Col,
  Container,
  Row,
  Label,
  Input,
  FormGroup,
  InputGroupText,
  InputGroup,
  Form,
} from "reactstrap";
import { Btn, H5, Image } from "../../../AbstractElements";
import { useForm } from "react-hook-form";
import BotIcons from "./BotIcons";
import IconColors from "./IconColors";

const Customize = ({ myBot, setMyBot }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
   const [botIcons, setbotIcons] = useState(['BiBot', 'BsRobot', 'TbMessageDots', 'TbMessageDots', 'BiUser', 'AiOutlineQuestionCircle', 'TfiHeadphoneAlt', 'Ri24HoursLine', 'LuMessagesSquare', 'TfiCommentsSmiley'])
   const colorOptions = [
    "#705CF6",
    "#CC7849",
    "#DFB419",
    "#A2CC49",
    "#49CC95",
    "#2FA4C9",
    "#2F6CC9",
    "#BA84E4",
    "#E4849B",
  ];

  const onSubmit = (data) => {
    if (data !== "") {
      alert("You submitted the form and stuff!");
    } else {
      errors.showMessages();
    }
  };
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="shadow-none">
              <CardHeader className="p-0 m-0 mt-2">
                <H5 attrH5={{ className: "my-0 mt-2" }}>{"CustomStyles"}</H5>
              </CardHeader>
              <CardBody className="p-0 m-0 pt-2">
                <Fragment>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Row>
                      <Col md="4 mb-3">
                        <Label htmlFor="validationCustom01">
                          {"Bot Name"}
                        </Label>
                        <input
                          className="form-control"
                          name="botName"
                          type="text"
                          placeholder="Bot Name"
                          {...register("botName", { required: true })}
                        />
                        <span>
                          {errors.botName && "* Bot Name is required"}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                      <Col md="4 mb-3">
                        <Label htmlFor="validationCustom02">{"Company Name"}</Label>
                        <input
                          className="form-control"
                          name="companyName"
                          type="text"
                          placeholder="Company Name"
                          {...register("companyName", { required: true })}
                        />
                        <span>
                          {errors.companyName && "* Company Name is required"}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    </Row>
                    <Row>
                        <Label htmlFor="validationCustom03">{"Chat bubble icon"}</Label>
                        <div className="w-100 d-flex  mb-2">
                        <BotIcons botIcons={botIcons}/>
                        </div>
                    </Row>
                    <Row>
                        <Label htmlFor="validationCustom03">{"Accent colour"}</Label>
                        <div className="w-100 d-flex  mb-2">
                        <IconColors colorOptions={colorOptions}/>
                        </div>
                    </Row>
                    <Row>
                    <Col md="8 mb-3">
                        <Label htmlFor="validationCustom01">
                          {"Subheading"}
                        </Label>
                        <input
                          className="form-control"
                          name="subHeading"
                          type="text"
                          placeholder="Subheading"
                          {...register("subHeading", { required: true })}
                        />
                        <span>
                          {errors.subHeading && "* Subheading is required"}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="8 mb-3">
                        <Label htmlFor="validationCustom01">
                          {"Welcome Message"}
                        </Label>
                        <input
                          className="form-control"
                          name="welcomeMsg"
                          type="text"
                          placeholder="Welcome Message"
                          {...register("welcomeMsg", { required: true })}
                        />
                        <span>
                          {errors.welcomeMsg && "* Welcome Message is required"}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    </Row>
                    <Row>
                    <Col md="8 mb-3">
                        <Label htmlFor="validationCustom01">
                          {"Input Box Placeholder"}
                        </Label>
                        <input
                          className="form-control"
                          name="inputboxPlaceholder"
                          type="text"
                          placeholder="Input Box Placeholder"
                          {...register("inputboxPlaceholder", { required: true })}
                        />
                        <span>
                          {errors.inputboxPlaceholder && "* Input Box Placeholder"}
                        </span>
                        <div className="valid-feedback">{"Looks good!"}</div>
                      </Col>
                    </Row>
                    <Btn attrBtn={{ color: "primary" }}>{"Submit form"}</Btn>
                  </Form>
                </Fragment>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Customize;
