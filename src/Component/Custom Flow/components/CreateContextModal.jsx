import React, {useEffect, useState} from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';
import { NewBot, BotCreationQstn} from '../../../Constant';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { AgentAPI, BotCreate, CreateContextAPI, ProductsListAPI } from '../../../api';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateContextModal = ({modal, title, toggle, setData}) => {
  const [formValues, setformValues] = useState({botName: '', error: ''});
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");
  const history = useNavigate();
   


  const { register, handleSubmit, formState: { errors } } = useForm({
  });
  
  const onSubmit = data => {
    if (data !== '') {
      submitHandler(data);
    } else {
      errors.showMessages();
    }
  };

 
const submitHandler = async (payload) => {
  const response = await axios
  .post(`${CreateContextAPI}/${user._id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    console.log(res.data.data);
    setData(res.data.data);
    toast.success("Context created successfully");
    toggle();
  })
  .catch((err) => {
    toast.error("Something went wrong");
  });
  };

  return (
    <CommonModal isOpen={modal} title={NewBot} toggler={toggle} event={handleSubmit(onSubmit)} submitTxt={'Create'}>
      <Form className="needs-validation" noValidate="">
          <FormGroup >
            <Label>{'Context Name'}</Label>
            <input className="form-control"  name="title" type="text" placeholder="Enter name" {...register('title', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.title && '* Context Name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Type'}</Label>
            <input className="form-control"  name="type" type="text" placeholder="Enter context Type" {...register('type', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.type && '* Context type is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Description'}</Label>
            <input className="form-control"  name="description" type="text" placeholder="Enter Description" {...register('description', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.description && '* Description is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
      </Form>

    </CommonModal>
  )
}

export default CreateContextModal