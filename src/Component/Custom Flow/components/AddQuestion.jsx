import React, { useEffect, useState } from 'react'
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { AddQuestionAPI } from '../../../api';
import axios from 'axios';
import AddContent from './AddContent';
import EditQuestion from './EditQuestion';
import SingleInput from './SingleInputChoice';
import MultipleChoice from './MultipleChoice';
const initialQuestionState = {
  title: "",
  description: "",
  category: "",
  type: "",
  choices: [],
  uniqueId: "",
};

const AddQuestion = () => {
    const { currentQuestion, setCurrentQuestion, quiz, setQuiz}  = GetQuestionsContextValues();
    const [newQuestion, setNewQuestion] = useState(initialQuestionState);
    const [singleInputChoice, setSingleInputChoice] = useState({
      title: "",
      skuId: "",
    });
    const [multipleChoice, setMultipleChoice] = useState([]);
    const token = sessionStorage.getItem('token');
    const types = {
      "Single Input": (
        <SingleInput
          singleInputChoice={singleInputChoice}
          setSingleInputChoice={setSingleInputChoice}
        />
      ),
      "Multiple Choice": (
        <MultipleChoice
          multipleChoice={multipleChoice}
          setMultipleChoice={setMultipleChoice}
        />
      ),
    };
    const handleChange = (e) => {
      const { value, name } = e.target;
      setNewQuestion({ ...newQuestion, [name]: value });
    };
    const handleAddQuestion = (e) => {
      e.preventDefault();
      let payload = {};
      if (newQuestion?.type === "Single Input") {
        payload = {
          ...newQuestion,
          choices: [{ ...singleInputChoice }],
          contextId: quiz?._id,
        };
        if (!payload.formType) {
          payload = { ...payload, formType: "Short text" };
        }
        setSingleInputChoice({
          title: "",
          skuId: "",
        });
        setNewQuestion(initialQuestionState);
      } else if (newQuestion?.type === "Multiple Choice") {
        payload = {
          ...newQuestion,
          choices: multipleChoice,
          contextId: quiz?._id,
        };
  
        if (multipleChoice.length <= 1) {
          toast.error('Multiple options should be provided!')
          return;
        }
        setMultipleChoice([]);
        setNewQuestion(initialQuestionState);
      }
      axios.post(`${AddQuestionAPI}`, payload,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setQuiz(res.data.data);
          setCurrentQuestion(null);
          toast.success("Question added successfully")
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong")
        });
    };
  return (
    <div>
        {currentQuestion === 'add new' ? 
        (
         <div>
            <H4 attr4={{className: 'my-2'}}>
                <u>Add New Question</u>
            </H4>
          <Form className="needs-validation" noValidate="" onSubmit={(e) => {handleAddQuestion(e)}}>
          <FormGroup>
            <Label>{'Question Type *'}</Label>
            <Input onChange={(e) => {handleChange(e)}} name="type" value={newQuestion?.type} type="select" required={true}  placeholder="Select type">
            <option value="">Select type</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Single Input">Single Input</option>
            </Input>            
            {/* <span className='text-danger fw-bolder'>{errors.type && '* Question Type is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Title *'}</Label>
            <Input onChange={(e) => {handleChange(e)}} className="form-control"  name="title" value={newQuestion?.title}
             placeholder="Enter Question Title" type="text"   required={true}/>
            {/* <span className='text-danger fw-bolder'>{errors.title && '* Title is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Description'}</Label>
            <Input onChange={(e) => {handleChange(e)}} className="form-control"  name="description" value={newQuestion?.description} type="text" placeholder="Enter Description"  />
            {/* <span className='text-danger fw-bolder'>{errors.description && '* Description is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Category'}</Label>
            <Input onChange={(e) => {handleChange(e)}} className="form-control"  name="category" value={newQuestion?.category} type="text" placeholder="Enter Category"  />
            {/* <span className='text-danger fw-bolder'>{errors.category && '* Category is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          {newQuestion?.type === "Single Input" ? (
                <>
             <FormGroup >
            <Label>{'Form Type *'}</Label>
            <Input onChange={(e) => {handleChange(e)}} name="formType" value={newQuestion?.formType} type="select" required=""  placeholder="Form type"  >
            <option value="Short text">Short text</option>
            <option value="Phone number">Phone number</option>
            <option value="Long text">Long text</option>
            <option value="Email">Email</option>
            </Input>            
            {/* <span className='text-danger fw-bolder'>{errors.formType && '* Form Type is required'}</span> */}
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
                </>
              ) : null}
              <div className="d-fle">
              {types[`${newQuestion?.type}`]}
              </div>
          <button type="submit" class="btn btn-info">ADD QUESTION</button>
         </Form>
         </div>
        ) : currentQuestion === "content" ? (
          <AddContent/>
        ) : (
          currentQuestion &&  <EditQuestion />  
        )}
    </div>
  )
}

export default AddQuestion