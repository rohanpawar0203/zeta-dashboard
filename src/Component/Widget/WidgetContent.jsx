import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Media, Container, Row, CardHeader } from "reactstrap";
import './styles/style.css'
import {templateController} from './TemplateController/templateController'
import {def_template} from './Templates/WhatsApp/default'
import { FaRegEdit } from "react-icons/fa";
import WidgetEditComponent from "../WidgetEdit/WidgetContent";
import { toast } from "react-toastify";

const userData = JSON.parse(sessionStorage.getItem('currentUser'));
const token = sessionStorage.getItem('token');
const WidgetContent = () => {
	const $ = window.jQuery;
	const widgetRef = useRef();
	const [template, setTemplate] = useState({type: {...def_template}, template_id: ''});
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
		try {
			const payload = {
			  "customer_id": userData?._id,
			  "type": "whatsApp",
		  }
			const res = await fetch(`http://localhost:8080/bot-customization/template`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json", 
				// Add other headers if needed
			  },
			  body: JSON.stringify(payload),
			})
			let result = await res.json();

		  if(res.ok){
			if(result?.data){
				widgetRef.current = JSON.parse(result?.data?.settings);
				setTemplate({type: {...widgetRef.current}, template_id: ''})
			}
		  }
		  } catch (error) {
			console.log('widget customization error ', error);
			toast.error(error?.message)
		  }
	}
	
	useEffect(() => {
	getWidgetTemplate();
	}, [])
	

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
            {
				(mode === 'edit') ? 
				<WidgetEditComponent  template={template?.type} templateID={template?.template_id} setTemplate={setTemplate} setMode={setMode} getWidgetTemplate={getWidgetTemplate}/>
				:
                <section className="examples whatsapp-examples" id="whatsapp-examples">
			<div className="container container-xl">
				<div className="row justify-content-center">
					<div className="col-12">
						<h1>Whatsapp</h1>
					</div>
					{widgetRef.current && (
					<div className="col-lg-3 col-md-6 col-sm-6">
					<div onClick={() => {setTemplate((pre) => ({template_id: 'current', type: widgetRef.current}))}}  className="example">
						<div className="text">
							<div className="title">Current Template</div>
						</div>
						<div className="image">
							<img src="/assets/img/popup/whatsapp/multiple-accounts-1.png" alt="Current template type" />
						</div>
					</div>
				</div>
					)}
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate((pre) => ({template_id: 'multi_accounts_1', type: templateController.sendTemplateType('whatsApp', 'multi_accounts_1')}))}}  className="example">
							<div className="text">
								<div className="title">Multiple Accounts 1</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-1.png" alt="Whatsapp Multiple Accounts 1" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className="example" onClick={() => {setTemplate((pre) => ({template_id: 'multi_accounts_2'	, type: templateController.sendTemplateType('whatsApp', 'multi_accounts_2')}))}}>
							<div className="text">
								<div className="title">Multiple Accounts 2</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-2.png" alt="Whatsapp Multiple Accounts 2" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate((pre) => ({template_id: 'multi_accounts_3', type: templateController.sendTemplateType('whatsApp', 'multi_accounts_3')}))}} className="example">
							<div className="text">
								<div className="title">Multiple Accounts 3</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-3.png" alt="Whatsapp Multiple Accounts 3" />
							</div>
						</div>
					</div>
				</div>
			</div>
		        </section>
			}
         
        {mode !== 'edit' ? <div className={(template?.template_id === "multi_accounts_3") ? ('editIcon editIcon-second') : 'editIcon'} onClick={() => {setMode('edit')}}>
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


