import React from 'react'
import { H5 } from '../../../AbstractElements'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';


const AgentDeleteModal = ({modal, title, toggle, event}) => {
  return (
    <CommonModal isOpen={modal} title={title} toggler={toggle} event={event} delete={'Delete'}>
      <H5>You wish to remove this agent ?</H5>
    </CommonModal>
  )
}

export default AgentDeleteModal