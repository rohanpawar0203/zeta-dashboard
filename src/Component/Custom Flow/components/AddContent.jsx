import React, { useState } from 'react'
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { Btn, H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AddQuestionAPI } from '../../../api';
const initialContentState = {
    title: "",
    description: "",
    category: "",
    type: "Content Page",
    choices: [],
    uniqueId: "",
    formType: "Information Page",
    totalCta: "",
    cta_1_text: "",
    cta_1_link: "",
    cta_2_link: "ATC",
    cta_2_text: "",
  };
const AddContent = () => {
    const token = sessionStorage.getItem('token');
  const [isthanyouPage, setTankyouPage] = useState("");
  const [totalCta, setTotalCta] = useState("1");
  const { currentQuestion, quiz, setQuiz, setCurrentQuestion } = GetQuestionsContextValues();
  const [newContent, setNewContent] = useState(initialContentState);
  const [contentChoice, setContentChoice] = useState({
    nextQuestion: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nextQuestion") {
      setContentChoice({ ...contentChoice, [name]: value });
      return;
    }
    setNewContent({ ...newContent, [name]: value });
  };

  const handleSubmit = () => {
    const payload = {
      ...newContent,
      choices: contentChoice.nextQuestion === "" ? [] : [contentChoice],
      uniqueId: quiz.uniqueId,
    };
    axios.post(`${AddQuestionAPI}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Question added successfully",);
        setContentChoice({ nextQuestion: "" });
        setNewContent(initialContentState);
        setCurrentQuestion(null);
        setQuiz(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className='custom-scrollbar'>
         <H5 attr5={{className: 'my-2'}}>
                <u>Add New Content Page</u>
            </H5>
            <Form className="needs-validation" noValidate="" onSubmit={() => {handleSubmit()}}>
          <FormGroup>
            <Label>{' Heading *'}</Label>
            <Input className="form-control" onChange={(e) => {handleChange(e)}} name="title" placeholder="Enter heading" required={true} />
          </FormGroup>
          <FormGroup>
            <Label>{'Sub Heading '}</Label>
            <Input onChange={(e) => {handleChange(e)}} className="form-control"  name="category"
          placeholder="Enter sub heading" />
          </FormGroup>
          <FormGroup>
            <Label>{'Content'}</Label>
            <Input onChange={(e) => {handleChange(e)}} className="form-control"  name="description"
          placeholder="Enter content"/>
          </FormGroup>
          <FormGroup>
            <Label>{'Form Type'}</Label>
            <Input onChange={(e) => { handleChange(e);
            setTankyouPage(e.target.value)}} className="form-control"
            name="formType" value={newContent.formType} type="select">
            <option value="Welcome Page">Welcome Page</option>
            <option value="Thank You Page">Thank You Page</option>
            <option value="Information Page">Information Page</option>
            </Input>            
          </FormGroup>
          {isthanyouPage === "Thank You Page" && (
            <>
            <FormGroup >
            <Label>{'>Total CTA'}</Label>
            <Input  name="totalCta"
              onChange={(e) => {
                handleChange(e);
                setTankyouPage(e.target.value);
              }} className="form-control"
              value={newContent.totalCta}
             type="select">
              <option value="1">1</option>
              <option value="2">2</option>
            </Input>            
          </FormGroup>
          <FormGroup>
            <Label>{' Enter CTA_1 link '}</Label>
            <Input className="form-control" onChange={(e) => {handleChange(e)}} name="cta_1_link"
              placeholder="Enter CTA link "/>
          </FormGroup>
          <FormGroup>
            <Label>{' Enter CTA_1 Text'}</Label>
            <Input className="form-control" onChange={(e) => {handleChange(e)}} name="cta_1_text"
              placeholder="Enter CTA_1 Text "/>
          </FormGroup>
          {totalCta === "2" && (
            <>
              <FormGroup>
            <Label>{'Enter CTA_2 link'}</Label>
            <Input className="form-control" onChange={(e) => {handleChange(e)}} name="cta_2_link"
                  placeholder="Enter CTA link "
                  value={"ATC"}/>
          </FormGroup>
              <FormGroup>
            <Label>{'Enter CTA_2 Text'}</Label>
            <Input className="form-control" onChange={(e) => {handleChange(e)}}  name="cta_2_text"
            placeholder="Enter CTA_2 Text "/>
          </FormGroup>
            </>
          )}
          </>
          )} 
           <FormGroup >
            <Label>{'Next Question'}</Label>
            <Input   name="nextQuestion"
          id="0"
          placeholder="Select next question"
              onChange={(e) => {
                handleChange(e);
                setTankyouPage(e.target.value);
              }} className="form-control"
             type="select">
             {quiz.allQuestions.map((el) => {
            if (el.questionId._id !== currentQuestion._id) {
              return (
                <option key={el.questionId._id} value={el.questionId._id}>
                  {`(${el.questionId._id
                    .split("")
                    .splice(
                      el.questionId?._id.split("").length - 4,
                      el.questionId?._id.split("").length - 1
                    )
                    .join("")
                    .toUpperCase()}) ${el.questionId.title}`}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </option>
              );
            }
          })}
          <option value="">End Quiz</option>
            </Input>            
          </FormGroup>
           <div className="d-flex align-items-center justify-content-end">
           <Btn
            attrBtn={{
              color: "success",
              size: "md",
              active: true,
              disabled: false,
              outline: false,
              type: 'submit'
            }}
          >
            {' Add Content'}
          </Btn>
           </div>
         </Form>
    </div>
  )
}

export default AddContent