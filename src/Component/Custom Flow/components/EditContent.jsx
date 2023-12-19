import React, { useState, useEffect } from "react";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import { Btn, H1, H4, H5 } from "../../../AbstractElements";
import { Form, FormGroup, Input, Label } from "reactstrap";

const EditContent = ({
  setContent,
  content,
  contetChoice,
  setContentChoice,
}) => {
  const { currentQuestion, quiz } = GetQuestionsContextValues;
  useEffect(() => {
    setContentChoice({
      ...currentQuestion.choices[0],
      nextQuestion: currentQuestion?.choices[0]?.nextQuestion?._id,
    });
    setContent(currentQuestion);
  }, [currentQuestion]);

  const handleContentChange = (e) => {
    const { value, name } = e.target;
    setContent({ ...content, [name]: value });
  };

  const handleContentChoice = (e) => {
    const { value, name } = e.target;
    if (value === "" && name === "nextQuestion") {
      let newChoice = {};
      setContentChoice(newChoice);
      return;
    }
    setContentChoice({ ...setContentChoice, [name]: value });
  };
  return (
    <div>
      <div>
        <FormGroup>
          <Label>{" Heading *"}</Label>
          <Input
            className="form-control"
            placeholder="Enter heading"
            name="title"
            value={content.title || ""}
            onChange={handleContentChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>{"Sub Heading "}</Label>
          <Input
            className="form-control"
            placeholder="Enter sub heading"
            name="category"
            value={content.category || ""}
            onChange={handleContentChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>{"Content"}</Label>
          <Input
            name="description"
            className="form-control"
            placeholder="Enter content"
            value={content.description || ""}
            onChange={handleContentChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>{"Form Type"}</Label>
          <Input
            className="form-control"
            name="formType"
            onChange={handleContentChange}
            value={content.formType || ""}
            type="select"
          >
            <option value="Welcome Page">Welcome Page</option>
            <option value="Thank You Page">Thank You Page</option>
            <option value="Information Page">Information Page</option>
          </Input>
        </FormGroup>
        {content.formType === "Thank You Page" && (
          <>
            <FormGroup>
              <Label>{">Total CTA"}</Label>
              <Input
                name="totalCta"
                onChange={handleContentChange}
                value={content.totalCta || ""}
                className="form-control"
                type="select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>{" Enter CTA_1 link "}</Label>
              <Input
                className="form-control"
                onChange={handleContentChange}
                name="cta_1_link"
                value={content.cta_1_link || ""}
                placeholder="Enter CTA link "
              />
            </FormGroup>
            <FormGroup>
              <Label>{" Enter CTA_1 Text"}</Label>
              <Input
                className="form-control"
                onChange={handleContentChange}
                name="cta_1_text"
                value={content.cta_1_text || ""}
                placeholder="Enter CTA_1 Text "
              />
            </FormGroup>
            {content.totalCta === "2" && (
              <>
                <FormGroup>
                  <Label>{"Enter CTA_2 link"}</Label>
                  <Input
                    className="form-control"
                    onChange={handleContentChange}
                    name="cta_2_link"
                    value={"ATC" || ""}
                    placeholder="ATC"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>{"Enter CTA_2 Text"}</Label>
                  <Input
                    className="form-control"
                    onChange={handleContentChange}
                    name="cta_2_text"
                    value={content.cta_2_text || ""}
                    placeholder="Enter CTA_2 Text "
                  />
                </FormGroup>
              </>
            )}
          </>
        )}

        <div className="d-flex mt-3">
          <div style={{ width: "50%" }}>
            <FormGroup>
              <Label>{"Next Question"}</Label>
              <Input
                onChange={handleContentChoice}
                value={contetChoice?.nextQuestion}
                name="nextQuestion"
                placeholder="Select Next Question"
                className="form-control"
                type="select"
              >
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
        </div>
      </div>
    </div>
  );
};

export default EditContent;
