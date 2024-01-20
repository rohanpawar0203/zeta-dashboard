import React, { Fragment, useEffect, useState } from 'react'
import { AgentAPI, ProductsListAPI } from '../../../api';
import { toast } from 'react-toastify';
import {
  Col, Card, CardHeader, Table,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
  Input,
} from 'reactstrap';
import { useNavigate } from 'react-router';
import { H4, H5, H6, Spinner } from '../../../AbstractElements';
import AutomaiteBackend from './automaiteBackend';
import UpdateAgentFormModal from './UpdateAgentFormModal';
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from 'axios';
import AgentDeleteModal from './AgentDeleteModal';
import AddAgentModal from './AddAgentModal';


const AgentsTable = () => {
  const [agents, setAgents] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [agentAddModal, setagentAddModal] = useState(false);
  const toggleagentAddModal = () => setagentAddModal(!agentAddModal);
  const [deleteModal, setdeleteModal] = useState(false);
  const toggleDeleteModal = () => setdeleteModal(!deleteModal);
  const [agentID, setagentID] = useState('')
  const [updatemodal, setupdateModal] = useState(false);
  const [HoveredAgent, setHoveredAgent] = useState(false);
  const [loading, setLoading] = useState(false);
  const hoverStyle = {
    background: "whitesmoke",
    cursor: "pointer",
  };


  const [dropdownOpenId, setDropdownOpenId] = useState('');
  const [agentUpdatePayload, setagentUpdatePayload] = useState({})

  const toggleDropDownId = (id) => setDropdownOpenId(id);

  const handleGetData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleDelete = async (el) => {
    setLoading(true);
    try {
      const resp = await axios.delete(
        `${AgentAPI}/${agentID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toggleDeleteModal();
      toast.success("User deleted Successfully!");
      handleGetData();
    } catch (error) {
      toggleDeleteModal();
      toast.error("Something went wrong");
      console.log("error", error);
    }
    setLoading(false);
  };

  const handleNotification = async (value) => {
    setLoading(true);
    try {
      let agentID = JSON.parse(JSON.stringify(value.user_id));
      console.log(":: agentID ::", agentID, token);
      delete value.user_id
      const resp = await axios.patch(`${AgentAPI}/${agentID}`, { data: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      toast.success("Agent Updated Successfully!");
      handleGetData();

    } catch (error) {
      toString.error("Something went wrong");
      console.log("error", error);
    }
  }

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Fragment>
      <Col sm="12">
        <Card className='mt-2'>
          <CardHeader className="w-100 d-flex justify-content-between">
            <H5>{'All Agents'}</H5>
            <div>
              <button type="button" class="btn btn-success" onClick={() => {
                toggleagentAddModal();
              }}>Create New Agent</button>
              <AddAgentModal modal={agentAddModal} toggle={toggleagentAddModal} handleGetData={handleGetData} />
            </div>
          </CardHeader>

          <div style={{ width: '100%', height: '80vh' }}>
            {
              loading ?
                <div className="loader-box">
                  <Spinner attrSpinner={{ className: 'loader-3' }} />
                </div> :
                <>
                  {agents.length > 0 ? (
                    <div className="h-100 table-responsive">
                      <Table>
                        <thead>
                          <tr className='table-primary'>
                            <th scope="col">{'Name'}</th>
                            <th scope="col">{'Email'}</th>
                            <th scope="col">{'Mobile'}</th>
                            <th scope="col">{'Notification Enabled'}</th>
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
                                <td>{item.mobile}</td>
                                <td><Input type='checkbox' checked={item?.notification_enabled} onChange={(e) => {
                                  handleNotification({ notification_enabled: e?.target?.checked, user_id: item._id })
                                }} style={{ transform: 'scale(1.5)' }} /></td>
                                <td></td>
                                <td>
                                  <Dropdown isOpen={dropdownOpenId === item?._id} toggle={() => {
                                    toggleDropDownId((pre) => {
                                      if (!pre) {
                                        return item?._id
                                      } else {
                                        return pre?._id?.split('').reverse().join('')
                                      }
                                    })
                                  }}>
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
                                        setagentUpdatePayload({ name: item?.name, email: item?.email })
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
                      <AgentDeleteModal title={'Delete Agent'} modal={deleteModal} toggle={toggleDeleteModal} event={() => { handleDelete(agentID) }} />
                    </div>
                  ) :
                    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center gap-2">
                      <H6 className='fw-bolder'>{'No Agents Exist'}</H6>
                    </div>
                  }
                </>
            }


          </div>
        </Card>
      </Col>
    </Fragment>
  )
}

export default AgentsTable