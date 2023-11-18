import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import ChoiceComponent from "./ChoiceComponent";

const MultipleChoice = ({multipleChoice, setMultipleChoice}) => {
    let [choices, setChoices] = useState([]);
    const handleAddOption = () => {
      setChoices([...choices, { key: "" }]);
    };

    return (
    <div className="mt-1 w-100">
        <div className="flex flex-column">
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
        <div onClick={handleAddOption} style={{cursor: 'pointer'}} className="flex flex-column mt-2 align-items-center">
        <IoAddCircleOutline color="rgb(115,103,240)" />{" "}
        <H5 attrH5={{className: 'ms-1'}}>Add Option</H5>
        </div>
    </div>
  )
}

export default MultipleChoice