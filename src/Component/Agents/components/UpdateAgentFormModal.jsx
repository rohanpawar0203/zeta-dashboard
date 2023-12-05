import React, {useEffect, useState} from 'react'
import { Form, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';
import { NewBot, BotCreationQstn} from '../../../Constant';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { AgentAPI, BotCreate, ProductsListAPI } from '../../../api';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UpdateAgentFormModal = ({modal, title, toggle, agentUpdatePayload, fetchAgentsData, setagentUpdatePayload, agentID}) => {
  const [formValues, setformValues] = useState({botName: '', error: ''});
  const [togglePassword, setTogglePassword] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
   


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      ...agentUpdatePayload
    }
  });
  
  const onSubmit = data => {
    console.log('data ', data);
    if (data !== '') {
      submitHandler(data);
    } else {
      errors.showMessages();
    }
  };

 
const submitHandler = async (values) => {
    try {
        const body = {
          ...values,
        };
        if (body.password === "") delete body.password;
        console.log('body ', body);
        const res = await axios.patch(
          `${AgentAPI}/${agentID}`,
          {
            data: body,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        if(res['status'] === 200 || res['status'] === "200") {
          fetchAgentsData();
          toggle();
          toast.success('Agent updated successfully');
        } else {
          toast.error(res.data.message);
        }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <CommonModal isOpen={modal} title={'Edit Agent'} toggler={toggle} event={handleSubmit(onSubmit)}>
      <Form className="needs-validation" noValidate="">
          <FormGroup >
            <Label>{'Agent Name'}</Label>
            <input className="form-control" defaultValue={agentUpdatePayload?.name} name="name" type="text" placeholder="Agent Name" {...register('name', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.name && '* Agent Name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Email address'}</Label>
            <input className="form-control" defaultValue={agentUpdatePayload?.email} name="email" type="text" placeholder="Email Address" {...register('email', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.email && '* Email Address is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'New Password'}</Label>
            <InputGroup>
                <input 
                  className="form-control"
                  defaultValue={agentUpdatePayload?.password}
                  name="password"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                <div
                  className="show-hide h-100"
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  <span className={togglePassword ? "Hide" : "show"}></span>
                </div>
              </InputGroup>
            <span className='text-danger fw-bolder'>{errors.password && '* Password is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          
      </Form>
    </CommonModal>
  )
}

export default UpdateAgentFormModal