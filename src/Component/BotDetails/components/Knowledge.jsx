import React, { Fragment, useEffect, useState } from "react";
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
  Table,
  Spinner,
  Media,
} from "reactstrap";
import { Btn, H3, H5, H6, Image, LI } from "../../../AbstractElements";
import EmbedBot from "./EmbedBot";
import EmbedIframe from "./EmbedIframe";
import GetRestAPI from "./GetRestAPI";
import Integrations from "./Integrations";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { FAQFilesAPI, PaymentModesAPI, User } from "../../../api";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import appStore from "../../Live Chats/Client/AppStore";
import PaymentModesForm from "./PaymentModesList/PaymentModesList";
import CustomSpinner from "../../../CommonElements/CustomSpinner/CustomSpinner";
import ProductTableData from "../../Ecommerce/ProductList/ProductTableData";
import PaymentModesList from "./PaymentModesList/PaymentModesList";
import {useNavigate} from 'react-router-dom'
import ScrollBar from "react-perfect-scrollbar";

const {token} = appStore.getState();

const Knowledge = ({ myBot }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("");
  const [faqList, setFaqList] = useState([]);
  const { userData, setUserData, token } = appStore();


  useEffect(() => {
    setFaqList([...userData?.faqListURL]);
  }, [userData]);

  return (
    // <PaymentModesList />
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
              <Row>
                <Col md="4 mb-3"> 
                  <Label htmlFor="validationCustom01">{"Bot Name"}</Label>
                  <input
                    className="form-control"
                    name="botName"
                    type="text"
                    defaultValue={myBot?.botName}
                    // onChange={(e) => {
                    //   handleChange(e);
                    // }}
                    disabled
                    placeholder="Bot Name"
                    required={true}
                  />
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col md="4 mb-3">
                  <Label htmlFor="validationCustom02">{"Company Name"}</Label>
                  <input
                    className="form-control"
                    name="companyName"
                    type="text"
                    defaultValue={myBot?.companyName}
                    // onChange={(e) => {
                    //   handleChange(e);
                    // }}
                    disabled
                    placeholder="Company Name"
                    required={true}
                  />
                  <span></span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </Row>
          </Col>
          <Col sm="12">
            <h2>Knowledge</h2>
            <Card className="shadow-none">
              <CardHeader className="p-0 mx-0 mb-2 d-flex flex-wrap w-100 justify-content-between">
                <H6 className="my-2 mx-0">Please Upload CSV File</H6>
                <Btn
                  attrBtn={{
                    color: "success",
                    type: "submit",
                    onClick: () => {
                      setMode("create");
                    },
                  }}
                >
                  {"Add CSV"}
                </Btn>
              </CardHeader>
                  <Fragment>
                    <div>
                      {loading ? (
                        <div className="loader-box">
                          <Spinner attrSpinner={{ className: "loader-3" }} />
                        </div>
                      ) : mode === "create" ? (
                        <AddCSVForm
                          userData={userData}
                          setUserData={setUserData}
                          setMode={setMode}
                          mode={mode}
                          loading={loading}
                          setLoading={setLoading}
                          faqList={faqList}
                          setFaqList={setFaqList}
                        />
                      ) : faqList && faqList.length > 0 ? (
                        <CSVFileInfoList
                          userData={userData}
                          setUserData={setUserData}
                          faqList={faqList}
                          setFaqList={setFaqList}
                          setLoading={setLoading}
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                          <H6 className="my-2 mx-0">No Files Uploaded</H6>
                        </div>
                      )}
                    </div>
                  </Fragment>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

const AddCSVForm = ({
  setMode,
  mode,
  setLoading,
  loading,
  faqList,
  setFaqList,
  userData,
  setUserData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({});
  const [csvFile, setCsvFile] = useState("");
  const [csvValidation, setcsvValidation] = useState(false);
  const [csvError, setCsvError] = useState("");
  const { fileName } = getValues();

  const onSubmit = (data) => {
    if (!csvFile) {
      setCsvError("");
      setcsvValidation(true);
    } else if (data !== "") {
      // createTicket({...payload, ...data, userId: user?._id});
      const formData = new FormData();
      formData.append("companyName", userData?.companyName);
      formData.append("", csvFile);
      uploadCSVFile(formData);
    } else {
      errors.showMessages();
    }
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    setcsvValidation(false);
    setCsvError("");
    const acceptedFileExtensions = [".csv"];

    // Check if the file extension is allowed
    if (!acceptedFileExtensions.some((ext) => file.name.endsWith(ext))) {
      setcsvValidation(false);
      return setCsvError("* Invalid file type");
    }
    if (meta?.status === "removed") {
      setCsvFile(null);
    } else {
      setCsvFile(file);
    }
  };

  const uploadCSVFile = async (formData) => {
    try {
      console.log('formData : ', formData);
      const res = await axios.post(`${FAQFilesAPI}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const responseUrl = await res?.data?.filenames[0];
      if (responseUrl) {
        updateUser(responseUrl, fileName);
      }
    } catch (error) {
      toast.error("File Upload Failed");
      console.log("csv upload error ", error);
    }
  };

  const updateUser = async (responseUrl, fileName) => {
    setLoading(true);
    try {
      const response = await fetch(`${User}/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData,
          faqListURL: [
            ...faqList,
            { fileName: fileName, fileURL: responseUrl, id: uuid() },
          ],
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        // console.log(response.ok);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(responseData.updateUser)
        );
        setUserData({ ...responseData.updateUser });
        setFaqList([
          ...responseData?.updateUser?.faqListURL.map((ele) => ({
            ...ele,
          })),
        ]);
        reset();
        setCsvFile("");
        setcsvValidation(false);
        setCsvError("");
        setMode("");
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Form
        className="needs-validation"
        noValidate=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGroup>
          <Label>{"File Name *"}</Label>
          <input
            className="form-control"
            name="fileName"
            type="text"
            placeholder="File Name"
            {...register("fileName", { required: true })}
          />
          <span className="text-danger fw-bolder">
            {errors.fileName && "* File Name is required"}
          </span>
          <div className="valid-feedback">{"Looks good!"}</div>
        </FormGroup>
        <FormGroup>
          <Label>{"Attach CSV File *"}</Label>
          <Label>
            {
              "We support only a single CSV or Excel file (with 1 sheet) up to 5 MB in size."
            }
          </Label>
          <Dropzone
            className="dropzone"
            accept=".csv"
            onChangeStatus={handleChangeStatus}
            maxFiles={1}
            multiple={false}
            canCancel={true}
            canRemove={true}
            inputContent="Click to upload a file or drag and drop it here"
          />
          <span className="text-danger fw-bolder">
            {csvValidation && "* CSV file is required"}
          </span>
          <span className="text-danger fw-bolder">{csvError && csvError}</span>
        </FormGroup>
        <div className="d-flex gap-4 align-items-center justify-content-start">
          <Btn attrBtn={{ color: "primary", type: "submit" }}>{"Add CSV"}</Btn>
          <Btn
            attrBtn={{
              color: "danger",
              type: "button",
              onClick: () => {
                setMode("");
              },
            }}
          >
            {"Cancel"}
          </Btn>
        </div>
      </Form>
    </Fragment>
  );
};

const CSVFileInfoList = ({
  faqList,
  setFaqList,
  setLoading,
  userData,
  setUserData,
}) => {
  const handleCSVFileDelete = (id) => {
    let filteredList = faqList?.filter((item) => item.id !== id);
    updateUser(filteredList);
  };

  const updateUser = async (filteredList) => {
    setLoading(true);
    try {
      const response = await fetch(`${User}/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData,
          faqListURL: [...filteredList],
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify(responseData.updateUser)
        );
        setUserData({ ...responseData.updateUser });
        setFaqList([...responseData?.updateUser?.faqListURL]);
        toast.success("File removed successfully");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <Container style={{ margin: "0", padding: "0", maxWidth: "100%" }}>
      <div className="h-100" style={{ width: "100%"}}>
        <Table style={{ maxWidth: "100%" }}>
          <thead>
            <tr className="table-primary">
              <th scope="col" style={{ width: "80%" }}>
                {"File Name"}
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                {"Delete"}
              </th>
            </tr>
          </thead>
          <tbody>
            {faqList?.length > 0 &&
              faqList?.map((ele, ind) => (
                <tr key={ele?.id}>
                  <td>{ele?.fileName ? ele?.fileName : "NA"}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleCSVFileDelete(ele?.id);
                      }}
                    >
                      Delete CSV
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Knowledge;