import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Btn } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
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
import {BsCheckCircle} from 'react-icons/bs'
import CreateContextModal from "./components/CreateContextModal";
import ContextTable from "./components/ContextsTable";
import { GetAllContextsAPI } from "../../api";
import ConxtEditElement from "./components/ConxtEditElement";
import QuestionsContextProvider from "./contexts/QuestionsContext";

const CustomFlowContent = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);  
  const [data, setData] = useState([])
  const [editContext, setEditContext] = useState({model: false, contextID: ''});
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const getAllContexts = async() => {
    try {
      const resp = await axios.get(
        `${GetAllContextsAPI}/${user._id}`
      );
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContexts();
  }, [])
  

  return (
    <Fragment>
       <Container fluid={true}>
        <Row>
        <Col sm="12">
        <Card className="vh-100 mt-2  p-4">
          {!editContext?.mode && (
            <div className="w-100 d-flex justify-content-end align-items-center mb-3 mx-4">
            <Btn  attrBtn={{
                        className: "btn-pill me-2",
                        color: 'success',
                        outline:  false,
                        onClick: () => {
                          console.log('working');
                          toggle();
                        }
                      }}
                      >
                        Create Context
                      </Btn>
            </div>
          )}
           {data.length > 0 && !editContext?.mode ? (
            <ContextTable data={data} getAllContexts={getAllContexts} setEditContext={setEditContext}/> 
           ) : 
           <QuestionsContextProvider>
           <ConxtEditElement contextID={editContext?.contextID}/>
           </QuestionsContextProvider> }
          <CreateContextModal modal={modal} NewMessage={'Create Context'} 
          toggle={toggle} title='Create Context' setData={setData}/>
        </Card>
        </Col>
        </Row>
       </Container>
    </Fragment>
  );
};
export default CustomFlowContent;
