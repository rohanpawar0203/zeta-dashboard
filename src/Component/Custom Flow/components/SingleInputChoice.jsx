import React from 'react'
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { Form, FormGroup, Input, Label } from 'reactstrap';

const SingleInput = ({setSingleInputChoice, singleInputChoice}) => {
    const { quiz, currentQuestion } = GetQuestionsContextValues();
    const handleChange = (e) => {
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
    <div className='d-flex gap-2 align-items-center'>
        <FormGroup>
            <Label>{'Next question *'}</Label>
            <Input onChange={(e) => {handleChange(e)}} name="nextQuestion" id="0" type="select" required=""  placeholder="Select next question"  >
            {quiz.allQuestions.map((el) => {
            if (el.questionId._id != currentQuestion._id) {
              return (
                <option key={el.questionId._id} value={el.questionId._id}>
                  {`(${el.questionId._id
                    .split("")
                    .splice(
                      el.questionId?._id.split("").length - 4,
                      el.questionId?._id.split("").length - 1
                    )
                    .join("")
                    .toUpperCase()})  ${el.questionId.title}`}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </option>
              );
            }
          })}
          <option value="Select next question">Select next question</option>
          <option value="">End Quiz</option>
            </Input>            
          </FormGroup>
          <FormGroup>
            <Label>{'Title *'}</Label>
            <Input name="skuId" id="1" onChange={(e) => {handleChange(e)}} className="form-control"
             placeholder="Enter SKU Id" type="text"/>
            {/* <span className='text-danger fw-bolder'>{errors.title && '* Title is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
    </div>
  )
}

export default SingleInput