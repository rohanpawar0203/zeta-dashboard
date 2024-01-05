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

  const fetchTicketsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${TicketsAPI}/${user._id}/organization`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      // console.log('tickets ', data);
      setProducts(data);
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
        <Card className="mt-2" style={{ height: "80vh" }}>
          <CardHeader className="w-100 d-flex justify-content-between">
            <div>
              <H5>{"Tickets"}</H5>
            </div>
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
          <div style={{ height: "78vh", overflowY: "scroll" }}>
            {loading ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : products.length > 0 ? (
              <div className="h-100 table-responsive">
                <Table>
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">{"Email ID"}</th>
                      <th scope="col">{"Query"}</th>
                      <th scope="col">{"Subject"}</th>
                      <th scope="col">{"Created At"}</th>
                      <th scope="col">{"Created By"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((ele, ind) => (
                        <tr>
                          <td>{ele?.email}</td>
                          <td>{ele?.query}</td>
                          <td>{ele?.subject}</td>
                          <td>{new Date(ele?.createdAt).toLocaleString()}</td>
                          <td>{ele?.userId}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="h-75 w-100 d-flex flex-column justify-content-center align-items-center gap-2">
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
