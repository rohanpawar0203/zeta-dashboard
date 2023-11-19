import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Btn, H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import ChoiceComponent from "./ChoiceComponent";

const MultipleChoice = ({multipleChoice, setMultipleChoice}) => {
    let [choices, setChoices] = useState([]);
    const handleAddOption = (e) => {
      e.preventDefault(); 
      setChoices([...choices, { key: "" }]);
    };

    return (
    <div className="mt-1 w-100 border border-solid border-black">
        <div className="d-flex flex-column">
        {choices.length > 0 &&
          choices.map((el, i) => {
            return (
              <ChoiceComponent
                id={new Date()}
                multipleChoice={multipleChoice}
                setMultipleChoice={setMultipleChoice}
                key={i}
              />
            );
          })}
        </div>
        <Btn  attrBtn={{className: 'px-3 py-2 btn btn-outline btn-light d-flex gap-1 align-items-center my-2', onClick: (e) => {handleAddOption(e)}}}>
        <IoAddCircleOutline style={{width: '22px', height: '22px'}} color="rgb(115,103,240)" />{" "}
        <H5 attrH5={{className: 'my-0 ms-1 d-flex align-items-center', style: {fontSize: '16px'}}}>Add Option</H5>
        </Btn>
    </div>
  )
}

export default MultipleChoice