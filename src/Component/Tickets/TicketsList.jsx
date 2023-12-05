import { H5, H6, Spinner} from '../../AbstractElements'
import { Col, Card, CardHeader, Table,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle, } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AgentAPI, TicketsAPI } from "../../api";


const TicketsList = ({setMode}) => {
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
      setupdateModal(!updatemodal)
    };

    const [dropdownOpenId, setDropdownOpenId] = useState('');
    const [selectedProductId, setselectedProductId] = useState('')

    const toggleDropDownId = (id) => setDropdownOpenId(id);

    const fetchTicketsData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${TicketsAPI}/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
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
        <Card className='mt-2 '>
          <CardHeader className='w-100 d-flex justify-content-between'>
            <div>
            <H5>{'Tickets'}</H5>
            </div>
            <div>
            <button type="button" class="btn btn-success" onClick={() => {
              setMode('create')
          }}>Crete Ticket</button>
            </div>
          </CardHeader>
          <div style={{height: '80vh'}}>
          { 
          loading ? 
        <div className="loader-box">
        <Spinner attrSpinner={{ className: 'loader-3' }} /> 
        </div> : 
          <div className="table-responsive">
            <Table>
              <thead>
                <tr className='table-primary'>
                  <th scope="col">{'Product ID'}</th>
                  <th scope="col">{'Product Name'}</th>
                  <th scope="col">{'Product SKU'}</th>
                  <th scope="col">{'Product Type'}</th>
                  <th scope="col">{'Price'}</th>
                  <th scope="col">{' '}</th>
                </tr>
              </thead>
              <tbody>
                {
                    <tr>
                      <th scope="row">{'productId'}</th>
                      <td>{'productName'}</td>
                      <td>{'productSku'}</td>
                      <td>{'productType'}</td>
                      <td>{'price'}</td>
                    </tr>
                }
              </tbody>
              </Table> 
            </div>
             }
            </div>
       </Card>
      </Col>
    </Fragment>
  );
};

export default TicketsList;