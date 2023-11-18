import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import { H4, H5, H6} from '../../../AbstractElements'
import { SmallShadow } from '../../../Constant';
import axios from 'axios';
import { GetContextAPI } from '../../../api';
import { BiArrowBack } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import AddQuestion from './AddQuestion';
const ConxtEditElement = ({contextID, setEditContext}) => {
    const { currentQuestion, setCurrentQuestion, quiz, setQuiz}  = GetQuestionsContextValues();

  const fetchQuizData = async (contextID) => {
    const response = await axios
      .get(`${GetContextAPI}/${contextID}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return null;
      });
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuizData(contextID);
      setQuiz(data?.data);
    };
    if(contextID){
      fetchData();
    }
  }, [contextID]);

  return (
    <Fragment>
      <Col className="col-12">
       <div className="d-flex align-items-center sub-title">
       <BiArrowBack style={{height: '25px', width: '25px'}} onClick={() => {setEditContext((pre) => ({mode: false, contextID: null}))}}/>
        <H4  attrH4={{ className: 'fw-bolder my-0 mx-2' }} >{quiz?.title}</H4>
       <AiFillEdit style={{height: '20px', width: '20px'}}/>
       </div>
      </Col>
      <Col className="col-12">
       <div className="w-100 d-flex justify-content-center align-items-center mb-2">
       
       <button type="button" onClick={() => {
        setCurrentQuestion('add new')
       }} class="btn btn-dark btn-lg d-flex  align-items-center">
       <IoMdAddCircleOutline style={{height: '20px', width: '20px'}}/>
        <span className='my-0 ms-2'>Add New Question</span>
        </button>
       </div>
      </Col>
      <Row>
      <Col className='w-50 vh-75'>
        <div className="shadow-sm shadow-showcase p-2 mx-0">
          <H5 attrH5={{ className: 'm-0 f-18' }} >{SmallShadow}</H5>
        </div>
      </Col>
      <Col className='w-50 vh-75'>
        <div className="shadow-sm shadow-showcase p-2 mx-0">
          <AddQuestion />
        </div>
      </Col>
      </Row>
    </Fragment>
  )
}

export default ConxtEditElement