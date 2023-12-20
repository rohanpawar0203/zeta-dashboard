import React, { Fragment, useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Media, Container, Row, CardHeader } from "reactstrap";
import './styles/style.css'
import {templateController} from './TemplateController/templateController'
import {def_template} from './Templates/WhatsApp/default'

const WidgetContent = () => {
	const $ = window.jQuery;
	const widgetRef = useRef();
	const [template, setTemplate] = useState({...def_template});
    
	useEffect(() => {
		console.log('template ', template);
		$("#example").empty();
		$("#example").attr("class", "");
		template && $('#example').czmChatSupport({...template});
	}, [template])
	

  return (
    <Fragment>
      <Container fluid={true} className="mt-2 d-flex justify-content-center">
        <Card style={{width: '100%', margin: '0 auto'}} className="mt-2">
            <CardBody>
            
            <section className="examples whatsapp-examples" id="whatsapp-examples">
			<div className="container container-xl">
				<div className="row justify-content-center">
					<div className="col-12">
						<h1>Whatsapp</h1>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate(templateController.sendTemplateType('whatsApp', 'multi_accounts_1'))}}  className="example">
							<div className="text">
								<div className="title">Multiple Accounts 1</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-1.png" alt="Whatsapp Multiple Accounts 1" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div className="example" onClick={() => {setTemplate(templateController.sendTemplateType('whatsApp', 'multi_accounts_2'))}}>
							<div className="text">
								<div className="title">Multiple Accounts 2</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-2.png" alt="Whatsapp Multiple Accounts 2" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<div onClick={() => {setTemplate(templateController.sendTemplateType('whatsApp', 'multi_accounts_3'))}} className="example">
							<div className="text">
								<div className="title">Multiple Accounts 3</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-3.png" alt="Whatsapp Multiple Accounts 3" />
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-multiple-accounts-4.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Multiple Accounts 4</div>
							</div>
							<div className="image">
								<img src="/assets/img/popup/whatsapp/multiple-accounts-4.png" alt="Whatsapp Multiple Accounts 4" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-single-account-1.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Single Account 1</div>
							</div>
							<div className="image image-padding-1">
								<img src="/assets/img/popup/whatsapp/single-account-1.png" alt="Whatsapp Single Account 1" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-single-account-2.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Single Account 2</div>
							</div>
							<div className="image image-padding-1">
								<img src="/assets/img/popup/whatsapp/single-account-2.png" alt="Whatsapp Single Account 2" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-single-account-3.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Single Account 3</div>
							</div>
							<div className="image image-padding-1">
								<img src="/assets/img/popup/whatsapp/single-account-3.png" alt="Whatsapp Single Account 3" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-single-account-4.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Single Account 4</div>
							</div>
							<div className="image image-padding-1">
								<img src="/assets/img/popup/whatsapp/single-account-4.png" alt="Whatsapp Single Account 4" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-1.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 1</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-1.png" alt="Whatsapp Button Only 1" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-2.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 2</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-2.png" alt="Whatsapp Button Only 2" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-3.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 3</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-3.png" alt="Whatsapp Button Only 3" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-4.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 4</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-4.png" alt="Whatsapp Button Only 4" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-5.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 5</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-5.png" alt="Whatsapp Button Only 5" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-6.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 6</div>
							</div>
							<div className="image image-padding-2">
								<img src="/assets/img/popup/whatsapp/button-only-6.png" alt="Whatsapp Button Only 6" />
							</div>
						</a>
					</div>
					<div className="col-lg-3 col-md-6 col-sm-6">
						<a href="index-whatsapp-button-only-7.html" target="_blank" className="example">
							<div className="text">
								<div className="title">Button Only 7</div>
							</div>
							<div className="image image-padding-2">
								<img src="../../../public/main-file/plugin/assets/img/popup/whatsapp/button-only-7.png" alt="Whatsapp Button Only 7" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>

		<div id={"example"}></div>
            
            </CardBody>
        
        </Card>
      </Container>
    </Fragment>
  );
};
export default WidgetContent;


