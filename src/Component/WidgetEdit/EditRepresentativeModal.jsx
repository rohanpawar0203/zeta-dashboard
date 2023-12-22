import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Btn, H5, Image } from '../../AbstractElements';
import { Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { getUserDetails } from '../../Services/UsersServices';
import { FileServerAPI, UploadCompanyLogoAPI } from '../../api';

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');

const EditRepresentative = ({template, setTemplate, avatarID, setrepEditMode}) => {
     const [companyLogoFile, setcompanyLogoFile] = useState('');
     const [avtProfile, setAvtProfile] = useState({...template?.popup?.persons?.find((ele) => (ele.id === avatarID))})
     const [companyLogoURL, setcompanyLogoURL] = useState('')
     const companayLogoRef = useRef('')
     const [companyLogoMode, setCompanyLogoMode] = useState('logo');
    const handleTemplateChange = (e, value, key, property) => {
        e.preventDefault();
        setTemplate((pre) => {
            let personsArr = pre?.popup?.persons;
           let result =  personsArr.map((ele, ind) => {
                let item;
                if(ele?.id === avatarID){
                    item = {...ele, [key]: {...ele[key], [property]: value}}
                }else{
                    item = ele;
                }
                return item;
            })
            console.log('result  ', {...pre, popup: {...pre?.popup, persons: [...result]}});
            return {...pre, popup: {...pre?.popup, persons: [...result]}}
        })
    }

    const uploadCompanyLogo = async () => {
        try {
         const formData = new FormData();
         formData.append('companyName', userData?.companyName?.replaceAll(" ", "-"));
         const modifiedFileName = companyLogoFile.name.replaceAll(" ", "-");
         formData.append('companyLogo', companyLogoFile, modifiedFileName);
          const res = await axios.post( `${UploadCompanyLogoAPI}`, formData, {
          headers: {
        'Content-Type': 'multipart/form-data',
        },
        })
        const responseUrl = await res?.data?.filenames[0];
         if(responseUrl){
          setcompanyLogoURL(responseUrl);
          getUserDetails(userData?._id);
          let imgElement = document.createElement('img');
          let urlString = FileServerAPI+'/'+ responseUrl;
          imgElement.src = `${urlString}`;
          imgElement.alt = '';
          let evnt = new Event('click');
          handleTemplateChange(evnt, imgElement?.outerHTML, 'avatar', 'src');
         }
        } catch (error) {
          toast.error('File Upload Failed');
          console.log('csv upload error ', error);
         }
      };

useEffect(() => {  
var htmlString = avtProfile?.avatar?.src;
var parser = new DOMParser();
var doc = parser.parseFromString(htmlString, 'text/html');
var imgElement = doc.querySelector('img');
companayLogoRef.current = imgElement.getAttribute('src');
setcompanyLogoURL(imgElement.getAttribute('src'))
    }, [template])
    

  return (
    <Fragment>
    <Form className="needs-validation" noValidate="" onSubmit={() => {}}>
                   <Row>
                    <Col md="4 mb-3">
                        <div className="d-flex gap-2 align-items-center">
						<input style={{cursor:'not-allowed', color: 'maroon'}}
                          className="form-control"
                          name="avatarBackgroundColor"
                          value={"Avatar : " + avtProfile?.text?.title}
                          disabled={true}
                        />
						</div>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    </Row>
                  <Row>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar background Color"}
                      </Label>
                        <div className="d-flex gap-2 align-items-center">
						<select 
                          className="form-control"
                          name="avatarBackgroundColor"
                          value={`Select background Color`}
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'avatar', 'backgroundColor')}}
                          placeholder="Avatar background Color"
                          required={true}
                        >
							<option style={{width: '15px',height: '15px'}} value={''}>Select background Color</option>
						{['#7B241C', '#4A235A', '#0B5345', '#145A32', '#7B7D7D', '#F1C40F', '#424949'].map((ele, ind) => (
							<option style={{width: '15px',height: '15px', borderRadius: '50%', backgroundColor: ele}} value={ele}></option>
						))}
						</select>
						</div>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>

                    <Col md="4 mb-3">
                    <Label htmlFor="validationCustom01">
                        {"Avatar Online Circle"}
                      </Label>
                        <select 
                          className="form-control"
                          name="avatarOnlineCircle"
                          defaultValue={
                            template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.avatar?.onlineCircle}
                            onChange={(e) => {handleTemplateChange(e, (e.target.value === 'true') ? true: false, 'avatar', 'onlineCircle')}}
                          required={true}
                        >
							<option value={''}>Decide online Circle Presence</option>
						{[true, false].map((ele, ind) => (
							<option value={ele}>{ele ? 'Yes' : 'No'}</option>
						))}
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row> 

                  <Row>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar title"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarTitle"
                          type="text"
                          defaultValue={template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.text?.title}
						  placeholder="Avatar title"
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'text', 'title')}}
                          required={true}
                        />
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar description"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatardescription"
                          type="text"
                          defaultValue={template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.text?.description}
						  placeholder="Avatar description"
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'text', 'description')}}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    
                  </Row>

                  <Row>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar online description tag"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarOnlineDesTag"
                          type="text"
                          defaultValue={template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.text?.online}
						  placeholder="Avatar online description tag"
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'text', 'online')}}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar desktop link"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarDesktopLink"
                          type="url"
                          defaultValue={template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.link?.desktop}
						  placeholder="Avatar desktop link"
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'link', 'desktop')}}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row>

                  <Row>
                  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Avatar mobile link"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarMobileLink"
                          type="url"
                          defaultValue={template?.popup?.persons?.find((ele) => (ele.id === avatarID))?.link?.mobile}
						  placeholder="Avatar mobile link"
                          onChange={(e) => {handleTemplateChange(e, e.target.value, 'link', 'mobile')}}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      {companyLogoURL && companyLogoMode==='logo' ? 
                       <span>
                        <Label htmlFor="validationCustom01">
                        {"Company Logo"}
                      </Label>
                      <div className="avatar d-flex align-items-center gap-3">
                        <Image attrImage={{ body: true, className: 'img-100  border border-2 border-info', src: companyLogoURL, alt: '#', style: {objectFit: 'cover', borderRadius: '6px'}}} />
                      <div className="status status-30"></div>
                      <FaRegEdit style={{width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => {setCompanyLogoMode('edit')}}/>
                      </div>
                       </span>
                       : 
                       <span>
                        <Label htmlFor="validationCustom01">
                        {"Company Logo"}
                      </Label>
                        <div className="d-flex align-items-center gap-2">
                        <input 
                        className="form-control"
                        name="companyLogo"
                        type="file"
                        accept="image/png, image/jpeg"
                        placeholder="Company Logo"
                        onChange={(e) => {
                         if(e.target.files && e.target.files[0]){
                          var reader = new FileReader();
                          reader.onload = function(evnt){
                            setcompanyLogoURL(evnt.target.result);
                            setCompanyLogoMode('logo')
                          }
                         reader.readAsDataURL(e.target.files[0]);
                         }
                          setcompanyLogoFile(e.target.files[0]);
                        }}
                        required={true}
                      />
                       <MdCancel style={{width: '20px', height: '20px', cursor: 'pointer', color: 'red'}} onClick={() => {
                        setcompanyLogoURL(companayLogoRef.current);
                        setCompanyLogoMode('logo')
                       }}/>
                        </div>
                       </span>
                      }
                      
                    </Col>
                  </Row>

                  <Btn
                    attrBtn={{
                      color: "primary",
                      onClick: () => {
                        if(!companyLogoFile){
                            toast.error('Please Upload Profile Picture!');
                        }else{
                            uploadCompanyLogo();
                            setrepEditMode({ status: false, avatarID: null });
                        }
                      },
                    }}
                  >
                    {"Ok"}
                  </Btn>

    </Form>
    </Fragment>
  )
}

export default EditRepresentative