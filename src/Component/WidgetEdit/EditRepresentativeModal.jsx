import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Btn, H5, Image } from '../../AbstractElements';
import { Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdCancel, MdDone  } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { getUserDetails } from '../../Services/UsersServices';
import { FileServerAPI, UploadCompanyLogoAPI } from '../../api';
import { ColorDiv } from './WidgetContent';
import { colorsArr } from './WidgetContent';
import { validatorObj } from '../../Services/Custom_Hooks/form_validations';

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');

const EditRepresentative = ({template, setTemplate, avatarID, setrepEditMode}) => {
     const [companyLogoFile, setcompanyLogoFile] = useState('');
     const templateRef = useRef(template);
     const [avtProfile, setAvtProfile] = useState({...template?.popup?.persons?.find((ele) => (ele?.id === avatarID))})
     const [companyLogoURL, setcompanyLogoURL] = useState('')
     const [colors_array, setColors_array] = useState([]);
     const companayLogoRef = useRef('');
     const [companyLogoMode, setCompanyLogoMode] = useState('logo');
     console.log('avtProfile ', avtProfile);
    const handleTemplateChange = (e, value, key, property) => {
        setTemplate((pre) => {
            let personsArr = pre?.type?.popup?.persons;
           let result =  personsArr.map((ele, ind) => {
                let item;
                if(ele?.id === avatarID){
                    item = {...ele, [key]: {...ele[key], [property]: value}}
                }else{
                    item = ele;
                }
                return item;
            })
            console.log('return ', {...pre, type: {...pre?.type, popup: {...pre?.type?.popup, persons: [...result]}}})
            return {...pre, type: {...pre?.type, popup: {...pre?.type?.popup, persons: [...result]}}}
        });
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
          imgElement.src = urlString;
          imgElement.alt = '';
          let evnt = new Event('click');
          handleTemplateChange(evnt, imgElement?.outerHTML, 'avatar', 'src');
         }
        } catch (error) {
          toast.error('File Upload Failed');
          console.log('csv upload error ', error);
         }
      };

    const handleValidations = () => {
      let avatarObj = {...template?.popup?.persons?.find((ele) => (ele?.id === avatarID))};
      let imgExtensions = ['png', 'jpeg'];
      let err = null;
      if(validatorObj?.regExpValidator('color_code', avatarObj?.avatar?.backgroundColor)=== false){
        err = "Invalid hexadecimal colour code!";
      }else if(validatorObj?.regExpValidator('web_url', avatarObj?.link?.desktop) === false){
        console.log('avatarObj?.link?.mobile ', validatorObj?.regExpValidator('web_url', avatarObj?.link?.desktop))
        err = "Invalid desktop link!";
      }else if(validatorObj?.regExpValidator('web_url', avatarObj?.link?.mobile) === false){
        console.log('avatarObj?.link?.mobile ', avatarObj?.link?.mobile)
        err = "Invalid mobile link!";
      }else if(companyLogoFile?.name){
        console.log('file ', validatorObj?.fileFormatValidator(companyLogoFile?.name, imgExtensions))
        err = "Invalid file format!";
      }
      if(err){
        toast.error(`${err}`);
      }
      return err;
    }
console.log('companyLogoFile ', companyLogoFile);
useEffect(() => {  
var htmlString = avtProfile?.avatar?.src;
var parser = new DOMParser();
var doc = parser.parseFromString(htmlString, 'text/html');
var imgElement = doc.querySelector('img');
companayLogoRef.current = imgElement?.getAttribute('src');
setcompanyLogoURL(imgElement?.getAttribute('src'))
    }, [])

useEffect(() => {
  if(colorsArr.length){
    setColors_array([...colorsArr?.map((ele) => {
      if(ele?.color === 'Default'){
        return {...ele, code : "#d6dde1"};
      }else{
        return ele;
      }
    })])
  }
}, [])




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
                        {"background Color"}
                      </Label>
                        <div className="d-flex gap-2 align-items-center">
                        <input
                    className="form-control"
                    name="avatarBackgroundColor"
                    type="text"
                    value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.avatar?.backgroundColor}
                    placeholder="Hexadecimal colour code"
                    onChange={(e) => {
                  //     let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
                  //     if(regex.test(e?.target?.value) === false)
                    handleTemplateChange(e, e.target.value, 'avatar', 'backgroundColor')
                    }}
                    required={true}
                  ></input>
            <ColorDiv bgColor={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.avatar?.backgroundColor ? 
            template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.avatar?.backgroundColor : "#10c379"} />
						</div>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>

                    <Col md="4 mb-3">
                    <Label htmlFor="validationCustom01">
                        {"Online Circle"}
                      </Label>
                        <select 
                          className="form-control"
                          name="avatarOnlineCircle"
                          value={
                            template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.avatar?.onlineCircle}
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
                        {"title"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarTitle"
                          type="text"
                          value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.text?.title}
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
                        {"description"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatardescription"
                          type="text"
                          value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.text?.description}
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
                        {"online description tag"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarOnlineDesTag"
                          type="text"
                          value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.text?.online}
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
                        {"desktop link"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarDesktopLink"
                          type="url"
                          value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.link?.desktop}
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
                        {"mobile link"}
                      </Label>
                        <input 
                          className="form-control"
                          name="avatarMobileLink"
                          type="url"
                          value={template?.popup?.persons?.find((ele) => (ele?.id === avatarID))?.link?.mobile}
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
                        {"Profile Logo"}
                      </Label>
                      <div className="avatar d-flex align-items-center gap-3">
                        <Image attrImage={{ body: true, accept: "image/jpeg, image/png", className: 'img-100  border border-2 border-info', src: companyLogoURL, alt: '#', style: {objectFit: 'cover', borderRadius: '6px'}}} />
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
                        setcompanyLogoFile('');
                        setcompanyLogoURL(companayLogoRef.current);
                        setCompanyLogoMode('logo')
                       }}/>
                        </div>
                       </span>
                      }
                      
                    </Col>
                  </Row>

                <div className="d-flex gap-2">
                <Btn
                attrBtn={{
                  color: "success",
                  onClick: () => {
                      if(!handleValidations()){
                        if(companyLogoFile){
                          uploadCompanyLogo();
                        }else{ 
                        setrepEditMode({
                          status: false,
                          avatarID: null,
                        });
                       setCompanyLogoMode('logo');
                      }
                      }
                      
                    }
                  }
                }
              >
                {"Save"}
              </Btn>
              <Btn
                attrBtn={{
                  color: "danger",
                  onClick: () => {
                    setTemplate((pre) => ({...pre, type: {...pre?.type, popup: {...pre?.type?.popup, persons: [...templateRef?.current?.popup?.persons] } }}));
                    setrepEditMode({
                     status: false,
                     avatarID: null,
                   });
                    },
                }}
              >
                {"Cancel"}
              </Btn>
                  {/* <div>
                  <MdDone style={{width: '20px', height: '20px', cursor: 'pointer', color: 'green'}} onClick={() => {
                    if(companyLogoFile){
                      uploadCompanyLogo();
                    }
                    setrepEditMode({
                      status: false,
                      avatarID: null,
                    });
                   setCompanyLogoMode('logo')
                  }}/>
                <MdCancel style={{width: '20px', height: '20px', cursor: 'pointer', color: 'red'}} onClick={() => {
                       setTemplate((pre) => ({...pre, type: {...pre?.type, popup: {...pre?.type?.popup, persons: [...templateRef?.current?.popup?.persons] } }}));
                       setrepEditMode({
                        status: false,
                        avatarID: null,
                      });
                       }}/>
                  </div> */}
                </div>
                  

    </Form>
    </Fragment>
  )
}

export default EditRepresentative