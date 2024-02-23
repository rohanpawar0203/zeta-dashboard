import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  Col,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
  Container,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, Btn } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import { useForm } from "react-hook-form";
import { GetMenuItemsProps } from "../../_helper/MenuItems/MenuItemsProvider";
import {
  AddNew,
  AllFiles,
  Files,
  Folders,
  RecentlyOpenedFiles,
} from "../../Constant";
import {
  BoxSvg,
  BoxSvg1,
  CancelledSvg,
  CancelledSvg1,
  DollerSvg,
  MessageSvg,
  NewUsersSvg,
  PendingSvg,
  PendingSvg1,
  ProductSvg,
  TruckSvg,
  TruckSvg1,
} from "../Widgets/SvgIcons";
import ShopifyForm from "./components/shopifyForm";
import Custom from "./components/Custom";
import Crawler from "./components/Crawler";
import { useNavigate } from "react-router";
import {
  bigCommerceUrl,
  shopifyStoreUrl,
  customUrl,
  crawlerUrl,
} from "../../api";
import appStore from "../Live Chats/Client/AppStore";
import { getUserDetails } from "../../Services/UsersServices";
import BigCommerceForm from "./components/BigCommerceForm";
import CustomSpinner from "../../CommonElements/CustomSpinner/CustomSpinner";

const StoreContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerType, setregisterType] = useState("shopify");
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formData, setFormData] = useState({});
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const { handleForStore, handleForLogout } = GetMenuItemsProps();
  const { handleFilterForStorePresent } = GetMenuItemsProps();
  const { setUserData, userData } = appStore();

  const handleRegisterTypeChange = (e) => {
    let { name } = e.target;
    name && setregisterType(name);
  };

  const onSubmit = async (data) => {
    setSubmitLoader(true);
    try {
      const body = {};
      if (registerType === "bigCommerce") {
        body.userId = user._id;
        body.storeHash = data.storeHash;
        body.xAuthToken = data.xAuthToken;
        const res = await fetch(bigCommerceUrl, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        if (res.ok) {
          // handleForStore();
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          const userId = userData._id;
          setTimeout(async () => {
            await updateUserDetails(userId);
            redirectToBotComponent();
          }, 1000);
        } else {
          setSubmitLoader(false);
          toast.error(response.message);
        }
      } else if (registerType === "shopify") {
        body.userId = user._id;
        body.shopName = data.shopName;
        body.xAuthToken = data.authToken;
        const res = await fetch(shopifyStoreUrl, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await res.json();
        if (res.ok) {
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          const userId = userData._id;
          setTimeout(async () => {
            await updateUserDetails(userId);
            redirectToBotComponent();
          }, 1000);
        } else {
          setSubmitLoader(false);
          toast.error(response.message);
        }
      } else if (registerType === "custom") {
        // const formData = new FormData();
        // formData.append("file", formData.file);
        // formData.append("userId", user._id);
        // console.log({ formData });
        if (!formData.file) {
          setSubmitLoader(false);
          toast.error("Please Upload CSV File!");
          return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append("file", formData.file);
        formDataToSend.append("userId", user._id);

        // setFormData({...formData, file:})

        const res = await fetch(customUrl, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        if (res.ok) {
          // handleForStore();
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          const userId = userData._id;
          setTimeout(async () => {
            await updateUserDetails(userId);
            redirectToBotComponent();
          }, 1000);
        } else {
          setSubmitLoader(false);
          toast.error(response.message);
        }
      } else if (registerType === "crawler") {
        body.userId = user._id;
        const res = await fetch(crawlerUrl, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await res.json();
        if (res.ok) {
          // handleForStore();
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          const userId = userData._id;
          setTimeout(async () => {
            await updateUserDetails(userId);
            redirectToBotComponent();
          }, 1000);
        } else {
          setSubmitLoader(false);
          toast.error(response.message);
        }
      }
    } catch (err) {
      setSubmitLoader(false);
      toast.error(err);
    }
  };

  const redirectToBotComponent = () => {
    setTimeout(() => {
      history(`${process.env.PUBLIC_URL}/bots`);
    }, 1000);
  };

  const updateUserDetails = async (userId) => {
    try {
      let newUserDeatils = await getUserDetails(userId);
      setUserData(newUserDeatils);
      sessionStorage.setItem("currentUser", JSON.stringify(newUserDeatils));
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Fragment>
      <Fragment>
        <Container fluid={true} className="general-widget">
          <Row>
            <Card>
              <CardBody>
                <Fragment>
                  <Form
                    className="needs-validation"
                    noValidate=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {registerType === "bigCommerce" && (
                      <BigCommerceForm errors={errors} register={register} />
                    )}
                    {registerType === "shopify" && (
                      <ShopifyForm errors={errors} register={register} />
                    )}
                    {registerType === "custom" && (
                      <Custom formData={formData} setFormData={setFormData} />
                    )}
                    {registerType === "crawler" && <Crawler />}
                    <Row>
                      <Col md="8 mb-3">
                        <H4>Registration Type</H4>
                        <div className="m-checkbox-inline mb-0 custom-radio-ml">
                          <div className="radio radio-primary">
                            <Input
                              type="radio"
                              id="radioinline1"
                              name="bigCommerce"
                              checked={registerType === "bigCommerce"}
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                            />
                            <Label className="mb-0" for="radioinline1">
                              {Option}
                              <span className="digits">Big Commerce</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              type="radio"
                              id="radioinline2"
                              name="shopify"
                              checked={registerType === "shopify"}
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                            />
                            <Label className="mb-0" for="radioinline2">
                              {Option}
                              <span className="digits">Shopify</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              type="radio"
                              id="radioinline3"
                              name="custom"
                              checked={registerType === "custom"}
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                            />
                            <Label className="mb-0" for="radioinline3">
                              {Option}
                              <span className="digits">Custom</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              type="radio"
                              id="radioinline4"
                              name="crawler"
                              checked={registerType === "crawler"}
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                            />
                            <Label className="mb-0" for="radioinline4">
                              {Option}
                              <span className="digits">Crawler</span>
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Btn attrBtn={{ color: "primary" }}>
                      {submitLoader ? <CustomSpinner /> : "Register"}
                    </Btn>
                  </Form>
                </Fragment>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </Fragment>
    </Fragment>
  );
};
export default StoreContent;
