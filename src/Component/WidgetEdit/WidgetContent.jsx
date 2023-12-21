import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Media, Container, Row, CardHeader, Form, Label } from "reactstrap";
import "../Widget/styles/style.css"
import { Btn, H5 } from "../../AbstractElements";
import { v4 as uuidv4 } from "uuid";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

const Avatar = {
	avatar: {
	  src: '', /* Image, Icon or SVG */
	  backgroudColor: "", /* Html color code */
	  onlineCircle: '' /* Avatar online circle. To remove, (onlineCircle:false) */
	},
	text: {
	  title: "", /* Writing is required */
	  description: "", /* To remove, (description:false) */
	  online: "", /* To remove, (online:false) */
	  offline: "" /* To remove, (offline:false) */
	},
	link: {
	  desktop: "https://web.whatsapp.com/send?phone=905377323226&text=Hi", /* Writing is required */
	  mobile: "https://wa.me/905377323226/?text=Hi" /* If it is hidden desktop link will be valid. To remove, (mobile:false) */
	}
  }

const WidgetEditComponent = ({template, setTemplate, setMode}) => {
	const templateRef = useRef({...template});
	const [persons, setPersons] = useState([]);
	

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        <Card style={{width: '100%', margin: '0 auto'}} className="mt-2">
		<CardHeader className='w-100 pb-0'>
            <H5>{'Customize Widget'}</H5>
          </CardHeader>
            <CardBody>
			<Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={() => {}}
                >
                  <Row>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button Position"}
                      </Label>
                        <select 
                          className="form-control"
                          name="position"
                          defaultValue={template?.button?.position}
						  placeholder="Button Position"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, position: e.target.value}}))
						  }}
                          required={true}
                        >
						<option value="">Select Position</option>
						<option value="left">Left</option>
						<option value="right">Right</option>
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button style"}
                      </Label>
                        <select 
                          className="form-control"
                          name="style"
                          defaultValue={template?.button?.style}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, style: e.target.value}}))
						  }}
                          placeholder="Button style"
                          required={true}
                        >
							<option value={''}>Select Style</option>
						{[1, 2, 3, 4, 5, 6, 7].map((ele, ind) => (
							<option value={ele}>Type {`${ele}`}</option>
						))}
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button background Color"}
                      </Label>
                        <div className="d-flex gap-2 align-items-center">
						<select 
                          className="form-control"
                          name="buttonBackgroundColor"
                          value={`Select background Color`}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, backgroundColor: e.target.value}}))
						  }}
                          placeholder="buttonBackgroundColor"
                          required={true}
                        >
							<option style={{width: '15px',height: '15px'}} value={''}>Select background Color</option>
						{['#7B241C', '#4A235A', '#0B5345', '#145A32', '#7B7D7D', '#F1C40F', '#424949'].map((ele, ind) => (
							<option style={{width: '15px',height: '15px', borderRadius: '50%', backgroundColor: ele}} value={ele}></option>
						))}
						</select>
						<ColorDiv bgColor={template?.button?.backgroundColor}/>
						</div>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
                  </Row>

				  <Row>
				  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button effect"}
                      </Label>
                        <select 
                          className="form-control"
                          name="buttonEffect"
                          defaultValue={template?.button?.style}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, effect: e.target.value}}))
						  }}
                          placeholder="Button Effect"
                          required={true}
                        >
							<option value={''}>Select Effect</option>
						{[1, 2, 3, 4, 5, 6, 7].map((ele, ind) => (
							<option value={ele}>Effect {`${ele}`}</option>
						))}
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
					<Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button Speech Bubble"}
                      </Label>
                        <input 
                          className="form-control"
                          name="speechBubble"
                          type="text"
                          defaultValue={template?.button?.speechBubble}
						  placeholder="Button Speech Bubble"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, speechBubble: e.target.value}}))
						  }}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
					<Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button Pulse effect"}
                      </Label>
                        <select 
                          className="form-control"
                          name="buttonPulseEffect"
                          defaultValue={template?.button?.pulseEffect}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, pulseEffect: e.target.value === 'true' ? true : false }}))
						  }}
                          placeholder="Button Pulse effect"
                          required={true}
                        >
							<option value={''}>Select Pulse Effect</option>
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
                        {"Button Title"}
                      </Label>
                        <input 
                          className="form-control"
                          name="buttonTitle"
                          type="text"
                          defaultValue={template?.button?.text?.title}
						  placeholder="Button Title"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, text: {...pre?.button?.text, title: e.target.value}}}))
						  }}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
					<Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Button description"}
                      </Label>
                        <input 
                          className="form-control"
                          name="buttonDescription"
                          type="text"
                          defaultValue={template?.button?.text?.description}
						  placeholder="Button description"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, button: {...pre?.button, text: {...pre?.button?.text, description: e.target.value}}}))
						  }}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
				  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Popup automatic open"}
                      </Label>
                        <select 
                          className="form-control"
                          name="automaticOpen"
                          defaultValue={template?.popup?.automaticOpen}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, automaticOpen: e.target.value === 'true'? true: false}}))
						  }}
                          placeholder="Popup automatic open"
                          required={true}
                        >
							<option value={''}>Select auto open</option>
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
                        {"Outside Click Close Popup"}
                      </Label>
                        <select 
                          className="form-control"
                          name="outsideClickClosePopup"
                          defaultValue={template?.popup?.outsideClickClosePopup}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, outsideClickClosePopup: e.target.value === 'true' ? true: false}}))
						  }}
                          placeholder="Outside Click Close Popup"
                          required={true}
                        >
						<option value={''}>Select outside click close</option>
						{[true, false].map((ele, ind) => (
							<option value={ele}>{ele ? 'Yes': 'No'}</option>
						))}
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
					<Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Popup Effect"}
                      </Label>
                        <select 
                          className="form-control"
                          name="popupEffect"
                          defaultValue={template?.button?.style}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, effect: e.target.value}}))
						  }}
                          placeholder="Button style"
                          required={true}
                        >
							<option value={''}>Select Popup Effect</option>
						{new Array(15).fill('1').map((ele, ind) => (
							<option value={ind+1}>Effect {`${ind+1}`}</option>
						))}
						</select>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
					<Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Popup header background Color"}
                      </Label>
					  <div className="d-flex gap-2 align-items-center">
                        <select 
                          className="form-control"
                          name="popupHeaderBackgroundColor"
                          value={`Select background Color`}
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, header: {...pre?.popup?.header, backgroundColor: e.target.value}}}))
						  }}
                          placeholder="Popup header background Color"
                          required={true}
                        >
							<option value={''}>Select background Color</option>
						{['#7B241C', '#4A235A', '#0B5345', '#145A32', '#7B7D7D', '#F1C40F', '#424949'].map((ele, ind) => (
							<option style={{width: '15px',height: '15px', borderRadius: '50%', backgroundColor: ele}} value={ele}></option>
						))}
						</select>
						<ColorDiv bgColor={template?.popup?.header?.backgroundColor}/>
						</div>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
				  </Row>

				  <Row>
				  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Popup Header description"}
                      </Label>
                        <input 
                          className="form-control"
                          name="popupHeaderDescription"
                          type="text"
                          defaultValue={template?.popup?.header?.description}
						  placeholder="Popup Header description"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, header: {...pre?.popup?.header, description: e.target.value}}}))
						  }}
                          required={true}
                        >
						</input>
                      <span>
                      </span>
                      <div className="valid-feedback">{"Looks good!"}</div>
                    </Col>
				  <Col md="4 mb-3">
                      <Label htmlFor="validationCustom01">
                        {"Popup Header Title"}
                      </Label>
                        <input 
                          className="form-control"
                          name="popupHeaderTitle"
                          type="text"
                          defaultValue={template?.popup?.header?.title}
						  placeholder="Popup Header Title"
                          onChange={(e) => {
							e.preventDefault();
							setTemplate((pre) => ({...pre, popup: {...pre?.popup, header: {...pre?.popup?.header, title: e.target.value}}}))
						  }}
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
                        {"Add Representatives"}
                      </Label>
					  <div style={{height: '25px'}} key={uuidv4()} className='d-flex gap-2 align-items-center' onClick={() => {
						if(persons.length < 3){
						setPersons((pre) => ([...pre, {...Avatar}]))
						}
					  }}>
						<span style={{color: 'skyblue'}}>Add Representative</span>
						<span style={{cursor: 'pointer'}} className='d-flex align-items-center'>
							<GetIcon IconValue={IoIosAddCircleOutline} />
						</span>
					  </div>
					{(persons.length > 0) && persons.map((ele, ind) => (
						<div key={uuidv4()} className='mb-1 w-100 d-flex gap-2 align-items-center p-1 border border-lightgray' style={{borderRadius: '4px'}}>
                         <img style={{width:'25px', height: '25px', border: '1px solid skyblue', borderRadius: '50%', objectFit:'cover'}}
						  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASmSURBVHgBnVZbTBxVGP7mvhd2t+wuCxXELUiFCqHaS9LaNKiR1m1MljbaihjUFxOTqkkTEy+J6IuJD0brmw+2iTFpUlOtD7ReEiEaX6qlxCpEs7akZamUBhh2dmdm5+KZmS4U2NmB/snsnst/vv/+n0NhDdS7p7eaChTe5HnuWYZlG1ZsZ0wYP+vAeye/OXXVC4vyYjj8+FM7WIb53gQ2cBwH63OhrG6qT584+9WvuFuBR7rSSZrHb2QYs5kpCoLgA027HpvTYDxUyVIalbThMVASZpFpmlAUGaqqQtO0ct8Go6h9WBGz0mZvd1q3lGKJRU0JDj52NTvLMiioFMayUmkpn1XnIkNDQ1o5TBZuwlIH74Nm2B54or0K8SoGfoEHyyx3CkcEkhijrT6AMxduWkuBewLRevI/sS6BlAmdJApqwyxiQRqRoB8C75ow2JTwIxHmMS2qKEJW3PhcY/jluTPXSdSIW0x7nrml4+zIPCTFWORRiia+vTSPy5OyPRc4x+WnBwdvuOG6WmhRY5T/NxnnNlvZ2VwjAIaBoLCkoyWgOc6hMcbb84eTIVT52SuVMF0t/G7gxd17Hwhsboxxt63RMT4preKbmMmDY5zx/XUBpDpjmy588mr7ugXmYf5FLBu2J6Qcwn4WB3fWrOJLbY3DxzkwxPlFUjpDO147ftkN17PTDA70/0KQHqnZELYLvqCodrZapBQ14talqFjCtr/+6aOV8CoWvqO1+aP1r2pOWYn5AsYnsvY3t7DcxTSNL7zwWC8GFfTHAmUelWQl6iNlUVsdQTwSsvcYepm+V7ki94MXnqeFPQMn52iaeUzTjf9EqbAoaIWwWRhaquPYR9e88DxjWKKv3+rdSthHgj4eoYAfPIkdySVIsgxKx7a9b392cS04ni4t0eik0dhao0OU8rg5v2CnpNXMWWJpNsfQWCN5WvhC+kiSBXWiSqC7ulsd/QzSAKz+U3Lr+TENeUU/rVF4w+sSZiptvtRzuJMxmWFyEbZHt+xCvG0XmNwUaF0BTbqPyQYgtxxAjquBODXxIAXq0La2Lecvjv85s26BffvTXTwrnCI+aPBX16HjmWMwattR3LidxEyFHm9FbudRaIkOhBtaMfP379DyCxEK9IGOppaR0X/Gyt4Wq3zf151+97nu9CxNsz8RtyUpisa9qVeg3dbNCMRxaYrC6DUFJhew11STQcO+l8EKQcvVSRP0cN++dPb5/T0fVLSwP5V+RzfwPhn6SCmAIfdcrKUTTbufhChK9nz2egaZc59DzGYgJJohRGJkL4/ExjrkblxBfiYLXdehG0aI5NSejuZW/JEZHy5rIWkmh5bGRTsLOX/YFlRdHUIul4c/3gA+EgcfiqGqvgWSJCMaDdk8DO+3z2ja0mVPIt1/p4xlZWG9zEpjnuftR9OiKyxrYxHHrRRDQAsIh4NYSdYZ66z17nEwKcpV4OIiy9qfG8nzt2DF1o2ss1bp3GlpRYGlW74c6Sp5tUmiPS7KEjhfsCyfYZTHKKumrhtwo4XppXYpi7OufKbpYBB/Gq4CSf847jCbrhoq4tziuDA7XZbH7kSmc578Lruy/gdc2bgNZaB1HQAAAABJRU5ErkJggg==" alt="avatar-1" />
						</div>
					))}	
				  </Col>
				  </Row>
                  <Btn attrBtn={{ color: "primary", type: 'submit'}}>{"Submit form"}</Btn>
                  <Btn attrBtn={{ color: "danger", onClick: () => {
					setTemplate({...templateRef.current});
					setMode('');
				  }}}>{"Cancel"}</Btn>
                </Form>
         


		{/* <div id={"example-sample"}></div> */}
            </CardBody>
        
        </Card>
      </Container>
    </Fragment>
  );
};
export default WidgetEditComponent;


const ColorDiv = ({bgColor}) => {
	return <div className='d-flex align-items-center justify-content-center' style={{width: '25px', height: '25px',boxSizing: 'border-box',padding: '2px', border: '1px solid teal', borderRadius: '4px'}}>
		<div style={{width: '20px', height: '20px',boxSizing: 'border-box', backgroundColor: bgColor, border: '1px solid teal'}}>

		</div>
	</div>;
}


const GetIcon = ({IconValue}) => {
return <IconValue style={{width: '16px', height: '16px'}}/>
}	