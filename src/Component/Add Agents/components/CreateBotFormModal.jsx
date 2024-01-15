import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import CommonModal from "../../../_core/Ui-kits/Modals/common/modal";
import { NewBot, BotCreationQstn } from "../../../Constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BotCreate } from "../../../api";

const CreateBotForm = ({ modal, title, toggle }) => {
  const [formValues, setformValues] = useState({ botName: "", error: "" });
  const [submitLoader, setsubmitLoader] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const customBot = {
    userId: user._id,
    botName: "",
    companyName: "Ulai",
    botAvatar:
      "https://writesonic-frontend.s3.us-east-1.amazonaws.com/frontend-assets/templates-new/BotsonicNew.png",
    companyLogo:
      "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png",
    bubbleIcon: "BiBot",
    accentColor: "#705CF6",
    subheading: "Our bot answers instantly",
    welcomeMessage: "Hey there, how can I help you?",
    inputPlaceholder: "Send a message...",
    showFloating: true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues((pre) => ({
      ...pre,
      [name]: value,
      error: "",
    }));
  };

  const submitEvent = () => {
    if (!formValues.botName) {
      return setformValues((pre) => ({
        ...pre,
        error: "* Please enter Bot Name!",
      }));
    } else {
      createBot();
    }
  };

  const createBot = async () => {
    setsubmitLoader(true);
    try {
      customBot["botName"] = formValues["botName"];
      const response = await fetch(BotCreate, {
        method: "POST",
        body: JSON.stringify(customBot),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        setsubmitLoader(false);
        toggle();
        history(`${process.env.PUBLIC_URL}/dashboard`);
      } else {
        setsubmitLoader(false);
        toast.error(responseData.message);
      }
    } catch (error) {
      setsubmitLoader(false);
      toast.error(error);
    }
    toggle();
  };
  return (
    <CommonModal
      isOpen={modal}
      title={NewBot}
      toggler={toggle}
      event={submitEvent}
    >
      <Form>
        <FormGroup>
          <Label className="col-form-label fw-500 mb-2" for="recipient-name">
            {BotCreationQstn}
          </Label>
          <Input
            className="form-control"
            type="text"
            name="botName"
            onChange={(e) => {
              e.preventDefault();
              if(e.key === 'Enter'){
                submitEvent();
              }else{
                handleChange(e);
              }
            }}
            // onKeyDown={(e) => {
            //   e.preventDefault();
            //   if(e.key === 'Enter'){
            //     submitEvent();
            //   }
            // }}
            placeholder="Bot Name..."
          />
          {formValues.error && (
            <Label className="fw-bolder mt-2 text-danger">
              {formValues.error}
            </Label>
          )}
        </FormGroup>
      </Form>
    </CommonModal>
  );
};

export default CreateBotForm;
