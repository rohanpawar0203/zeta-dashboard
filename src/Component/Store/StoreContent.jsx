import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Row, Container, Card, CardHeader, CardBody } from 'reactstrap';
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, Btn } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import { useForm } from 'react-hook-form';
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
import Custom from './components/Custom'
import Crawler from "./components/Crawler";
import { useNavigate } from "react-router";
import { bigCommerceUrl, shopifyStoreUrl, customUrl, crawlerUrl } from "../../api";

const StoreContent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerType, setregisterType] = useState('shopify');
  const [submitLoader , setSubmitLoader] = useState(false);
  const [formData, setformData] = useState({});
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const {handleForStore, handleForLogout} = GetMenuItemsProps();
  const {handleFilterForStorePresent} = GetMenuItemsProps();
  
  const handleRegisterTypeChange = (e) =>{
    e.target.checked && setregisterType(e.target.value);
  }

  const onSubmit = async(data) => {
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
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          history(`${process.env.PUBLIC_URL}/bot`)} 
          else {
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
          handleFilterForStorePresent();
          toast.success("Profile created successfully");
          history(`${process.env.PUBLIC_URL}/bot`)
        } else {
          setSubmitLoader(false);
          toast.error(response.message);
        } 
      } else if (registerType === "custom") {
        const formData = new FormData();
        formData.append("file", formData.file);
        formData.append("userId", user._id);

        const res = await fetch(customUrl, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        if (res.ok) {
          // handleForStore();
          setSubmitLoader(false);
          toast.success("Profile created successfully");
          history(`${process.env.PUBLIC_URL}/bot`)
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
          history(`${process.env.PUBLIC_URL}/bot`)
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
  return (
    <Fragment>
      <Fragment>
        <Container fluid={true} className="general-widget">
          <Row>
          <Card>
              <CardBody>
                <Fragment>
      <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
        {registerType ==='shopify' && (<ShopifyForm errors={errors} register={register}/>)}
        {registerType ==='custom' && (<Custom formData={formData} setformData={setformData}/>)}
        {registerType ==='crawler' && (<Crawler />)}
        <Row>
        <Col md="8 mb-3">
        <H4>Registration Type</H4>
            <div className="m-checkbox-inline mb-0 custom-radio-ml">
              <div className="radio radio-primary">
                <Input id="radioinline1" type="radio" onChange={(e) => {handleRegisterTypeChange(e)}}  name="shopify" value="shopify"  checked={registerType==='shopify'}/>
                <Label className="mb-0" for="radioinline1">{Option}<span className="digits">Shopify</span></Label>
              </div>
              <div className="radio radio-primary">
                <Input id="radioinline2" type="radio" onChange={(e) => {handleRegisterTypeChange(e)}}  name="custom" value="custom"  checked={registerType==='custom'}/>
                <Label className="mb-0" for="radioinline2">{Option}<span className="digits">Custom</span></Label>
              </div>
              <div className="radio radio-primary">
                <Input id="radioinline3" type="radio" onChange={(e) => {handleRegisterTypeChange(e)}}  name="crawler" value="crawler" checked={registerType==='crawler'}/>
                <Label className="mb-0" for="radioinline3">{Option}<span className="digits">Crawler</span></Label>
              </div>
            </div>
          </Col>
        </Row>
        <Btn attrBtn={{ color: 'primary'}}>{'Register'}</Btn>
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
