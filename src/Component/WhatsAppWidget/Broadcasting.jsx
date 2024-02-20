import { Fragment, useEffect, useState } from "react";
import { Btn, H1, H2, H4, P } from "../../AbstractElements";
import {
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
import { WhatsappTemplateAPI } from "../../api";
import axios from "axios";
import appStore from "../Live Chats/Client/AppStore";

const Broadcasting = () => {
  const { userData, token } = appStore();
  const headerTypes = ["text", "media"];
  const variableList = ["{{1}}"];
  const [initialValues, setInitialValues] = useState({
    contacts: [],
    scheduleDateTime: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    ).getTime(),
    sendNow: true,
  });
  const [templateName, setTemplateName] = useState("");
  const [templateHeader, setTemplateHeader] = useState({
    type: "HEADER",
    text: "",
  });
  const [templateBody, setTemplateBody] = useState({
    type: "BODY",
    text: "",
  });
  const [templateList, setTemplateList] = useState([]);
  const [modal, setModal] = useState(true);
  const [selectedType, setSelectedType] = useState(headerTypes[0]);
  const [uploadedImage, setUploadedImage] = useState({});
  const [showAddVariable, setShowAddVariable] = useState(true);

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

  // const addVariable = () => {
  //   const currentText = templateBody.text;
  //   let newText = currentText;
  //   let variableFound = false;

  //   variableList.forEach((variable) => {
  //     if (newText.includes(variable)) {
  //       const indexOfVariable = variableList.indexOf(variable);
  //       const nextVariableIndex = (indexOfVariable + 1) % variableList.length;
  //       const nextVariable = variableList[nextVariableIndex];

  //       console.log(`Adding variable: ${nextVariable}`);

  //       newText = newText.replace(variable, nextVariable);
  //       variableFound = true;
  //     }
  //   });

  //   if (!variableFound) {
  //     console.log(`Adding first variable: ${variableList[0]}`);
  //     newText = newText.concat(variableList[0]);
  //   }

  //   setTemplateBody((prevValues) => ({
  //     ...prevValues,
  //     text: newText,
  //   }));
  // };

  const addVariable = (clicked) => {
    if (templateBody.text.includes(variableList[0])) {
      setShowAddVariable(false);
    } else {
      // console.log("addVariable else", showAddVariable);
      setShowAddVariable(true);
      if (clicked) {
        setTemplateBody((prevValues) => ({
          ...prevValues,
          text: templateBody.text.concat(variableList[0]),
        }));
      }
    }
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
      }
    } catch (error) {
      console.log("getTemplates", error);
    }
  };

  const onTemplateCreate = async (e) => {
    e.preventDefault();
    let json = {
      templateName: templateName,
      templateHeader: {
        type: templateHeader.type,
        format: selectedType,
        text: templateHeader.text,
      },
      templateBody: {
        type: templateBody.type,
        text: templateBody.text,
      },
    };
    // Conditionally add the example block
    if (json?.header?.type === "TEXT") {
      json.header.example = {
        header_text: ["Summer Sale"],
      };
    }

    try {
      const resp = await axios(`${WhatsappTemplateAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          userId: userData._id,
          ...json,
        }),
      });
      if (resp.status === 200) {
        setModal(false);
        setTemplateBody({
          type: "BODY",
          text: "",
        });
        setTemplateHeader({
          type: "HEADER",
          text: "",
        });
        setTemplateName("");
      } else {
      }
      console.log("resp", resp);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    addVariable();
  }, [templateBody.text, showAddVariable]);

  useEffect(() => {
    getTemplates();
  }, [modal]);

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
          </Row>
          <H2>Template Content</H2>

          <Row style={{ padding: "0 20px" }}>
            <H4>Header</H4>
            <Col xl={2}>
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
                      <option id={idx} value={type}>
                        {type.toUpperCase()}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            {selectedType === "text" ? (
              <Col xl={10}>
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
                      className="dropzone"
                      onChangeStatus={(val) => setUploadedImage(val)}
                      maxFiles={1}
                      multiple={false}
                      canCancel={true}
                      inputContent="Drop files here"
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
                <i
                  class="fa fa-plus-square"
                  title="Add Variable"
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    right: 0,
                    fontSize: "24px",
                    opacity: showAddVariable ? 1 : 0.5,
                    cursor: showAddVariable ? "pointer" : "no-drop",
                  }}
                  onClick={() => {
                    addVariable(true);
                  }}
                ></i>
              </FormGroup>
            </Col>
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
          <Form className="theme-form">
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
              {templateList !== 0 ? (
                <Row>
                  <Col>
                    <FormGroup>
                      <Input
                        type="select"
                        name="select"
                        className="form-control digits"
                        defaultValue={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        required={true}
                      >
                        {templateList.map((template, idx) => {
                          return (
                            <option id={idx} value={template._id}>
                              {template.templateName}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
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
                {!initialValues.sendNow ? (
                  <Col xl="8">
                    <FormGroup>
                      <Label className="col-form-label pt-0">Time</Label>
                      <Input
                        className="form-control"
                        type="datetime-local"
                        placeholder="Password"
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
                <Col xl="4">
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
              </Row>
              <FormGroup>
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Password"
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Btn
                attrBtn={{
                  color: "primary",
                  className: "me-2",
                  type: "submit",
                }}
              >
                Submit
              </Btn>
            </CardFooter>
          </Form>
        </Fragment>
      </div>

      <div className="details-container">
        <H4>Brand Settings</H4>
        <Fragment>
          <CardBody>
            <DataTable
            //   data={data}
            //   columns={tableColumns}
            //   striped={true}
            //   center={true}
            //   persistTableHead
            //   contextActions={contextActions}
            //   onSelectedRowsChange={handleRowSelected}
            //   clearSelectedRows={toggleCleared}
            />
          </CardBody>
        </Fragment>
      </div>
    </section>
  );
};

export default Broadcasting;
