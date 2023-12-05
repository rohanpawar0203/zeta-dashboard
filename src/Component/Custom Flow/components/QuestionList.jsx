import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import { GetContextAPI } from "../../../api";
import { Badges, H4, H5, LI, UL } from "../../../AbstractElements";
const QuestionList = ({contextID}) => {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
  const { quiz, setQuiz, setCurrentQuestion} = GetQuestionsContextValues();
  console.log(quiz?.allQuestions);
  return (
    <UL>
        {
            quiz?.allQuestions?.map((ele) => (
        <QuestionListItem  key={ele?._id} item={ele?.questionId}/>
        ))
        }
    </UL>
  );
}

export default QuestionList

const QuestionListItem = ({item}) => {
    const { quiz, setQuiz, setCurrentQuestion, currentQuestion} = GetQuestionsContextValues();

    return (
     <LI attrLI={{ className: 'w-100 list-group-item-action d-flex justify-content-between align-items-start', style: {cursor: 'pointer'}, onClick: () => {setCurrentQuestion(item)}}} >
      <div className="d-flex flex-column gap-1">
      <H4 attrH4={{className: 'mt-0 mb-1 mx-0'}}>{item?.title}</H4>
      <H5 attrH5={{className: 'mx-0'}}>{item?.description}</H5>
      </div>
      <div>
      <Badges attrBadge={{ color: 'success txt-white', className: 'p-2'}}  >{item?.type}</Badges>
      </div>
     </LI>
    );
}