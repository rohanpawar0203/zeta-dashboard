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

const Broadcasting = () => {
  const headerTypes = ["text", "media"];
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

    // Now you can use timeInMilliseconds as needed, for example, send it to your API
  };

  // const handleTemplateChange = (e) => {
  //   setInitialTemplateValues((prevProps) => ({
  //     ...prevProps,
  //     [name]: value,
  //   }));
  // };

  const onTemplateCreate = (e) => {
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

    console.log("JSON", json);
  };

  useEffect(() => {
    // onTemplateCreate();
  }, []);
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
              <FormGroup>
                <input
                  type="textarea"
                  className="form-control"
                  name="description"
                  rows="3"
                  style={{ height: "80px" }}
                  required={true}
                  placeholder="Message Body"
                  onChange={(e) =>
                    setTemplateBody((prevValues) => ({
                      ...prevValues,
                      text: e.target.value,
                    }))
                  }
                />
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
                      Select Template
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
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                    ></div>
                  </FormGroup>
                </Col>
              </Row>
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
