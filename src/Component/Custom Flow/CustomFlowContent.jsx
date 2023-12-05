import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3, H1, Btn, Spinner } from "../../AbstractElements";
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
  const [loading, setLoading] = useState(false);
  const [editContext, setEditContext] = useState({model: false, contextID: ''});
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  const getAllContexts = async() => {
    setLoading(true);
    try {
      const resp = await axios.get(
        `${GetAllContextsAPI}/${user._id}`
      );
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
          {loading ? 
        <div className="loader-box">
        <Spinner attrSpinner={{ className: 'loader-3' }} /> 
        </div> 
        : 
         <>
         {!editContext?.mode && (
            <div className="w-100 d-flex justify-content-between align-items-center mb-3 mx-4">
            <H4>{'Contexts'}</H4>
            <Btn  attrBtn={{
                        className: "me-4",
                        color: 'success',
                        outline:  false,
                        onClick: () => {
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
           ) :  !(data.length > 0) && !editContext?.mode ?   
           <div className="w-100 h-75 d-flex justify-content-center align-items-center">
            <H6>No Contexts Exist</H6>
            </div> :
            editContext?.mode ?  (
            <QuestionsContextProvider>
            <ConxtEditElement contextID={editContext?.contextID} setEditContext={setEditContext}/>
            </QuestionsContextProvider> 
           ) : null
           }
         </>
         }
          
          <CreateContextModal modal={modal} NewMessage={'Create Context'}  getAllContexts={getAllContexts}
          toggle={toggle} title='Create Context' setData={setData}/>
        </Card>
        </Col>
        </Row>
       </Container>
    </Fragment>
  );
};
export default CustomFlowContent;
