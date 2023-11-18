import axios from "axios";
import React, { useContext, useState } from "react";
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { Btn, H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { DeleteQuestionAPI, EditQuestionAPI } from '../../../api';
import DeleteQuestionModal from "./DeleteQuestionModal";
import EditMultipleOption from "./EditMultipleOption";
import EditSingleInput from "./EditSingleInput";
import EditContent from "./EditContent";

const validateMultipleOptionChoices = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title === "") {
        return false;
      }
    }
    return true;
  };
const EditQuestion = () => {
    const token = localStorage.getItem('token');
  const { currentQuestion, quiz, setQuiz, setCurrentQuestion } = GetQuestionsContextValues();
  const [multipleChoice, setMultipleChoice] = useState([]);
  const [singleInputChoice, setSingleInputChoice] = useState();
  const [singleInput, setSingleInput] = useState([]);
  const [multipleOption, setMultipleOption] = useState([]);
  const [content, setContent] = useState([]);
  const [contetChoice, setContentChoice] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const imgArr = [];
  currentQuestion &&
    (() => {
      currentQuestion.images = imgArr;
    })();
  // currentQuestion ? (currentQuestion.images = imgArr) : null;
  const handleUpdateQuestion = () => {
    let payload = {};
    if (currentQuestion.type == "Single Input") {
      payload = {
        ...singleInput,
        choices: [{ ...singleInputChoice }],
      };
      if (payload.title === "" || payload.formType === "") {
        toast.error("Please enter mandatory fields");
        return;
      }
    } else if (currentQuestion.type === "Multiple Choice") {
      payload = {
        ...multipleOption,
        choices: multipleChoice,
      };
      if (
        payload.title === "" ||
        !validateMultipleOptionChoices(payload.choices)
      ) {
        toast.error("Please enter mandatory fields");
        return;
      }
    } else if (currentQuestion.type === "Content Page") {
      payload = {
        ...content,
        choices: [contetChoice],
      };
      if (payload.title === "") {
        toast.error("Please enter mandatory fields");
        return;
      }
    }
    axios.patch(
        `${EditQuestionAPI}/${currentQuestion._id}`,
        { data: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Question updated successfully");
        setQuiz(res.data.data);
        setCurrentQuestion(null);
      })
      .catch((err) => {
        toast.success({title: err.response.data.error,
        description: "Something went wrong"});
      });
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(
        `${DeleteQuestionAPI}/${currentQuestion._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success({
          description: "Question removed successfully",
          position: "top",
          isClosable: true,
          duration: 4500,
        });
        setQuiz(res.data.data);
        setCurrentQuestion(null);
      })
      .catch((err) => {
        console.log(err);
        toast.success({
          title: err.response.data.error,
          description: "Something went wrong",
          status: "error",
          position: "top",
          isClosable: true,
          duration: 4500,
        });
      });
  };
  return (
        <div className="w-100 h-100 custom-scrollbar"> 
            <Form className="needs-validation" noValidate="" onSubmit={() => {handleUpdateQuestion()}}>
            <H5>
            <u>
          {currentQuestion?.type === "Single Input" ||
          currentQuestion?.type === "Multiple Choice"
            ? "Edit Question"
            : "Edit Content Page"}
            </u>
        </H5>
        {currentQuestion?.type === "Single Input" ? (
          <EditSingleInput
            setSingleInput={setSingleInput}
            setSingleInputChoice={setSingleInputChoice}
            singleInput={singleInput}
            singleInputChoice={singleInputChoice}
          />
        ) : currentQuestion?.type === "Multiple Choice" ? (
          <EditMultipleOption
            setMultipleChoice={setMultipleChoice}
            multipleChoice={multipleChoice}
            multipleOption={multipleOption}
            setMultipleOption={setMultipleOption}
          />
        ) : currentQuestion?.type === "Content Page" ? (
          <EditContent
            setContent={setContent}
            content={content}
            contetChoice={contetChoice}
            setContentChoice={setContentChoice}
          />
        ) : null}
            <div className="d-flex gap-2 justify-content-end">
                <DeleteQuestionModal 
                modal={modal}
                title={'Delete Question'} 
                toggle={toggle} 
                event={() => {handleDeleteQuestion(currentQuestion._id)}} />
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
            {'UPDATE QUESTION'}
          </Btn>
            </div>
            </Form>
         </div>
  );
  }

export default EditQuestion