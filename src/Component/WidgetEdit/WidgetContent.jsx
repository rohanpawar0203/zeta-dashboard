import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  Col,
  Media,
  Container,
  Row,
  CardHeader,
  Form,
  Label,
} from "reactstrap";
import "../Widget/styles/style.css";
import { Btn, H5, H6 } from "../../AbstractElements";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import EditRepresentative from "./EditRepresentativeModal";
import axios from "axios";
import { toast } from "react-toastify";

const button_styles = [
  require('../../assets/images/whatsapp/btn_1.png'),
  require('../../assets/images/whatsapp/btn_2.png'),
  require('../../assets/images/whatsapp/btn_3.png'),
  require('../../assets/images/whatsapp/btn_4.png'),
  require('../../assets/images/whatsapp/btn_5.png'),
]

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');
const colorsArr = [
  {code: "#CD5C5C", color: 'IndianRed'},
  {code: "#000000", color: 'Black'},
  {code: "#808000", color: 'Olive'},
  {code: "#008000", color: 'Green'},
  {code: "#0000FF", color: 'Blue'},
  {code: "#800080", color: 'Purple'},
]

const Avatar = {
  avatar: {
    src: '<img src="assets/img/person/1.jpg" alt="">' /* Image, Icon or SVG */,
    backgroundColor: "#ffffff" /* Html color code */,
    onlineCircle: true /* Avatar online circle. To remove, (onlineCircle:false) */,
  },
  text: {
    title: "Lorna Hensley" /* Writing is required */,
    description: "Sales Support" /* To remove, (description:false) */,
    online: "I'm Online" /* To remove, (online:false) */,
    offline: "I will be back soon" /* To remove, (offline:false) */,
  },
  link: {
    desktop:
      "https://web.whatsapp.com/send?phone=905377323226&text=Hi" /* Writing is required */,
    mobile:
      "https://wa.me/905377323226/?text=Hi" /* If it is hidden desktop link will be valid. To remove, (mobile:false) */,
  },
  onlineDay: {
    /* Change the day you are offline like this. (sunday:false) */
    sunday: "00:00-23:59",
    monday: "00:00-23:59",
    tuesday: "00:00-23:59",
    wednesday: "00:00-23:59",
    thursday: "00:00-23:59",
    friday: "00:00-23:59",
    saturday: "00:00-23:59",
  },
};

const avatar_name = ["Lorna Hensley", "Mattie Simmonds", "Kole Cleg"];


const WidgetEditComponent = ({ template, setTemplate, setMode, templateID, getWidgetTemplate }) => {
  const templateRef = useRef({ ...template });
  const radioInputRef = useRef();
  const [counter, setcounter] = useState(0);
  const [repEditMode, setrepEditMode] = useState({
    status: false,
    avatarID: "",
  });

  const addWidgetTemplate = async(e) => {
    e.preventDefault();
    try {
      const payload = {
        "settings": template,
        "customer_id": userData?._id,
        "type": "whatsapp",
        "template_id": templateID,
    }
      const res = await fetch(`http://localhost:8080/widgets`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json", 
          // "Authorization": `Bearer ${token}`,
          // Add other headers if needed
        },
      })
      if(`${res.status}` === '200'){
        getWidgetTemplate();
        toast.success(`Successfully saved widget template data`);
      }
    } catch (error) {
      console.log('widget customization error ', error);
      toast.error(error?.message)
    }
  }
  
  useEffect(() => {
    console.log('type?.popup?.persons ', template)
  }, [template])
  
  useEffect(() => {
    if(counter === 3){
      setcounter(0);
    }
  }, [counter])

  useEffect(() => {
    let updatedPersons = template?.popup?.persons.map((ele, ind) => ({...ele, id: uuidv4()}));
    setTemplate((pre) => ({
      ...pre,
      type: {...pre?.type, popup: { ...pre?.type?.popup, persons: [...updatedPersons] }}
    }));
  }, []);
  
  

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        <Card style={{ width: "100%", margin: "0 auto" }} className="mt-2">
          <CardHeader className="w-100 pb-0">
            <H5>{"Customize Widget"}</H5>
          </CardHeader>
          <CardBody>
            <Form
              className="needs-validation"
              noValidate=""
              onSubmit={(e) => {addWidgetTemplate(e)}}
            >
              <H6 attrH6={{className: 'd-inline-block border border-light p-2 bg-light text-dark  rounded'}}>{"Button"}</H6>
              <Row>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Position"}
                  </Label>
                  <select
                    className="form-control"
                    name="position"
                    defaultValue={template?.button?.position}
                    placeholder="Position"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type, button: { ...pre?.type?.button, position: e.target.value }},
                      }));
                    }}
                    required={true}
                  >
                    <option value="">Select Position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="8 mb-3">
                  <Label htmlFor="validationCustom01">{"Style"}</Label>
                  <div className="d-flex align-items-center gap-3 flex-wrap ">
                    {[1, 2, 3, 4, 5].map((ele, ind) => (
                      <div key={ind} style={{height: '50px'}} className="d-flex  align-items-center gap-1">
                      <input style={{width: '15px', height:'15px', cursor: 'pointer'}}
                        type="radio"
                        onChange={(e) => {
                          if(e.target.checked === true){
                          setTemplate((pre) => ({
                            ...pre,
                            type: {...pre?.type, button: { ...pre?.type?.button, style: ele }}
                          }));
                        }
                        }}
                        checked={template?.button?.style === ele ? true : false}
                      />
                      <img src={button_styles[ind]} alt="button_1" className="btn-styles"/>
                      </div>
                    ))}
                  </div>
                  {/* <select
                    className="form-control"
                    name="style"
                    defaultValue={template?.button?.style}
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type, button: { ...pre?.type?.button, style: e.target.value }}
                      }));
                    }}
                    placeholder="Style"
                    required={true}
                  >
                    <option value={""}>Select Style</option>
                    {[1, 2, 3, 4, 5, 6, 7].map((ele, ind) => (
                      <option style={{backgroundImage: 'url("https://cloudify.store/assets/lp/img/logos/cloudify.png")'}} value={ele}>
                        1
                      </option>
                    ))}
                  </select> */}
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </Row>

              <Row>
              <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Background Color"}
                  </Label>
                  <div className="d-flex gap-2 align-items-center">
                    <select
                      className="form-control"
                      name="buttonBackgroundColor"
                      defaultValue={colorsArr?.find((ele) => (ele?.code === template?.button?.backgroundColor))?.color}
                      onChange={(e) => {
                        e.preventDefault();
                        setTemplate((pre) => ({
                          ...pre,
                          type: {...pre?.type,  
                            button: {
                            ...pre?.type?.button,
                            backgroundColor: e?.target?.value,
                          },}
                        }));
                      }}
                      placeholder="Background Color"
                      // required={true}
                    >
                      <option
                        style={{ width: "15px", height: "15px" }}
                        value={""}
                      >
                        Select background Color
                      </option>
                      {colorsArr?.map((ele, ind) => (
                        <option
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                            backgroundColor: ele?.code,
                            color: 'white',
                          }}
                          value={ele?.code}
                        >{ele?.color}</option>
                      ))}
                    </select>
                    <ColorDiv bgColor={template?.button?.backgroundColor} />
                  </div>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Speech Bubble"}
                  </Label>
                  <input
                    className="form-control"
                    name="speechBubble"
                    type="text"
                    defaultValue={template?.button?.speechBubble}
                    placeholder="Speech Bubble"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                       type: {...pre?.type,  
                        button: {
                        ...pre?.type?.button,
                        speechBubble: e.target.value,
                      }}
                      }));
                    }}
                    required={true}
                  ></input>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                {template?.button?.style === 1 && (
                  <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Pulse effect"}
                  </Label>
                  <select
                    className="form-control"
                    name="buttonPulseEffect"
                    defaultValue={template?.button?.pulseEffect}
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type, 
                          button: {
                          ...pre?.type?.button,
                          pulseEffect: e.target.value === "true" ? true : false,
                        }}
                      }));
                    }}
                    placeholder="Pulse effect"
                    required={true}
                  >
                    <option value={""}>Select Pulse Effect</option>
                    {[true, false].map((ele, ind) => (
                      <option value={ele}>{ele ? "Yes" : "No"}</option>
                    ))}
                  </select>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                )}
              </Row>

              <Row>
                {template?.button?.style !== 1 && (
                  <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">{"Title"}</Label>
                  <input
                    className="form-control"
                    name="buttonTitle"
                    type="text"
                    defaultValue={template?.button?.text?.title}
                    placeholder="Title"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type,
                           button: {
                          ...pre?.type?.button,
                          text: { ...pre?.type?.button?.text, title: e.target.value },
                        }}
                      }));
                    }}
                    required={true}
                  ></input>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                )}
                {(template?.button?.style === 2 || template?.button?.style === 4 || template?.button?.style === 5) && (
                  <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"description"}
                  </Label>
                  <input
                    className="form-control"
                    name="buttonDescription"
                    type="text"
                    defaultValue={template?.button?.text?.description}
                    placeholder="description"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type, 
                          button: {
                            ...pre?.type?.button,
                            text: {
                              ...pre?.type?.button?.text,
                              description: e.target.value,
                            },
                          },
                        }
                      }));
                    }}
                    required={true}
                  ></input>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                )}
                
              </Row>
                <H6 attrH6={{className: 'd-inline-block border border-light p-2 bg-light text-dark  rounded'}}>Popup</H6>
              <Row>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Header description"}
                  </Label>
                  <input
                    className="form-control"
                    name="popupHeaderDescription"
                    type="text"
                    defaultValue={template?.popup?.header?.description}
                    placeholder="Header description"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type,
                          popup: {
                            ...pre?.type?.popup,
                            header: {
                              ...pre?.type?.popup?.header,
                              description: e.target.value,
                            },
                          },
                        }
                      }));
                    }}
                    required={true}
                  ></input>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Header Title"}
                  </Label>
                  <input
                    className="form-control"
                    name="popupHeaderTitle"
                    type="text"
                    defaultValue={template?.popup?.header?.title}
                    placeholder="Header Title"
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type,  
                          popup: {
                            ...pre?.type?.popup,
                            header: {
                              ...pre?.type?.popup?.header,
                              title: e.target.value,
                            },
                          },
                        }
                      }));
                    }}
                    required={true}
                  ></input>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom01">
                    {"Automatic Open"}
                  </Label>
                  <select
                    className="form-control"
                    name="buttonPulseEffect"
                    defaultValue={template?.popup?.automaticOpen}
                    onChange={(e) => {
                      e.preventDefault();
                      setTemplate((pre) => ({
                        ...pre,
                        type: {...pre?.type, 
                          popup: {
                          ...pre?.type?.popup,
                          automaticOpen: e.target.value === "true" ? true : false,
                        }}
                      }));
                    }}
                    placeholder="Pulse effect"
                    required={true}
                  >
                    <option value={""}>Select Pulse Effect</option>
                    {[true, false].map((ele, ind) => (
                      <option value={ele}>{ele ? "Yes" : "No"}</option>
                    ))}
                  </select>
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </Row>

              <Row>
                <Col md="4 mb-3">
                  <span
                    style={{ cursor: "pointer" }}
                    className="d-flex align-items-center"
                  >
                    {template?.popup?.persons?.length < 3 && (
                      <div className="d-flex gap-2 align-items-center">
                        <span>Add Representative</span>
                        <GetIcon
                          IconValue={IoIosAddCircleOutline}
                          clickEvent={() => {
                            if (template?.popup?.persons?.length < 3) {
                              setTemplate((pre) => ({
                                ...pre,
                                type: {...pre?.type,
                                  popup: {
                                    ...pre?.type?.pop,
                                    persons: [
                                      ...pre?.type?.popup?.persons,
                                      {...Avatar, id: uuidv4()},
                                    ],
                                  },
                                }
                              }));
                              setcounter((pre) => (pre + 1));
                            }
                          }}
                        />
                      </div>
                    )}
                  </span>
                  {template?.popup?.persons?.length > 0 &&
                    repEditMode.status === false && (
                      <>
                        <span className="mb-1">Representatives</span>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                        {template?.popup?.persons?.map((ele, ind) => (
                          <div
                            key={ele?.id}
                            className="mb-1 w-75 d-flex justify-content-evenly align-items-center p-1 border border-lightgray"
                            style={{ borderRadius: "4px" }}
                          > 
                          <img
                              style={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid skyblue",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                             src={new DOMParser()?.parseFromString(ele?.avatar?.src, 'text/html')?.querySelector('img')?.getAttribute('src')}
                             alt="avatar-1"
                            />
                            <GetIcon
                              IconValue={CiEdit}
                              clickEvent={() => {
                                setrepEditMode({
                                  status: true,
                                  avatarID: ele?.id,
                                });
                              }}
                            />
                            <GetIcon
                              IconValue={MdOutlineRemoveCircleOutline}
                              clickEvent={() => {
                                setTemplate((pre) => ({
                                  ...pre,
                                  type: {...pre?.type, 
                                    popup: {
                                      ...pre?.type?.pop,
                                      persons: [
                                        ...pre?.type?.popup?.persons.filter(
                                          (item, ind) => (item?.id !== ele?.id)
                                          )
                                      ],
                                    },
                                  }
                                }));
                              }}
                            />
                          </div>
                        ))}
                        </div>
                      </>
                    )}
                </Col>
              </Row>
              {repEditMode.status === true ? 
                  <EditRepresentative
                    template={template}
                    setTemplate={setTemplate}
                    avatarID={repEditMode?.avatarID}
                    setrepEditMode={setrepEditMode}
                  />
                  :
                  <div className="d-flex flex-wrap gap-2 align-items-center">
              <Btn attrBtn={{ color: "primary", type: "submit" }}>
                {"Submit form"}
              </Btn>
              <Btn
                attrBtn={{
                  color: "secondary",
                  onClick: () => {
                    // setTemplate((pre) => ({...pre, type: {...templateRef?.current?.type}}));
                    setMode("");
                  },
                }}
              >
                {"Back"}
              </Btn>
              <Btn
                attrBtn={{
                  color: "danger",
                  onClick: () => {
                    setTemplate((pre) => ({...pre, type: {...templateRef?.current}}));
                  },
                }}
              >
                {"Restore"}
              </Btn>
                  </div>
              }
            </Form>

            {/* <div id={"example-sample"}></div> */}
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};
export default WidgetEditComponent;

const ColorDiv = ({ bgColor }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        width: "25px",
        height: "25px",
        boxSizing: "border-box",
        padding: "2px",
        border: "1px solid teal",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          boxSizing: "border-box",
          backgroundColor: bgColor,
          border: "1px solid teal",
        }}
      ></div>
    </div>
  );
};

const GetIcon = ({ IconValue, clickEvent }) => {
  return (
    <IconValue
      style={{ width: "18px", height: "18px", cursor: "pointer" }}
      onClick={() => {
        clickEvent();
      }}
    />
  );
};
