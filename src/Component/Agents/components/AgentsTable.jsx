import React, { Fragment, useEffect, useState } from 'react'
import { AgentAPI, ProductsListAPI } from '../../../api';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, Table,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    DropdownToggle, } from 'reactstrap';
import { useNavigate } from 'react-router';
import { H4, H5 } from '../../../AbstractElements';
import AutomaiteBackend from './automaiteBackend';
import UpdateAgentFormModal from './UpdateAgentFormModal';
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import AgentDeleteModal from './AgentDeleteModal';


const AgentsTable = () => {
    const [agents, setAgents] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");
    const history = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [deleteModal, setdeleteModal] = useState(false);
    const toggleDeleteModal = () => setdeleteModal(!modal);
    const [agentID, setagentID] = useState('')
    const [updatemodal, setupdateModal] = useState(false);
    const [HoveredAgent, setHoveredAgent] = useState(false);
    const hoverStyle = {
      background: "whitesmoke",
      cursor: "pointer",
    };


    const [dropdownOpenId, setDropdownOpenId] = useState('');
    const [agentUpdatePayload, setagentUpdatePayload] = useState({})

    const toggleDropDownId = (id) => setDropdownOpenId(id);

    const handleGetData = async () => {
        try {
          const resp = await AutomaiteBackend.get(`/agent/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAgents(resp.data);
        } catch (error) {
          console.log("error", error);
        }
      };

    const handleDelete = async (el) => {
        try {
          const resp = await axios.delete(
            `${AgentAPI}/${agentID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("resp", resp.data);
          toast({
            title: "User deleted Successfully!",
            status: "success",
            position: "top",
            isClosable: true,
            duration: 4500,
          });
          handleGetData();
        } catch (error) {
          toast({
            title: "Something went wrong",
            status: "error",
            position: "top",
            isClosable: true,
            duration: 4500,
          });
          console.log("error", error);
        }
      };

    useEffect(() => {
        handleGetData();
      }, []);
  return (
    <Fragment>
      {agents.length > 0 ? (
        <Col sm="12">
        <Card>
          <CardHeader>
            <H5>{'All Agents'}</H5>
          </CardHeader>
          <div className="table-responsive vh-100">
            <Table>
              <thead>
                <tr className='table-primary'>
                  <th scope="col">{'Name'}</th>
                  <th scope="col">{'Email'}</th>
                  <th scope="col">{'Last Login'}</th>
                  <th scope="col">{'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {
                  agents?.map((item, ind) =>
                    <tr key={ind}>
                      <th scope="row">{item.name}</th>
                      <td>{item.email}</td>
                      <td></td>
                      <td>
                      <Dropdown isOpen={dropdownOpenId === item?._id} toggle={() => {toggleDropDownId((pre) => {
                        if(!pre){
                         return item?._id
                        }else{
                        return pre?._id?.split('').reverse().join('')
                        }
                      })}}>
                    <DropdownToggle
                      aria-expanded
                      data-toggle="dropdown"
                      tag="span"
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "1px solid lightgray",
                          ...(HoveredAgent === item?._id && hoverStyle),
                        }}
                        className="d-flex justify-content-center align-items-center rounded"
                        onMouseEnter={() => {
                          setHoveredAgent(item?._id);
                        }}
                        onMouseLeave={() => {
                          setHoveredAgent('');
                        }}
                      >
                        <HiOutlineDotsVertical
                          style={{
                            height: "17px",
                            width: "17px",
                            color: "gray",
                          }}
                        />
                      </div>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => {
                        setagentID(item?._id);
                        setagentUpdatePayload({name: item?.name, email: item?.email})
                        toggle();
                      }}>
                        <H5 attrH5={{ className: "my-0 ms-2 fw-bolder mb-1" }}>Edit Agent</H5>
                      </DropdownItem>
                      <DropdownItem onClick={() => {
                        setagentID(item?._id);
                        toggleDeleteModal();
                      }}>
                      <H5 attrH5={{ className: "my-0 ms-2 fw-bolder mb-1" }}>Delete Agent</H5>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <UpdateAgentFormModal modal={modal} NewMessage={'Update Agent'} toggle={toggle} title='Update Agent' 
            agentUpdatePayload={agentUpdatePayload} setagentUpdatePayload={setagentUpdatePayload} 
            fetchAgentsData={handleGetData} 
            agentID={agentID}></UpdateAgentFormModal>
            <AgentDeleteModal title={'Delete Agent'} modal={deleteModal} toggle={toggleDeleteModal} event={() => {handleDelete(agentID)}}/>
          </div>
        </Card>
      </Col>
      ) : 
      (
       <div style={{height: '75vh'}} className='w-100 d-flex flex-column justify-content-center align-items-center bg-white'>
        <H4 attrH4={{className: 'my-2'}}>You Don't have any agents</H4>
        <button type="button" class="btn btn-success" onClick={() => {
            history(`${process.env.PUBLIC_URL}/add-agents`)
        }}>Create New Agent</button>
       </div>
      )}
    </Fragment>
  )
}

export default AgentsTable