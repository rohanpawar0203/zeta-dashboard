import React from 'react'
import { H5, P } from '../../../AbstractElements'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';

const DeleteQuestionModal = ({modal, title, toggle, event}) => {
  return (
    <CommonModal isOpen={modal} title={title} toggler={toggle} event={event} delete={'Delete'}>
    <H5 attrH5={{className: 'fw-bolder'}}>You wish to remove this context ?</H5>
  </CommonModal>
  )
}

export default DeleteQuestionModal