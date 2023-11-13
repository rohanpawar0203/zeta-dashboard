import React from 'react'
import { GetQuestionsContextValues } from '../contexts/QuestionsContext';
import { H1, H4, H5 } from '../../../AbstractElements';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { useForm } from 'react-hook-form';

const AddQuestion = () => {
    const { currentQuestion, setCurrentQuestion, quiz, setQuiz}  = GetQuestionsContextValues();

    const { register, handleSubmit, formState: { errors } } = useForm({
    });
    
    const onSubmit = data => {
      if (data !== '') {
        alert('yes');
      } else {
        errors.showMessages();
      }
    };

  return (
    <div>
        {currentQuestion === 'add new' ? 
        (
         <div>
            <H4 attr4={{className: 'my-2'}}>
                <u>Add New Question</u>
            </H4>
            <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup >
            <Label>{'Question Type *'}</Label>
            <Input name="type" type="select" required="" placeholder="Select type"  {...register('type', { required: true })}>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Single Input">Single Input</option>
            </Input>            
            <span className='text-danger fw-bolder'>{errors.title && '* Question Type is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Title *'}</Label>
            <Input className="form-control"  name="title"
                  placeholder="Enter Question Title" type="text"  {...register('title', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.title && '* Title is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Description'}</Label>
            <Input className="form-control"  name="description" type="text" placeholder="Enter Description" {...register('description', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.description && '* Description is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <button type="submit" class="btn btn-info">ADD QUESTION</button>
         </Form>
         </div>
        ): 
        ''}
    </div>
  )
}

export default AddQuestion