import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import SearchBar from "../../FileManager/SearchBar";
import {
  CheckCircle,
  Info,
  PlusCircle,
  PlusSquare,
  Target,
  Upload,
  Download,
} from "react-feather";
import { Link } from "react-router-dom";
import { H5, H6 } from "../../../AbstractElements";
import { UploadProjectFile } from "../../../Constant";
import Dropzone from 'react-dropzone-uploader';


const Custom = () => {
    const getUploadParams = ({ meta }) => {
        return {
            url: 'https://httpbin.org/post'
        };
    };

    const handleChangeStatus = ({ meta, file }, status) => { };
  return (
    <Fragment>
      <Row>
        <Col sm="9">
          <Row>
            <H6 attrH6={{ className: "fw-bold fs-4" }}>Upload Store File</H6>
            <H5 attrH5={{ className: "fw-normal my-1" }}>
              Download our store template, add all the Products in the sheet,
              and upload instantly.{" "}
            </H5>
            <span className="font-primary mb-2">
              (Please download the template before uploading the file.)
            </span>
          </Row>
        </Col>
        <Col sm="3">
          <div className="btn btn-outline-primary ms-2 d-flex align-items-center justify-content-evenly">
            <Download />
            {"Download Template"}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mb-3">
            <FormGroup>
              <Label>{'We support only a single CSV or Excel file (with 1 sheet) up to 5 MB in size.'}</Label>
              <Dropzone
                className="dropzone"
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent="Click to upload a file or drag and drop it here"
              />
            </FormGroup>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Custom;
