import React, {useState} from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';
import { NewBot, BotCreationQstn, renameBot} from '../../../Constant';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { BotCreate } from '../../../api';

const UpdateBotFormModal
 = ({modal, title, toggle, getAllBot, botName, botId}) => {
  const [formValues, setformValues] = useState({botName: botName, error: ''});
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const customBot = {
    userId: user._id,
    botName: '',
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
      }
  
  const handleChange = (e) => {
    const {name, value}= e.target;
      setformValues((pre) => (
        {
          ...pre,
         [name] : value,
         error: ''
        }
      ));
  }


  const submitEvent = () => {
    if(!formValues.botName){
      return  setformValues((pre) => ({
          ...pre,
          error: '* Please enter Bot Name!'
        }))
      }else{
        UpdateBot();
      }
  }

  const UpdateBot = async () => {
    try {
       customBot['botName'] = formValues['botName'];
       const response = await fetch(`${BotCreate}/${botId}`, {
        method: "PATCH",
        body: JSON.stringify(customBot),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        getAllBot && getAllBot();
        toggle();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    toggle();
  };
  return (
    <CommonModal isOpen={modal} title={renameBot} toggler={toggle} event={submitEvent}>
      <Form >
        <FormGroup>
          <Label className="col-form-label fw-500 mb-2" for="recipient-name">{BotCreationQstn}</Label>
          <Input className="form-control" type="text" name='botName' onChange={(e) => {handleChange(e)}} defaultValue={formValues?.botName}/>
          {formValues.error && <Label className="fw-bolder mt-2 text-danger">{formValues.error}</Label>}
        </FormGroup>
      </Form>
    </CommonModal>
  )
}

export default UpdateBotFormModal;
