import { H5, H6, Spinner } from "../../AbstractElements";
import {
  Col,
  Card,
  CardHeader,
  Table,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AgentAPI, TicketsAPI } from "../../api";
import axios from "axios";
import ScrollBar from "react-perfect-scrollbar";
import DynPagination from "../../CommonElements/DynamicPagination/DynPagination";
import { txtAlignCenter } from "../Products/components/ProductsTable";

const TicketsList = ({ setMode }) => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [loading, setLoading] = useState(false);
  const [updatemodal, setupdateModal] = useState(false);
  const [HoveredProduct, setHoveredProduct] = useState(false);
  const hoverStyle = {
    background: "whitesmoke",
    cursor: "pointer",
  };

  const toggleUpdateModal = () => {
    setupdateModal(!updatemodal);
  };

  const [dropdownOpenId, setDropdownOpenId] = useState("");
  const [selectedProductId, setselectedProductId] = useState("");

  const toggleDropDownId = (id) => setDropdownOpenId(id);

  const fetchTicketsData = async (page, limit) => {
    setLoading(true);
    try {
      let pageNo = page || 1, limitValue = limit || 25;
      let orgId = user?.userId ? user?.userId : user?._id; 
      const res = await axios.get(`${TicketsAPI}/${orgId}/organization?page=${pageNo}&limit=${limitValue}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data =  res.data;
      // console.log('res?.status ', typeof res?.status, data);
      if(res?.status === 200 && data){
        // console.log('resres ', data);
        setProducts(data)
      }
    } catch (error) {
      toast(error);
    }
    setLoading(false);
  };

  // const deleteProduct = async (productId) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${ProductsListAPI}/${productId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (response.ok) {
  //       fetchProductData();
  //       toast.success(responseData.message);
  //     } else {
  //       toast.error(responseData.message);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchTicketsData();
  }, []);
  return (
    <Fragment>
      <Col sm="12">
        <Card
          // style={{
          //   height: "68vh",
          //   marginBottom: "5vh",
          //   overflow: "hidden",
          //   paddingBottom: "10vh",
          // }}
        >
          <div>
            <CardHeader className="w-100 d-flex justify-content-end">
              {/* <div>
              <H5>{"Tickets"}</H5>
            </div> */}
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => {
                    setMode("create");
                  }}
                >
                  Create Ticket
                </button>
              </div>
            </CardHeader>
            {loading ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : products['data']?.length > 0 ? (
              <>
              <div className="h-100 table-responsive">
                <ScrollBar>
                <Table style={{
                        width: "100%",
                      }}>
                  <thead>
                    <tr style={txtAlignCenter} className="table-primary">
                      <th scope="col">{"Email ID"}</th>
                      <th scope="col">{"Query"}</th>
                      <th scope="col">{"Subject"}</th>
                      <th scope="col">{"Created At"}</th>
                      <th scope="col">{"Created By"}</th>
                    </tr>
                  </thead>
                  <tbody style={{ height: "60vh",
                          overflowY: "scroll",
                          width: "100%",
                          display: "contents"}}>
                    {products['data'].length > 0 &&
                      products['data'].map((ele, ind) => (
                        <tr>
                          <td style={txtAlignCenter}>{ele?.email}</td>
                          <td style={txtAlignCenter}>{ele?.query}</td>
                          <td style={txtAlignCenter}>{ele?.subject}</td>
                          <td style={txtAlignCenter}>{new Date(ele?.createdAt).toLocaleString()}</td>
                          <td style={txtAlignCenter}>{ele?.userId}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                </ScrollBar>
              </div>
               <DynPagination totalCount={products['total_count']} switchPage={fetchTicketsData}/>
              </>
            ) : (
              <div style={{height: '200px'}} className="w-100 d-flex flex-column justify-content-center align-items-center gap-2">
                <H6 className="fw-bolder">{"No Tickets Exist"}</H6>
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default TicketsList;
