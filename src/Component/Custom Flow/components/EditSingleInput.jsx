import React, { useContext, useEffect, useState } from "react";
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const EditSingleInput = (
    {
   singleInputChoice,
  singleInput,
  setSingleInputChoice,
  setSingleInput,
    }
) => {
    const { currentQuestion, quiz } = GetQuestionsContextValues();
  useEffect(() => {
    setSingleInputChoice({
      ...currentQuestion.choices[0],
      nextQuestion: currentQuestion.choices[0].nextQuestion?._id,
    });
    setSingleInput(currentQuestion);
  }, [currentQuestion]);

  const handleSingleInputChange = (e) => {
    const { value, name } = e.target;
    setSingleInput({ ...singleInput, [name]: value });
  };
  const handleSingleInputChoice = (e) => {
    const { value, name } = e.target;
    if (value === "" && name === "nextQuestion") {
      let newChoice = {};
      newChoice.title = singleInputChoice.title;
      newChoice.skuId = singleInputChoice.skuId;
      setSingleInputChoice(newChoice);
      return;
    }
    setSingleInputChoice({ ...singleInputChoice, [name]: value });
  };
  return (
    <div>
        <div>
          <FormGroup>
            <Label>{'Title *'}</Label>
            <Input placeholder="Enter title"
          name="title"
          value={singleInput.title || ""}
          onChange={handleSingleInputChange}/>
          </FormGroup>
          <FormGroup>
            <Label>{'Description'}</Label>
            <Input 
             name="description"
             placeholder="Enter description"
             value={singleInput.description || ""}
             onChange={handleSingleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label>{'Category'}</Label>
            <Input 
            placeholder="Enter category"
            name="category"
            value={singleInput.category || ""}
            onChange={handleSingleInputChange}/>
          </FormGroup>
          <FormGroup >
            <Label>{'Form Type'}</Label>
            <Input name="formType"
          onChange={handleSingleInputChange}
          value={singleInput.formType || ""} >
            <option value="Short text">Short text</option>
            <option value="Phone number">Phone number</option>
            <option value="Long text">Long text</option>
            <option value="Email">Email</option>
            </Input>            
          </FormGroup>
           <div className="d-flex mt-3">
            <div style={{width: '30%'}}></div>
            <FormGroup >
            <Label>{'Next Question'}</Label>
            <Input  
            onChange={handleSingleInputChoice}
            value={singleInputChoice?.nextQuestion}
            name="nextQuestion"
            placeholder="Select Next Question"
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
            <div style={{width: '30%'}} className="ms-3">
            <FormGroup>
                  <Label>{" Sku Id "}</Label>
                  <Input
                   onChange={handleSingleInputChoice}
                   name="skuId"
                   value={singleInputChoice?.skuId || ""}
                   placeholder="SKU Id"
                  ></Input>
                </FormGroup>
            </div>
           </div>
          </div>
    </div>
  )
}

export default EditSingleInput