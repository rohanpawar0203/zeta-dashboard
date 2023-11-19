import React, { useState } from 'react'
import { Btn, H1, H4, H5, Image } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, useToast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import AddImage from './AddImage';

const ChoiceComponent = ({setMultipleChoice, multipleChoice, id}) => {
  const [status, setStatus] = useState("add");
  const [singleChoice, setSingleChoice] = useState({ id: id, saved: false });
  const { quiz, currentQuestion } = GetQuestionsContextValues();
  
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (value === "" && name === "nextQuestion") {
      let newChoice = {};
      newChoice.title = singleChoice.title;
      newChoice.skuId = singleChoice.skuId;
      setSingleChoice(newChoice);
      return;
    }
    setSingleChoice({ ...singleChoice, [name]: value });
  };

  const handleAdd = () => {
    if (singleChoice.title === "" || !singleChoice.title) {
      toast.error( "Option content cannot be empty");
      return;
    }
    setStatus(status === "add" ? "edit" : "add");
    if (!singleChoice.saved) {
      setMultipleChoice([...multipleChoice, singleChoice]);
      setSingleChoice({ ...singleChoice, saved: !singleChoice.saved });
    } else {
      const editedChoice = multipleChoice.map((el) => {
        if (el.id === id) {
          return singleChoice;
        }
        return el;
      });
      setMultipleChoice(editedChoice);
    }
  };

  const handleEdit = () => {
    setStatus(status === "add" ? "edit" : "add");
  };

  const handleImageDelete = () => {
    setSingleChoice({ ...singleChoice, imageUrl: "" });
  };

  return (
    <div className='w-100 d-flex align-items-center'>
        <div style={{width: '100%'}} className='d-flex flex-column'>
        <div className='d-flex'>
         <div className='w-50'>
         <FormGroup>
            <Label>{'Title *'}</Label>
            <Input onChange={(e) => {handleChange(e)}} name="title"
              placeholder="Enter content"
              isDisabled={status === "edit"} >
            </Input>            
          </FormGroup>
         </div>
         <div className='w-50 mx-2'>
         <FormGroup>
            <Label>{'Choose Image'}</Label>
             {
                singleChoice.imageUrl !== "" && typeof singleChoice.imageUrl !== "undefined" ?
                <div className='d-flex align-items-center'>
                 <img src={singleChoice.imageUrl}
                  alt={singleChoice.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    border:"1px solid lightgray",
                    objectFit: 'cover'
                  }}
                  className='me-3'
                  />
                  <div className='d-flex flex-column gap-2'>
                  <AiOutlineEdit
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      let event = {
                        target: {
                          name: "imageUrl",
                          value: "",
                          id: "",
                        },
                      };
                      handleChange(event);
                    }}
                  />
                  <AiOutlineDelete
                    style={{cursor: 'pointer'}}
                    onClick={handleImageDelete}
                  />
                  </div>
                </div> : 
                <AddImage id={""} handleMultipleOptionChoice={handleChange} status={status} />
             }
          </FormGroup>
         </div>
        </div> 
        <div className='d-flex mt-1'>
        <div className='w-auto'>
        <FormGroup>
            <Label>{'Next Question'}</Label>
            <Input  isDisabled={status === "edit"}
              onChange={handleChange}
              name="nextQuestion"
              placeholder="Select next question"  type='select'>
              <option value="">Select next question</option>
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
        </div>

        <div className='w-auto mx-2'>
        <FormGroup>
            <Label>{' Sku Id '}</Label>
            <Input onChange={(e) => {handleChange(e)}}  name="skuId"
              placeholder="SKU Id"
              isDisabled={status === "edit"} >
            </Input>            
          </FormGroup>
        </div>
         
        <div style={{width: 'auto'}} className='d-flex flex-column align-items-center  justify-content-end'>
        {status === "add" ? (
           <FormGroup>
           <Label>{' '}</Label>
           <Btn
            attrBtn={{
              color: "info",
              size: "md",
              active: true,
              disabled: false,
              outline: true,
              onClick: () => {handleAdd()},
              className: 'py-2 px-3 my-0'
            }}
          >
            {'Add Option'}
          </Btn>
         </FormGroup>
           
        ) : (
          <FormGroup>
          <Label>{' '}</Label>
            <Btn
            attrBtn={{
              color: "success",
              size: "md",
              active: true,
              disabled: false,
              outline: true,
              onClick: () => {handleEdit()},
              className: 'py-2 px-3 my-0'
            }}
          >
            {'Edit Option'}
          </Btn>
          </FormGroup>
        ) }
        </div>

        </div> 
        </div>

        
    </div>
  )
}

export default ChoiceComponent