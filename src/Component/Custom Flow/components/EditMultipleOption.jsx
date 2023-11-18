import React, { useEffect, useState } from "react";
import { GetQuestionsContextValues } from "../contexts/QuestionsContext";
import { H1, H4, H5 } from "../../../AbstractElements";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import AddImage from "./AddImage";
import { useForm } from "react-hook-form";
import { AddQuestionAPI } from "../../../api";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const EditMultipleOption = ({
  setMultipleChoice,
  multipleChoice,
  multipleOption,
  setMultipleOption,
}) => {
  const { currentQuestion, quiz } = GetQuestionsContextValues();
  useEffect(() => {
    setMultipleChoice(currentQuestion.choices);
    setMultipleOption(currentQuestion);
  }, [currentQuestion]);

  const handleMultipleOptionChange = (e) => {
    const { value, name } = e.target;
    setMultipleOption({ ...multipleOption, [name]: value });
  };

  const handleMultipleOptionChoice = (e) => {
    const { value, name, id } = e.target;

    const updatedChoices = multipleChoice.map((el) => {
      if (el._id === id) {
        if (value === "" && name === "nextQuestion") {
          let newChoice = {};
          newChoice.title = el.title;
          newChoice.skuId = el.skuId;
          newChoice._id = el._id;
          newChoice.imageUrl = el.imageUrl;
          el = newChoice;
          return el;
        }
        return { ...el, [name]: value };
      }
      return el;
    });
    setMultipleChoice(updatedChoices);
  };

  const handleImageDelete = (id) => {
    const updatedChoices = multipleChoice.map((el) => {
      if (el._id === id) {
        return { ...el, imageUrl: "" };
      }
      return el;
    });
    setMultipleChoice(updatedChoices);
  };
  return (
    <div>
      <FormGroup>
        <Label>{"Title *"}</Label>
        <Input
          onChange={(e) => {
            handleMultipleOptionChange(e);
          }}
          className="form-control"
          name="title"
          value={multipleOption.title || ""}
          placeholder="Enter Question Title"
          type="text"
          required={true}
        />
      </FormGroup>
      <FormGroup>
        <Label>{"Description"}</Label>
        <Input
          onChange={(e) => {
            handleMultipleOptionChange(e);
          }}
          className="form-control"
          name="description"
          value={multipleOption.description || ""}
          type="text"
          placeholder="Enter Description"
        />
      </FormGroup>
      <FormGroup>
        <Label>{"Category"}</Label>
        <Input
          onChange={(e) => {
            handleMultipleOptionChange(e);
          }}
          className="form-control"
          name="category"
          value={multipleOption.category || ""}
          type="text"
          placeholder="Enter Category"
        />
      </FormGroup>
      <div>
        {multipleChoice?.map((el) => (
          <div
            key={el._id}
            style={{ borderBottom: '"1px solid lightgrey' }}
            className="d-flex justify-content-end pb-2 mb-2 align-items-end mt-4"
          >
            <div style={{ width: "80%" }} className="d-flex flex-column"></div>
            <div className="d-flex">
              <div style={{ width: "50%" }}>
                <FormGroup>
                  <Label>{"Option Title *"}</Label>
                  <Input
                    onChange={(e) => {
                      handleMultipleOptionChoice(e);
                    }}
                    className="form-control"
                    id={el._id}
                    placeholder="Enter Option"
                    value={el.title || ""}
                    name="title"
                  />
                </FormGroup>
              </div>

              <div style={{ width: "50%" }} className="mx-2">
                <FormGroup>
                  <Label>{"Choose Image"}</Label>
                  {el.imageUrl !== "" &&
                    (typeof el.imageUrl !== "undefined" ? (
                      <div className="d-flex align-items-center">
                        <img
                          src={el.imageUrl}
                          alt={el.title}
                          style={{
                            width: "45px",
                            height: "120px",
                            border: "1px solid black",
                            objectFit: "cover",
                          }}
                          className="me-3"
                        />
                        <div className="d-flex flex-column gap-2">
                          <AiOutlineEdit
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              let event = {
                                target: {
                                  name: "imageUrl",
                                  value: "",
                                  id: el._id,
                                },
                              };
                              handleMultipleOptionChoice(event);
                            }}
                          />
                          <AiOutlineDelete
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleImageDelete(el._id);
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <AddImage
                        id={el._id}
                        handleMultipleOptionChoice={handleMultipleOptionChoice}
                      />
                    ))}
                </FormGroup>
              </div>
            </div>

            <div className="d-flex mt-1">
              <div style={{ width: "50%" }}>
                <FormGroup>
                  <Label>{"Next Question"}</Label>
                  <Input
                    onChange={handleMultipleOptionChoice}
                    value={el?.nextQuestion?._id}
                    name="nextQuestion"
                    id={el._id}
                    placeholder="Select Next Question"
                    className="form-control"
                    type="select"
                  >
                    {quiz.allQuestions.map((el) => {
                      if (el.questionId._id !== currentQuestion._id) {
                        return (
                          <option
                            key={el.questionId._id}
                            value={el.questionId._id}
                          >
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

              <div style={{ width: "50%" }} className="mx-2">
                <FormGroup>
                  <Label>{" Sku Id "}</Label>
                  <Input
                    onChange={handleMultipleOptionChoice}
                    name="skuId"
                    value={el.skuId || ""}
                    placeholder="Enter SKU ID"
                    id={el._id}
                  ></Input>
                </FormGroup>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditMultipleOption;
