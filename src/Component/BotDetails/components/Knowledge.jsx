import React, { Fragment, useEffect, useState } from 'react'
import {
  CardBody,
  CardHeader,
  Card,
  Col,
  Container,
  Row,
  Label,
  Input,
  FormGroup,
  InputGroupText,
  InputGroup,
  Form,
  Table,
  Spinner,
} from "reactstrap";
import { Btn, H3, H5, H6, Image } from "../../../AbstractElements";
import EmbedBot from './EmbedBot';
import EmbedIframe from './EmbedIframe';
import GetRestAPI from './GetRestAPI';
import Integrations from './Integrations';
import { useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import { FAQFilesAPI, User } from '../../../api';
import { toast } from 'react-toastify';
import { v4 as uuid } from "uuid";

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');

const Knowledge = ({myBot}) => {
const [shareTabs, setshareTabs] = useState(['Embed the bot', 'Embed Iframe', 'Get Rest API', 'Integrations']);
const [selectedTab, setselectedTab] = useState('Embed the bot');
const [loading, setLoading] = useState(false);
const [mode, setMode] = useState('')
const [faqList, setFaqList] = useState([]);

useEffect(() => {
  if(userData?.faqListURL){
    setFaqList([...userData?.faqListURL]);
  }
}, []);


  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card className="shadow-none">
              <CardHeader className="p-0 mx-0 mt-2 d-flex flex-wrap w-100 justify-content-between">
                <H6 className='my-2 mx-0'>Please Upload CSV File</H6>
                <Btn attrBtn={{ color: 'success', type: 'submit', onClick: () => {setMode('create')}}}>{'Add CSV'}</Btn>
              </CardHeader>
              <CardBody className="p-0 m-0 pt-2">
                <Col sm='12' md='8'>
                <Fragment>
                 <div style={{height: '400px'}}>
                  {loading ? 
                  <div className="loader-box">
                  <Spinner attrSpinner={{ className: 'loader-3' }} /> 
                  </div> : 
                  mode === 'create' ? 
                  < AddCSVForm setMode={setMode} mode={mode} loading={loading} setLoading={setLoading} faqList={faqList} setFaqList={setFaqList}/> :
                  (faqList && faqList.length > 0) ? 
                  <CSVFileInfoList faqList={faqList} setFaqList={setFaqList} setLoading={setLoading}/> :
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <H6 className='my-2 mx-0'>No Files Uploaded</H6>
                  </div>
                  }
                 </div>
                </Fragment>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

const AddCSVForm = ({setMode, mode, setLoading, loading, faqList, setFaqList}) => {
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm({});
  const [csvFile, setCsvFile] = useState('');
  const [csvValidation, setcsvValidation] = useState(false);
  const [csvError, setCsvError] = useState('')
  const {fileName} = getValues();

  const onSubmit = data => {
    if(!csvFile){
      setCsvError('');
      setcsvValidation(true);
    }
    else if(data !== '') {
      // createTicket({...payload, ...data, userId: user?._id});
     const formData = new FormData();
     formData.append('companyName', userData?.companyName);
     formData.append('', csvFile);
     console.log('userData ', userData);
     console.log('formData ', formData);
     uploadCSVFile(formData);
    } else {
      errors.showMessages();
    }
  };

  const handleChangeStatus = ({ meta, file }, status) => { 
    setcsvValidation(false);
    setCsvError('');
    const acceptedFileExtensions = [".csv"];
  
    // Check if the file extension is allowed
    if (!acceptedFileExtensions.some(ext => file.name.endsWith(ext))) {
      setcsvValidation(false);
      return  setCsvError('* Invalid file type')
    }
    if(meta?.status === "removed"){
      setCsvFile(null);
    }else{
      setCsvFile(file);
    }
  };

  const uploadCSVFile = async (formData) => {
    try {
      const res = await axios.post( `${FAQFilesAPI}`, formData, {
      headers: {
    'Content-Type': 'multipart/form-data',
    },
    })
    const responseUrl = await res?.data?.filenames[0];
     if(responseUrl){
      updateUser(responseUrl, fileName);
     }
    } catch (error) {
      toast.error('File Upload Failed');
      console.log('csv upload error ', error);
     }
  };

  const updateUser = async (responseUrl, fileName) => {
    console.log('responseUrl', responseUrl);
    console.log('fileName', fileName);
    setLoading(true);
    try {
      const response = await fetch(`${User}/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData,
          faqListURL : [...faqList, {fileName: fileName, fileURL: responseUrl, id: uuid()}]
        })
      });
      const responseData = await response.json();
      if (response.ok) {
        
        // console.log(response.ok);
        console.log("updateUser", responseData?.updateUser);
        sessionStorage.setItem("currentUser", JSON.stringify(responseData.updateUser));
        setFaqList([...responseData?.updateUser?.faqListURL.map((ele) => ({
          ...ele, id: uuid()
        }))]);
        reset();
        setCsvFile('');
        setcsvValidation(false);
        setCsvError('');
        setMode('');
        toast.success(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

return (
  <Fragment>
    <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>{'File Name *'}</Label>
                <input className="form-control" name="fileName" type="text" placeholder="File Name"
                {...register('fileName', { required: true })} />
                <span className='text-danger fw-bolder'>{errors.fileName && '* File Name is required'}</span>
                <div className="valid-feedback">{'Looks good!'}</div>
              </FormGroup>
              <FormGroup>
                <Label>{'Attach CSV File *'}</Label>
                <Label>{'We support only a single CSV or Excel file (with 1 sheet) up to 5 MB in size.'}</Label>
              <Dropzone
                className="dropzone"
                accept=".csv"
                onChangeStatus={handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={true}
                canRemove={true}
                inputContent="Click to upload a file or drag and drop it here"
              />
                <span className='text-danger fw-bolder'>{csvValidation && '* CSV file is required'}</span>
                <span className='text-danger fw-bolder'>{csvError && csvError}</span>
              </FormGroup>
              <div className='d-flex gap-4 align-items-center justify-content-start'>
              <Btn attrBtn={{ color: 'primary', type: 'submit'}}>{'Add CSV'}</Btn>
              <Btn attrBtn={{ color: 'danger', type: 'button', onClick: () => {setMode('')}}}>{'Cancel'}</Btn>
              </div>
          </Form>
  </Fragment>
)
}


const CSVFileInfoList = ({faqList, setFaqList, setLoading}) => {

  const handleCSVFileDelete = (id) => {
    console.log('delete id', id);
    let filteredList = faqList?.filter((item) => (item.id !== id));
    console.log('filteredList', filteredList);
    updateUser(filteredList);
  }

  const updateUser = async (filteredList) => {
    setLoading(true);
    try {
      const response = await fetch(`${User}/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...userData,
          faqListURL : [...filteredList]
        })
      });
      const responseData = await response.json();
      if (response.ok) {
        sessionStorage.setItem("currentUser", JSON.stringify(responseData.updateUser));
        setFaqList([...responseData?.updateUser?.faqListURL]);
        toast.success('File removed successfully');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="h-100 table-responsive">
    <Table>
      <thead>
        <tr className='table-primary'>
          <th scope="col">{'File Name'}</th>
          <th scope="col">{'Delete'}</th>
        </tr>
      </thead>
      <tbody>
        { faqList?.length > 0 && 
        faqList?.map((ele, ind) => (
          <tr key={ele?.id}> 
          <td>{ele?.fileName ? ele?.fileName : 'NA'}</td>
          <td>
          <button className='btn btn-danger' onClick={() =>  {handleCSVFileDelete(ele?.id)}}>Delete CSV</button>
          </td>
        </tr>
        ))
        }
      </tbody>
      </Table> 
    </div> 
  )
}

export default Knowledge;