import React, { Fragment, useState } from "react";
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
} from "reactstrap";
import { Btn, H5, Image } from "../../../AbstractElements";
import EmbedBot from "./EmbedBot";
import EmbedIframe from "./EmbedIframe";
import GetRestAPI from "./GetRestAPI";
import Integrations from "./Integrations";

const Share = ({ myBot }) => {
  const [shareTabs, setshareTabs] = useState([
    "Embed the bot",
    "Embed Iframe",
    "Get Rest API",
    "Integrations",
  ]);
  const [selectedTab, setselectedTab] = useState("Embed the bot");

  return (
    <Fragment className="h-100">
      <Container className="h-100" fluid={true}>
        <Row>
          <Col sm="12 h-100">
            <Card className="shadow-none h-100">
              <CardHeader className="p-0 m-0 mt-2">
                <h5 className="my-2 mx-0">Share</h5>
              </CardHeader>
              <CardBody className="p-0 m-0 pt-2 h-100">
                <Col sm="10" className=" h-100">
                  <Fragment className="h-100">
                    <div
                      style={{
                        background: "whitesmoke",
                        borderRadius: "8px",
                        boxSizing: "border-box",
                      }}
                      className="d-flex flex-wrap justify-content-evenly align-items-center p-2"
                    >
                      {shareTabs.map((ele, i) => (
                        <div
                          onClick={() => {
                            // if (ele === "Embed the bot") {
                            console.log("Tab Selected", ele);
                            setselectedTab(ele);
                            // }
                          }}
                          key={i}
                          className="d-flex justify-content-center align-items-center p-2 fw-bolder"
                          style={{
                            fontSize: "16px",
                            cursor: "pointer",
                            boxSizing: "border-box",
                            width: "150px",
                            ...(selectedTab === ele && {
                              background: "white",
                              color: "blue",
                              borderRadius: "6px",
                              padding: "1rem 2rem",
                            }),
                          }}
                        >
                          {ele}
                        </div>
                      ))}
                    </div>
                    <div>
                      {selectedTab === "Embed the bot" ? (
                        <EmbedBot myBot={myBot} />
                      ) : selectedTab === "Embed Iframe" ? (
                        <EmbedIframe />
                      ) : selectedTab === "Get Rest API" ? (
                        <GetRestAPI />
                      ) : selectedTab === "Integrations" ? (
                        <Integrations />
                      ) : null}
                    </div>
                  </Fragment>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Share;
