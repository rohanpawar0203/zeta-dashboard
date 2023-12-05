import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { Btn, H5, Image, Spinner } from "../../../AbstractElements";
import { useForm } from "react-hook-form";
import BotIcons from "./BotIcons";
import IconColors from "./IconColors";
import { CreateNewProject } from "../../../Constant";
import { BotCreate } from "../../../api";
import { toast } from "react-toastify";

const Customize = ({ myBot, setMyBot, setLoading }) => {
   const [botIcons, setbotIcons] = useState(['BiBot', 'BsRobot', 'TbMessageDots', 'BiUser', 'AiOutlineQuestionCircle', 'TfiHeadphoneAlt', 'Ri24HoursLine', 'LuMessagesSquare', 'TfiCommentsSmiley']);
   const botDetilsRef = useRef(myBot);
  //  const [isBotChaged, setisBotChaged] = useState(false);
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

  const updateBotInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${BotCreate}/${myBot?._id}`, {
        method: "PATCH",
        body: JSON.stringify(myBot),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };


  const handleChange = (e) => {
    const {name, value} = e.target;
    setMyBot((pre) => ({
      ...pre,
      [name]: value
    }));
  }
  
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="shadow-none">
              <CardHeader className="p-0 m-0 mt-2">
                <H5 attrH5={{ className: "my-0 mt-2" }}>{"Customize Bot"}</H5>
              </CardHeader>
              <CardBody className="p-0 m-0 pt-2">
                <Fragment>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={updateBotInfo}
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
                          defaultValue={myBot?.botName}
                          onChange={(e) => {handleChange(e)}}
                          placeholder="Bot Name"
                          required={true}
                        />
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom02">{"Company Name"}</Label>
                      <input 
                        className="form-control"
                        name="companyName"
                        type="text"
                        defaultValue={myBot?.companyName}
                        onChange={(e) => {handleChange(e)}}
                        placeholder="Company Name"
                        required={true}
                      />
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row>
                  <Row>
                      <Label htmlFor="validationCustom03">{"Chat bubble icon"}</Label>
                      <div className="w-100 d-flex flex-wrap mb-2">
                      <BotIcons botIcons={botIcons} setMyBot={setMyBot} myBot={myBot}/>
                      </div>
                  </Row>
                  <Row>
                      <Label htmlFor="validationCustom03">{"Accent colour"}</Label>
                      <div className="w-100 d-flex flex-wrap mb-2 ">
                      <IconColors colorOptions={colorOptions} setMyBot={setMyBot} myBot={myBot}/>
                      </div>
                  </Row>
                  <Row>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Subheading"}
                      </Label>
                      <input 
                        className="form-control"
                        name="subheading"
                        type="text"
                        defaultValue={myBot?.subheading}
                        placeholder="Subheading"
                        onChange={(e) => {handleChange(e)}}
                        required={true}
                      />
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Input Box Placeholder"}
                      </Label>
                      <input 
                        className="form-control"
                        name="inputPlaceholder"
                        type="text"
                        defaultValue={myBot?.inputPlaceholder}
                        placeholder="Input Box Placeholder"
                        onChange={(e) => {handleChange(e)}}
                      />
                    </Col>
                  </Row>
                  <Row>
                  <Col md="8 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Welcome Message"}
                      </Label>
                      <input 
                        className="form-control"
                        name="welcomeMessage"
                        type="text"
                        defaultValue={myBot?.welcomeMessage}
                        placeholder="Welcome Message"
                        onChange={(e) => {handleChange(e)}}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                  
                  </Row>
                  <Btn attrBtn={{ color: "primary"}}>{"Submit form"}</Btn>
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
