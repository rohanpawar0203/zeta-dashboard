import React, { Fragment, useEffect, useRef, useState } from "react";
import { Btn, H1, H2, H4, H5, P } from "../../AbstractElements";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row,
} from "reactstrap";
import DataTable from "react-data-table-component";
import CommonModal from "../../_core/Ui-kits/Modals/common/modal";
import Dropzone from "react-dropzone-uploader";
import { MessageSchedularAPI, WhatsappTemplateAPI } from "../../api";
import axios from "axios";
import appStore from "../Live Chats/Client/AppStore";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";

const Broadcasting = () => {
  const { userData, token } = appStore();
  const dropzoneRef = useRef();
  const templatedropzoneRef = useRef();
  const categories = ["MARKETING", "AUTHENTICATION", "MARKETING", "UTILITY"];
  const [showSpinner, setShowSpinner] = useState(false);
  const [scheduledMessages, setScheduledMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const headerTypes = ["text", "media"];
  const [variableList, setVariableList] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateCategory, setTemplatCategory] = useState("");
  const [templateHeader, setTemplateHeader] = useState({
    type: "HEADER",
    text: "",
    image: "",
  });
  const [templateBody, setTemplateBody] = useState({
    type: "BODY",
    text: "",
  });
  const [templateFooter, setTemplateFooter] = useState({
    type: "FOOTER",
    text: "",
  });
  const [checkedValue, setCheckedValue] = useState([
    { PHONE_NUMBER: false },
    { URL: false },
  ]);
  const [buttonList, setButtonList] = useState({
    type: "BUTTONS",
    buttons: [
      {
        type: "PHONE_NUMBER",
        text: "",
        phone_number: "",
      },
      {
        type: "URL",
        text: "",
        url: "",
      },
    ],
  });
  const [templateList, setTemplateList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    contacts: "",
    templateId: "",
    scheduleDateTime: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).getTime(),
    sendNow: true,
  });
  const [isformDisabled, setIsFormDisabled] = useState(true);

  const [modal, setModal] = useState(false);
  const [selectedType, setSelectedType] = useState(headerTypes[0]);
  const [uploadedImage, setUploadedImage] = useState({});
  const [broadcastingFile, setBroadcastingFile] = useState({});
  const [showAddVariable, setShowAddVariable] = useState(true);
  const [error, setError] = useState(null);

  const toggle = () => setModal(!modal);
  const handleDateChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const dateObject = new Date(selectedDateTime);

    // Convert the selected date to time in milliseconds using getTime()
    const timeInMilliseconds = dateObject.getTime();

    setInitialValues({
      ...initialValues,
      scheduleDateTime: timeInMilliseconds,
    });
  };

  const addVariable = (clicked) => {
    if (templateBody.text.includes(variableList[0])) {
      setShowAddVariable(false);
    } else {
      setShowAddVariable(true);
      if (clicked) {
        setTemplateBody((prevValues) => ({
          ...prevValues,
          text: templateBody.text.concat(variableList[0]),
        }));
      }
    }
  };

  const addVariables = () => {
    setVariableList((prevVal) => [
      ...variableList,
      { key: `{{${variableList.length + 1}}}`, value: "", sample: "" },
    ]);
    setTemplateBody((prevValues) => ({
      ...prevValues,
      text: templateBody.text.concat(`{{${variableList.length + 1}}}`),
    }));
  };

  const removeVariable = (variable) => {
    setVariableList(variableList.filter((a) => a.key !== variable.key));
    setTemplateBody((prevVal) => ({
      ...prevVal,
      text: templateBody.text.replace(variable.key, ""),
    }));
  };

  const getTemplates = async () => {
    try {
      const resp = await axios(`${WhatsappTemplateAPI}/${userData._id}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.status === 200) {
        setTemplateList(resp.data);
        setInitialValues((prevValues) => ({
          ...prevValues,
          templateId: resp.data[0]._id,
        }));
      }
    } catch (error) {
      console.log("getTemplates", error);
    }
  };

  const onTemplateCreate = async (e) => {
    e.preventDefault();
    let json = {
      templateName: templateName,
      templateCategory: templateCategory,
      templateHeader: {
        type: templateHeader.type,
        format: selectedType,
        text: templateHeader.text,
        image: templateHeader.image,
      },
      templateBody: {
        type: templateBody.type,
        text: templateBody.text,
      },
      variables: variableList,
      buttons: buttonList,
    };
    // Conditionally add the example block
    if (json?.header?.type === "TEXT") {
      json.header.example = {
        header_text: ["Summer Sale"],
      };
    }

    // try {
    //   const resp = await axios(`${WhatsappTemplateAPI}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     data: JSON.stringify({
    //       userId: userData._id,
    //       ...json,
    //     }),
    //   });
    //   if (resp.status === 200) {
    //     setModal(false);
    //     setTemplateBody({
    //       type: "BODY",
    //       text: "",
    //     });
    //     setTemplateHeader({
    //       type: "HEADER",
    //       text: "",
    //       image: "",
    //     });
    //     setButtonList({
    //       type: "BUTTONS",
    //       buttons: [
    //         {
    //           type: "PHONE_NUMBER",
    //           text: "",
    //           phone_number: "",
    //         },
    //         {
    //           type: "URL",
    //           text: "",
    //           url: "",
    //         },
    //       ],
    //     });
    //     setTemplateName("");
    //     setTemplatCategory("");
    //     templatedropzoneRef.current.files = [];
    //     toast.success(resp.data.message);
    //     getTemplates();
    //   } else {
    //     toast.error(resp.data);
    //   }
    // } catch (error) {
    //   toast.error(error);
    // }

    console.log(json);
  };

  const handleSchedularFormSubmit = async (e) => {
    e.preventDefault();
    if (templateList.length !== 0) {
      setShowSpinner(true);
      try {
        var formData = new FormData();
        formData.append("userId", userData._id);
        formData.append("templateId", initialValues.templateId);
        formData.append("sendNow", initialValues.sendNow);
        formData.append("scheduleDateTime", initialValues.scheduleDateTime);
        formData.append("file", broadcastingFile);

        const res = await axios.post(MessageSchedularAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure proper content type for FormData
          },
        });

        if (res && res.status === 200) {
          getSchedules();
          dropzoneRef.current.files = [];
          setInitialValues((prevState) => ({
            ...prevState, // Copy previous state
            scheduleDateTime: new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60000
            ).getTime(),
            sendNow: true,
          }));
          setShowSpinner(false);
        }
      } catch (error) {
        console.log("Error", console.log("handleSchedularFormSubmit", error));
      }
    } else {
      toast.error("Please create template");
    }
  };

  const addEmoji = (event, emojiObj) => {
    console.log("emojiObj", emojiObj, event);
    setTemplateBody((prevValues) => ({
      ...prevValues,
      text: templateBody.text.concat(emojiObj.emoji),
    }));
    setShowPicker(false);
  };

  const handleListUpload = ({ meta, file }, status) => {
    if (status === "done") {
      setBroadcastingFile(file);
      setIsFormDisabled(false);
    } else if (status === "removed") {
      setBroadcastingFile({});
      setIsFormDisabled(true);
    }
  };

  const handleHeaderImageUpload = async ({ meta, file }, status) => {
    if (status === "done") {
      let data = new FormData();
      data.append("companyName", userData.companyName);
      data.append("file", file);
      data.forEach((e) => {
        console.log("handleHeaderImageUpload", e);
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_API_BASE_URL + "/upload-files",
        data: data,
      };

      await axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            setTemplateHeader((prevValues) => ({
              ...prevValues,
              image: response.data.message,
            }));
          } else {
            toast.error("Error while uploading...");
            templatedropzoneRef.current.files = [];
          }
        })
        .catch((error) => {
          toast.error("Error while uploading...");
        });
    } else if (status === "removed") {
      setTemplateHeader((prevValues) => ({
        ...prevValues,
        image: "",
      }));
    }
  };

  const getUploadParams = ({ meta }) => {
    return {
      url: "https://httpbin.org/post",
    };
  };

  const getSchedules = async () => {
    try {
      const res = await axios(`${MessageSchedularAPI}/${userData._id}/user`);
      console.log("getSchedules", res);
      if (res.status === 200) {
        setScheduledMessages(res.data);
      }
    } catch (error) {
      console.log("getSchedulesError", error);
    }
  };

  const handleTableDelete = async (id) => {
    try {
      const res = await axios.delete(MessageSchedularAPI + "/" + id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        getSchedules();
        getTemplates();
        toast.success("Successfully deleted...");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const tableColumns = [
    {
      name: "Scheduled Time",
      selector: (Row) =>
        `${new Date(
          Row.scheduledContent.scheduleDateTime - 330 * 60 * 1000
        ).toISOString()}`,
      // selector: scheduledMessages.map((el) => {
      //   return new Date(el.scheduledContent.scheduleDateTime).toISOString();
      // }),
      sortable: true,
      center: true,
    },
    {
      name: "Scheduled To",
      selector: (Row) => `${Row.scheduledContent.contacts.length}`,
      // selector: scheduledMessages.map((el) => {
      //   return new Date(el.scheduledContent.scheduleDateTime);
      // }),
      sortable: true,
      center: true,
    },
    templateList.length !== 0
      ? {
          name: "Template Name",
          selector: (Row) =>
            Row
              ? Row.templateId &&
                templateList?.filter((e) => e._id === Row.templateId)[0]
                  .templateName
              : "",

          // selector: scheduledMessages.map((el) => {
          //   el.templateId && templateList?.filter((e) => e._id === el.templateId);
          // }),
          sortable: true,
          center: true,
        }
      : {},
    {
      name: "Action",
      selectedType: "HTML",
      selector: (Row) => (
        <div>
          <Button
            color="primary"
            onClick={(e) => handleTableDelete(Row["_id"])}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: true,
      center: true,
    },
  ];

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleDeleteTemplate = async () => {
    try {
      const res = await axios.delete(
        WhatsappTemplateAPI + "/" + initialValues.templateId,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Template deleted successfully");
        getTemplates();
      }
    } catch (error) {}
    console.log(initialValues.templateId);
  };

  useEffect(() => {
    addVariable();
  }, [templateBody.text, showAddVariable]);

  // useEffect(() => {
  // }, [modal]);

  useEffect(() => {}, [variableList]);

  useEffect(() => {
    getTemplates();
    getSchedules();
  }, [templateList.length > 0]);

  useEffect(() => {}, [checkedValue]);

  return (
    <section>
      <CommonModal
        isOpen={modal}
        title={"Create Template"}
        toggler={toggle}
        size="xl"
      >
        <form onSubmit={(e) => onTemplateCreate(e)}>
          <H2>Template Details</H2>
          <Row
            style={{
              flexDirection: "column",
              padding: "0 20px",
              marginBottom: "20px",
            }}
          >
            <Col>
              <FormGroup>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  value={templateName}
                  required={true}
                  onChange={(e) => {
                    setTemplateName(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  className="form-control digits"
                  defaultValue={""}
                  onChange={(e) => setTemplatCategory(e.target.value)}
                  required
                >
                  <option disabled={true} value="">
                    --Please select category--
                  </option>
                  {categories.map((c, idx) => {
                    return (
                      <option key={idx} id={idx} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <H2>Template Content</H2>

          <Row style={{ padding: "0 20px", flexDirection: "column" }}>
            <H4>Header</H4>
            <Col xl={12}>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  className="form-control digits"
                  defaultValue={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  required={true}
                >
                  {headerTypes.map((type, idx) => {
                    return (
                      <option key={idx} id={idx} value={type}>
                        {type.toUpperCase()}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            {selectedType === "text" ? (
              <Col xl={12}>
                <FormGroup>
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Message Title"
                    value={templateHeader.text}
                    onChange={(e) =>
                      setTemplateHeader((prevValues) => ({
                        ...prevValues,
                        text: e.target.value,
                      }))
                    }
                  />
                </FormGroup>
              </Col>
            ) : (
              <Col xl={12}>
                <Card>
                  <FormGroup>
                    <Dropzone
                      ref={templatedropzoneRef}
                      accept=".png,.jpg.jpeg"
                      className="dropzone"
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleHeaderImageUpload}
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      inputContent="Click to upload a file or drag and drop it here"
                    />
                  </FormGroup>
                </Card>
              </Col>
            )}
            <H4>Body</H4>
            <Col>
              <FormGroup style={{ position: "relative", marginBottom: 0 }}>
                <textarea
                  type="textarea"
                  className="form-control"
                  name="description"
                  rows="3"
                  // style={{ height: "80px" }}
                  value={templateBody.text}
                  required={true}
                  placeholder="Message Body"
                  onChange={(e) =>
                    setTemplateBody((prevValues) => ({
                      ...prevValues,
                      text: e.target.value,
                    }))
                  }
                ></textarea>
                {showPicker && (
                  <EmojiPicker
                    pickerStyle={{ width: "100%" }}
                    disableSkinTonePicker={true}
                    onEmojiClick={(emojiData, e) => addEmoji(emojiData, e)}
                  />
                )}
                {!showPicker ? (
                  <i
                    className="fa fa-smile-o"
                    title="Add Variable"
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "5px",
                      fontSize: "24px",
                      opacity: showAddVariable ? 1 : 0.5,
                      cursor: showAddVariable ? "pointer" : "no-drop",
                    }}
                    onClick={() => setShowPicker(!showPicker)}
                  ></i>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
            {variableList.length !== 0 && (
              <Col>
                <table className="variable-list">
                  <tr>
                    <th>Variable Key</th>
                    <th>Variable Field Name</th>
                    <th>Variable Sample Value</th>
                    <th>Action</th>
                  </tr>
                  {variableList.length > 0 &&
                    variableList.map((variable, idx) => {
                      console.log("variableList", variable);
                      return (
                        <tr>
                          <td className="variable">{variable.key}</td>
                          <td>
                            <Input
                              type="text"
                              name="variable-value"
                              value={variable.value} // Make sure to uncomment this line if you want to bind the input value
                              onChange={(e) => {
                                setVariableList((prevVal) =>
                                  prevVal.map((v, i) =>
                                    i === idx
                                      ? { ...v, value: e.target.value }
                                      : v
                                  )
                                );
                              }}
                              placeholder="Value"
                              required
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              name="variable-value"
                              value={variable.sample} // Make sure to uncomment this line if you want to bind the input value
                              onChange={(e) => {
                                setVariableList((prevVal) =>
                                  prevVal.map((v, i) =>
                                    i === idx
                                      ? { ...v, sample: e.target.value }
                                      : v
                                  )
                                );
                              }}
                              placeholder="Sample"
                              required
                            />
                          </td>
                          <td>
                            {variableList.length - 1 === idx ? (
                              <i
                                className="fa fa-minus-square"
                                onClick={
                                  () => removeVariable(variable)
                                  // setVariableList(
                                  //   variableList.filter(
                                  //     (a) => a.key !== variable.key
                                  //   )
                                  // )
                                }
                              ></i>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </Col>
            )}
            <Col style={{ display: "flex", justifyContent: "end" }}>
              <Button onClick={() => addVariables()}>Add variable</Button>
            </Col>
            <H4>Footer</H4>
            <Col>
              <FormGroup>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Message Title"
                  value={templateFooter.text}
                  onChange={(e) =>
                    setTemplateFooter((prevValues) => ({
                      ...prevValues,
                      text: e.target.value,
                    }))
                  }
                />
              </FormGroup>
            </Col>
            <H4>Buttons</H4>
            <Row>
              {buttonList.buttons.map((b, idx) => {
                return (
                  <div style={{ display: "flex", width: "100%", gap: "20px" }}>
                    <Col
                      xl={4}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FormGroup style={{ margin: 0 }}>
                        <Label className="d-block" for="chk-ani">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani"
                            type="checkbox"
                            onChange={(e) =>
                              setCheckedValue((prevValues) => ({
                                ...prevValues,
                                [b.type]: e.target.checked,
                              }))
                            }
                          />
                          {b.type}
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xl={4}>
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Button name"
                          value={buttonList.buttons[idx].text}
                          disabled={!checkedValue[b.type]}
                          required={checkedValue[b.type]}
                          onChange={(e) =>
                            setButtonList((prevValues) => {
                              const updatedButtons = [...prevValues.buttons];
                              updatedButtons[idx] = {
                                ...updatedButtons[idx],
                                text: e.target.value,
                              };

                              return { ...prevValues, buttons: updatedButtons };
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col xl={4}>
                      <FormGroup>
                        <Input
                          className="form-control"
                          type={
                            buttonList.buttons[idx].type === "PHONE_NUMBER"
                              ? "number"
                              : "url"
                          }
                          disabled={!checkedValue[b.type]}
                          required={checkedValue[b.type]}
                          placeholder={
                            buttonList.buttons[idx].type === "PHONE_NUMBER"
                              ? "Phone Number"
                              : "Url"
                          }
                          value={
                            buttonList.buttons[idx].type === "PHONE_NUMBER"
                              ? buttonList.buttons[idx].phone_number
                              : buttonList.buttons[idx].url
                          }
                          onChange={(e) =>
                            setButtonList((prevValues) => {
                              const updatedButtons = [...prevValues.buttons];
                              updatedButtons[idx] = {
                                ...updatedButtons[idx],
                                [`${
                                  buttonList.buttons[idx].type ===
                                  "PHONE_NUMBER"
                                    ? "phone_number"
                                    : "url"
                                }`]: e.target.value,
                              };

                              return { ...prevValues, buttons: updatedButtons };
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </div>
                );
              })}
            </Row>
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "me-2",
                  type: "submit",
                }}
              >
                Submit
              </Btn>
            </Col>
          </Row>
        </form>
      </CommonModal>

      <div className="form-container">
        <H4>Brand Settings</H4>
        <Fragment>
          <Form
            className="theme-form"
            onSubmit={!showSpinner ? handleSchedularFormSubmit : ""}
          >
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label
                      className="col-form-label pt-0"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {templateList.length !== 0
                        ? "Please select Template"
                        : "Please create template"}
                      <Btn
                        attrBtn={{
                          color: "primary",
                          className: "me-2",
                          type: "button",
                          onClick: toggle,
                        }}
                      >
                        Add Template
                      </Btn>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              {templateList.length !== 0 ? (
                <Row>
                  <Col xl="10">
                    <FormGroup>
                      <Input
                        type="select"
                        name="select"
                        className="form-control digits"
                        value={initialValues.templateId}
                        onChange={(e) =>
                          setInitialValues((prevValues) => ({
                            ...prevValues,
                            templateId: e.target.value,
                          }))
                        }
                        required={true}
                      >
                        {templateList.map((template, idx) => {
                          return (
                            <option key={idx} id={idx} value={template._id}>
                              {template.templateName}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl="2" color="--bs-red">
                    <Button
                      style={{ width: "100%" }}
                      color="danger"
                      onClick={() => handleDeleteTemplate()}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Col xl="1">
                  <FormGroup>
                    <Label htmlFor="exampleInputPassword1">Send Now</Label>
                    <Media>
                      <Media body>
                        <Label className="switch">
                          <Input
                            type="checkbox"
                            defaultChecked={initialValues.sendNow}
                            onChange={(e) => {
                              setInitialValues({
                                ...initialValues,
                                sendNow: e.target.checked,
                              });
                              if (e.target.checked) {
                                new Date(
                                  new Date().getTime() -
                                    new Date().getTimezoneOffset() * 60000
                                ).getTime();
                              }
                            }}
                          />
                          <span className="switch-state"></span>
                        </Label>
                      </Media>
                    </Media>
                  </FormGroup>
                </Col>
                {!initialValues.sendNow ? (
                  <Col xl="11">
                    <FormGroup>
                      <Label className="col-form-label pt-0">Schedule at</Label>
                      <Input
                        className="form-control"
                        type="datetime-local"
                        min={getCurrentDateTime()}
                        defaultValue={new Date(initialValues.scheduleDateTime)
                          .toISOString()
                          .slice(0, 16)}
                        onChange={(e) => handleDateChange(e)}
                      />
                    </FormGroup>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <FormGroup>
                <Dropzone
                  ref={dropzoneRef}
                  className="dropzone"
                  accept=".csv, .xls, .xlsx"
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleListUpload}
                  maxFiles={1}
                  multiple={false}
                  canCancel={false}
                  inputContent="Click to upload a file or drag and drop it here"
                />
              </FormGroup>
            </CardBody>
            <CardFooter style={{ display: "flex", justifyContent: "center" }}>
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "me-2",
                  type: "submit",
                  disabled: dropzoneRef?.current?.files.length === 0,
                }}
              >
                {showSpinner ? (
                  <i className="fa fa-spin fa-circle-o-notch"></i>
                ) : (
                  `Submit`
                )}
              </Btn>
            </CardFooter>
          </Form>
        </Fragment>
      </div>

      <div className="details-container">
        <H4>Brand Settings</H4>
        <Fragment>
          {scheduledMessages && scheduledMessages.length !== 0 ? (
            <DataTable
              data={scheduledMessages}
              columns={tableColumns}
              striped={true}
              center={true}
              persistTableHead
              // contextActions={contextActions}
              // onSelectedRowsChange={handleRowSelected}
              // clearSelectedRows={toggleCleared}
            />
          ) : (
            <h5 style={{ width: "100%", textAlign: "center" }}>
              No Data Available
            </h5>
          )}
        </Fragment>
      </div>
    </section>
  );
};

export default Broadcasting;
