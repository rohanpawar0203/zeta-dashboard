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
  Media,
} from "reactstrap";
import { Btn, H5, Image, LI, Spinner, UL } from "../../../AbstractElements";
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import BotIcons from "./BotIcons";
import IconColors from "./IconColors";
import { CreateNewProject } from "../../../Constant";
import paymentProfile from "../../../assets/images/Payments/icons8-payment-100.png";
import {
  BotCreate,
  FAQFilesAPI,
  FileServerAPI,
  UploadCompanyLogoAPI,
} from "../../../api";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserDetails } from "../../../Services/UsersServices";
import ScrollBar from "react-perfect-scrollbar";
import { styles } from "../../WhatsAppWidget/Customization";

const userData = JSON.parse(sessionStorage.getItem("currentUser"));
const token = sessionStorage.getItem("token");

const Customize = ({ myBot, setMyBot, setLoading, fetchBotData }) => {
  const [botIcons, setbotIcons] = useState([
    "BiBot",
    "BsRobot",
    "TbMessageDots",
    "BiUser",
    "AiOutlineQuestionCircle",
    "TfiHeadphoneAlt",
    "Ri24HoursLine",
    "LuMessagesSquare",
    "TfiCommentsSmiley",
  ]);
  const botDetilsRef = useRef(myBot);
  const [companyLogoFile, setcompanyLogoFile] = useState("");
  const [companyLogoURL, setcompanyLogoURL] = useState(myBot?.companyLogo);
  //  const [isBotChaged, setisBotChaged] = useState(false);
  const [companyLogoMode, setCompanyLogoMode] = useState("logo");
  const [paymentMethod, setpaymentMethod] = useState("");
  const payment_methods = [
    { code: "default", text: "Select Payment Mode" },
    { code: "COD", text: "Cash On Delivery" },
    { code: "ONLINE", text: "Online" },
  ];
  const online_payment_modes = [
    { code: "JUSPAY", text: "JusPay" },
    { code: "JUSPAY", text: "JusPay" },
  ];

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

  const updateBotInfo = async () => {
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
        fetchBotData(myBot?._id);
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
    const { name, value } = e.target;
    setMyBot((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const uploadCompanyLogo = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "companyName",
        userData?.companyName?.replaceAll(" ", "-")
      );
      const modifiedFileName = companyLogoFile.name.replaceAll(" ", "-");
      formData.append("companyLogo", companyLogoFile, modifiedFileName);
      const res = await axios.post(`${UploadCompanyLogoAPI}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseUrl = await res?.data?.filenames[0];
      if (responseUrl) {
        setcompanyLogoURL(responseUrl);
        getUserDetails(userData?._id);
        return responseUrl;
      }
    } catch (error) {
      toast.error("File Upload Failed");
      console.log("csv upload error ", error);
    }
  };

  const handleBotEdit = async (e) => {
    e.preventDefault();
    try {
      if (companyLogoFile) {
        const logoUrl = await uploadCompanyLogo();
        if (logoUrl) {
          let urlString = FileServerAPI + "/" + logoUrl;
          myBot.companyLogo = urlString;
        }
      }
      updateBotInfo();
    } catch (error) {
      console.log("Error at bot update ", error);
    }
  };

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
                  noValidate=""
                  onSubmit={handleBotEdit}
                  style={{ height: "100%" }}
                >
                  {/* <ScrollBar> */}
                  <Row>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">{"Bot Name"}</Label>
                      <input
                        className="form-control"
                        name="botName"
                        type="text"
                        defaultValue={myBot?.botName}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="Bot Name"
                        required={true}
                      />
                      <span></span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom02">
                        {"Company Name"}
                      </Label>
                      <input
                        className="form-control"
                        name="companyName"
                        type="text"
                        defaultValue={myBot?.companyName}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder="Company Name"
                        required={true}
                      />
                      <span></span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Label htmlFor="validationCustom03">
                      {"Chat bubble icon"}
                    </Label>
                    <div className="w-100 d-flex flex-wrap mb-2">
                      <BotIcons
                        botIcons={botIcons}
                        setMyBot={setMyBot}
                        myBot={myBot}
                      />
                    </div>
                  </Row>
                  <Row>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom03">
                        {"Accent colour"}
                      </Label>
                      <input
                        className="form-control"
                        name="backgroundColor"
                        style={styles["colorPicker"]}
                        type="color"
                        onChange={(e) => {
                          setMyBot((pre) => ({
                            ...pre,
                            accentColor: e?.target?.value,
                          }));
                        }}
                        defaultValue={myBot?.accentColor || "#f6b73c"}
                        placeholder="Background color..."
                        required={true}
                      />
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">{"Subheading"}</Label>
                      <input
                        className="form-control"
                        name="subheading"
                        type="text"
                        defaultValue={myBot?.subheading}
                        placeholder="Subheading"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row>
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
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Welcome Message"}
                      </Label>
                      <input
                        className="form-control"
                        name="welcomeMessage"
                        type="text"
                        defaultValue={myBot?.welcomeMessage}
                        placeholder="Welcome Message"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        required={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4 mb-3">
                      {myBot?.companyLogo && companyLogoMode === "logo" ? (
                        <span>
                          <Label htmlFor="validationCustom01">
                            {"Company Logo"}
                          </Label>
                          <div className="avatar d-flex align-items-center gap-3">
                            <Image
                              attrImage={{
                                body: true,
                                className: " border border-2 border-info",
                                src: companyLogoURL,
                                alt: "#",
                                style: {
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                  width: "75px",
                                },
                              }}
                            />
                            <div className="status status-30"></div>
                            <FaRegEdit
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setCompanyLogoMode("edit");
                              }}
                            />
                          </div>
                        </span>
                      ) : (
                        <span>
                          <Label htmlFor="validationCustom01">
                            {"Company Logo"}
                          </Label>
                          <div className="d-flex align-items-center gap-2">
                            <input
                              className="form-control"
                              name="companyLogo"
                              type="file"
                              accept="image/png, image/jpeg"
                              placeholder="Company Logo"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  var reader = new FileReader();
                                  reader.onload = function (evnt) {
                                    setcompanyLogoURL(evnt.target.result);
                                    setCompanyLogoMode("logo");
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                                setcompanyLogoFile(e.target.files[0]);
                              }}
                              required={true}
                            />
                            <MdCancel
                              style={{
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setcompanyLogoURL(myBot?.companyLogo);
                                setCompanyLogoMode("logo");
                              }}
                            />
                          </div>
                        </span>
                      )}
                    </Col>
                  </Row>
                  <Btn attrBtn={{ color: "primary" }}>{"Submit form"}</Btn>
                  {/* </ScrollBar> */}
                </Form>
              </Fragment>
            </CardBody>
          </Card>
        </Col>
        {/* </Row> */}
      </Container>
    </Fragment>
  );
};

export const DynamicSwitch = ({ title, code }) => {
  return (
    <Media>
      <Label className="col-form-label m-r-10">{`${title}`}</Label>
      <Media body className="text-evenly icon-state">
        <Label className="switch">
          <Input type="checkbox" />
          <span className="switch-state"></span>
        </Label>
      </Media>
    </Media>
  );
};
export default Customize;
