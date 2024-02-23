import React, { useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Btn } from "../../../../AbstractElements";
import { Close, Submit, NewBot } from "../../../../Constant/index";
import CustomSpinner from "../../../../CommonElements/CustomSpinner/CustomSpinner";

const CommonModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggler}
      size={props.size}
      // position="top-start"
      centered
    >
      <ModalHeader toggle={props.toggler} className="fw-bolder">
        {props.title}
      </ModalHeader>
      <ModalBody className={props.bodyClass}>{props.children}</ModalBody>
      {/* <ModalFooter>
        {props?.event && (
          <>
            <Btn attrBtn={{ color: "secondary", onClick: props.toggler }}>
              {Close}
            </Btn>
            <Btn
              attrBtn={{
                color: `${props?.delete ? "danger" : "primary"}`,
                onClick: props?.event,
              }}
            >
              {props?.submitLoader ? (
                <CustomSpinner />
              ) : props?.delete ? (
                props?.delete
              ) : props?.submitTxt ? (
                props?.submitTxt
              ) : (
                Submit
              )}
            </Btn>
          </>
        )}
      </ModalFooter> */}
    </Modal>
  );
};

export default CommonModal;
