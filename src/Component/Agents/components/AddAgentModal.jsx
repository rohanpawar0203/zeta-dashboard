import React from 'react'
import { Btn, H5 } from '../../../AbstractElements'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AgentAPI } from '../../../api';
const AddAgentModal = ({modal, toggle, handleGetData}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({});
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");

    const onSubmit = data => {
        if (data !== '') {
          createAgent({...data, userId: user?._id,});
        } else {
          errors.showMessages();
        }
      };
    
      const createAgent = async (value) => {
        try {
          let data = JSON.stringify(value);
          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${AgentAPI}/add`,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            data: data,
          };
          await axios
            .request(config)
            .then(async (response) => {
              reset();
              handleGetData();
              toggle();
              toast.success("Registered successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          toast.error("Something went wrong");
          toggle();
          toast.error(`${error.response.data.error}`);
        }
      };

    return (
        <CommonModal isOpen={modal} title={'Create Agent'} toggler={toggle}  submitTxt={'Create Agent'}>
          <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup >
            <Label>{'Agent Name *'}</Label>
            <input className="form-control" name="name" type="text" placeholder="Agent Name" {...register('name', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.name && '* Agent Name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Email address *'}</Label>
            <input className="form-control" name="email" type="text" placeholder="Email Address" {...register('email', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.email && '* Email Address is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Password *'}</Label>
            <input className="form-control" name="password" type="password" placeholder="Password" {...register('password', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.password && '* Password is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <Btn attrBtn={{ color: 'primary' }}>{'Create Agent'}</Btn>
      </Form>
        </CommonModal>
      )
}

export default AddAgentModal