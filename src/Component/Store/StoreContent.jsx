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
    e.target.checked && setregisterType(e.target.value);
  };

  const onSubmit = async (data) => {
    // console.log({data});
    try {
      setSubmitLoader(true);
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
          toast.success("Profile created successfully");
          setSubmitLoader(false);
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
        console.log({ formData });
        if (!formData.file) {
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
          toast.success("Profile created successfully");
          setSubmitLoader(true);
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
                              id="radioinline1"
                              type="radio"
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                              name="bigCommerce"
                              value="bigCommerce"
                              checked={registerType === "bigCommerce"}
                            />
                            <Label className="mb-0" for="radioinline3">
                              {Option}
                              <span className="digits">Big Commerce</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              id="radioinline2"
                              type="radio"
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                              name="shopify"
                              value="shopify"
                              checked={registerType === "shopify"}
                            />
                            <Label className="mb-0" for="radioinline1">
                              {Option}
                              <span className="digits">Shopify</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              id="radioinline3"
                              type="radio"
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                              name="custom"
                              value="custom"
                              checked={registerType === "custom"}
                            />
                            <Label className="mb-0" for="radioinline2">
                              {Option}
                              <span className="digits">Custom</span>
                            </Label>
                          </div>
                          <div className="radio radio-primary">
                            <Input
                              id="radioinline4"
                              type="radio"
                              onChange={(e) => {
                                handleRegisterTypeChange(e);
                              }}
                              name="crawler"
                              value="crawler"
                              checked={registerType === "crawler"}
                            />
                            <Label className="mb-0" for="radioinline3">
                              {Option}
                              <span className="digits">Crawler</span>
                            </Label>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Btn attrBtn={{ color: "primary" }}>{"Register"}</Btn>
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
