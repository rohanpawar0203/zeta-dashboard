import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Media, Container, Row, CardHeader } from "reactstrap";
import { Spinner } from "../../AbstractElements";
import './styles/style.css'
import {templateController} from './TemplateController/templateController'
import {def_template} from './Templates/WhatsApp/default'
import { FaRegEdit } from "react-icons/fa";
import WidgetEditComponent from "../WidgetEdit/WidgetContent";
import { toast } from "react-toastify";
import axios from "axios";

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');

const whatsAppImgs = [
	require('../../../src/assets/images/whatsapp/multiple-accounts-1.png'),
	require('../../../src/assets/images/whatsapp/multiple-accounts-2.png'),
	require('../../../src/assets/images/whatsapp/multiple-accounts-3.png'),
	require('../../../src/assets/images/whatsapp/multiple-accounts-4.png'),
	
	// Add more image paths as needed
  ]

const WidgetContent = () => {
	const $ = window.jQuery;
	const widgetRef = useRef();
	const [loading, setloading] = useState(false);
	const [template, setTemplate] = useState({type: {...def_template}, template_id: ''});
	const [allTemplates, setallTemplates] = useState([]);
	const [mode, setMode] = useState('')
	const templateChangerRef = useRef('')
    
	useEffect(() => {
			$("#example").empty();
			$("#example").attr("class", "");
			if(template.type){
				$('#example').czmChatSupport({...template?.type});
			 }
		}, [template.type])

	const getWidgetTemplate = async() => {
		setloading(true);
		try {
			const payload = {
			  "customer_id": userData?._id,
			  "type": "whatsapp",
		  }
			const res = await fetch(`http://localhost:8080/widgets`, {
			  method: 'POST',
			  body: JSON.stringify(payload),
			  headers: {
				"Content-Type": "application/json", 
				// Authorization: `Bearer ${token}`,
				// Add other headers if needed
			  },
			})
			let result = await res.json();
			
			if(res.ok && result){
			  setallTemplates([...result]);
			  widgetRef.current = {type: JSON.parse(result.find((ele) => (ele.status === 'active'))?.settings) , template_id : result.find((ele) => (ele.status === 'active'))?.template_id};
			  setTemplate({type: JSON.parse(result.find((ele) => (ele.status === 'active'))?.settings) , template_id : result.find((ele) => (ele.status === 'active'))?.template_id})
		  }
		  } catch (error) {
			console.log('widget customization error ', error);
			toast.error(error?.message)
		  }
		  setloading(false);
	}
	
	useEffect(() => {
	if(userData?._id){
		getWidgetTemplate();
	}
	}, [])
	

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
            {    loading ? 
			     <div className="loader-box">
				 <Spinner attrSpinner={{ className: 'loader-3' }} /> 
				 </div>
			       : 
				(mode === 'edit') ? 
				<WidgetEditComponent  template={template?.type} templateID={template?.template_id} setTemplate={setTemplate} setMode={setMode} getWidgetTemplate={getWidgetTemplate}/>
				:
                <section className="examples whatsapp-examples" id="whatsapp-examples">
			{(allTemplates.length > 0) ? 
			<div className="container container-xl">
				<div className="row justify-content-center">
					<div className="col-12">
						<h1>Whatsapp</h1>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate((pre) => ({template_id: "multiple_accounts_1", type: JSON.parse(allTemplates.find((ele) => (ele.template_id === 'multiple_accounts_1'))?.settings)}))}}  className={`example ${widgetRef?.current?.template_id === 'multiple_accounts_1' ? 'current-template' : ''}`}>
							<div className="text">
								<div className="title">Multiple Accounts 1</div>
							</div>
							<div className="image">
								<img src={whatsAppImgs[0]} alt="Whatsapp Multiple Accounts 1" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className={`example ${widgetRef?.current?.template_id === 'multiple_accounts_2' ? 'current-template' : ''}`} onClick={() => {setTemplate((pre) => ({template_id: "multiple_accounts_2"	, type: JSON.parse(allTemplates.find((ele) => (ele.template_id === 'multiple_accounts_2'))?.settings)}))}}>
							<div className="text">
								<div className="title">Multiple Accounts 2</div>
							</div>
							<div className="image">
								<img src={whatsAppImgs[1]} alt="Whatsapp Multiple Accounts 2" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate((pre) => ({template_id: 'multiple_accounts_3', type: JSON.parse(allTemplates.find((ele) => (ele.template_id === 'multiple_accounts_3'))?.settings)}))}} className={`example ${widgetRef?.current?.template_id === 'multiple_accounts_3' ? 'current-template' : ''}`}>
							<div className="text">
								<div className="title">Multiple Accounts 3</div>
							</div>
							<div className="image">
								<img src={whatsAppImgs[2]} alt="Whatsapp Multiple Accounts 3" />
							</div>
						</div>
					</div>
				</div>
			</div> : ''
			}
		        </section>
			}
         
        {mode !== 'edit' ? <div className={(template?.type?.button?.style !== 1) ? ('editIcon editIcon-second') : 'editIcon'} onClick={() => {setMode('edit')}}>
		<FaRegEdit style={{width: '18px', height: '18px', cursor:'pointer'}}/>
		</div> : 
		''
		}
		<div id={"example"}>
		</div>
      </Container>
    </Fragment>
  );
};
export default WidgetContent;


