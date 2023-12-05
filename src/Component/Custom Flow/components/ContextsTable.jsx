import React, { Fragment, useEffect, useState } from 'react'
import { AgentAPI, DeleteContextAPI, ProductsListAPI } from '../../../api';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, Table,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    DropdownToggle, } from 'reactstrap';
import { useNavigate } from 'react-router';
import { H4, H5 } from '../../../AbstractElements';
import axios from 'axios';
import ContextDeleteModal from './ContextDeleteModal';
import ConxtEditElement from './ConxtEditElement';


const ContextsTable = ({data, getAllContexts, setEditContext}) => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    const token = sessionStorage.getItem("token");
    const history = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deleteModal, setdeleteModal] = useState(false);
    const toggleDeleteModal = () => setdeleteModal(!deleteModal);
    const [contextID, setcontextID] = useState('');

    const handleDelete = async (deleteID) => {
        try {
          const resp = await axios.delete(
            `${DeleteContextAPI}/${deleteID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if(resp['status'] === 200){
            getAllContexts();
            toggleDeleteModal();
            toast.success("User deleted Successfully!");
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.log("error", error);
        }
      };

  return (
    <Fragment>
      {data.length > 0 && (
        <Col sm="12">
          <div className="table-responsive vh-100">
            <Table>
              <thead>
                <tr className='table-primary'>
                  <th scope="col">{'CONTEXT'}</th>
                  <th scope="col">{'EDIT'}</th>
                  <th scope="col">{'DELETE'}</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((item, ind) =>
                    <tr key={ind}>
                      <th scope="row">{item.title}</th>
                      <td>
                      <button onClick={() => {
                        setEditContext({mode: true, contextID: item?._id});
                      }} type="button" class="btn btn-outline-success">
                      <span class="glyphicon glyphicon-pencil"></span>Edit</button>
                      </td>
                      <td>
                      <button onClick={() => {
                        setcontextID(item?._id);
                        toggleDeleteModal();
                      }}
                       type="button" class="btn btn-outline-danger">
                      <span class="glyphicon glyphicon-trash"></span>                        
                      Delete</button>
                      </td>
                    </tr>
                  ) 
                }
              <ContextDeleteModal modal={deleteModal} title={'Delete Context'} toggle={toggleDeleteModal} event={() => {handleDelete(contextID)}}/>
              </tbody>
            </Table>
          </div>
      </Col>
      )}
    </Fragment>
  )
}

export default ContextsTable