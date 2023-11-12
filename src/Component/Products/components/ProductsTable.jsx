import { H5 } from '../../../AbstractElements'; 
import { Col, Card, CardHeader, Table,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle, } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductsListAPI } from '../../../api';
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProductFormModal from './ProductFormModal';


const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");
    const history = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
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

    const fetchProductData = async () => {
      try {
        const res = await fetch(
          `${ProductsListAPI}/${user._id}/user`,
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
    };

    const deleteProduct = async (productId) => {
      try {
        const response = await fetch(
          `${ProductsListAPI}/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const responseData = await response.json();
        if (response.ok) {
          fetchProductData();
          toast.success(responseData.message);
        } else {
          toast.error(responseData.message);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
     fetchProductData();
      }, []);
  return (
    <Fragment>
      <Col sm="12">
        <Card>
          <CardHeader>
            <H5>{'Products'}</H5>
          </CardHeader>
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
                  products?.map((item, ind) =>
                    <tr key={ind}>
                      <th scope="row">{item.productId}</th>
                      <td>{item.productName}</td>
                      <td>{item.productSku}</td>
                      <td>{item.productType}</td>
                      <td>{item.price}</td>
                      <td>
                      <Dropdown isOpen={dropdownOpenId === item?.productId} toggle={() => {toggleDropDownId((pre) => {
                        if(!pre){
                         return item?.productId
                        }else{
                        return pre?.productId?.split('').reverse().join('')
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
                          ...(HoveredProduct === item?.productId && hoverStyle),
                        }}
                        className="d-flex justify-content-center align-items-center rounded"
                        onMouseEnter={() => {
                          setHoveredProduct(item?.productId);
                        }}
                        onMouseLeave={() => {
                          setHoveredProduct('');
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
                        setselectedProductId(item?._id)
                        toggle();
                      }}>
                        <H5 attrH5={{ className: "my-0 ms-2 fw-bolder mb-1" }}>Edit Product</H5>
                      </DropdownItem>
                      <DropdownItem onClick={() => {deleteProduct(item?._id)}}>
                      <H5 attrH5={{ className: "my-0 ms-2 fw-bolder mb-1" }}>Delete Product</H5>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
            <ProductFormModal modal={modal} NewMessage={'New Bot'} toggle={toggle} title='Update Product' productID={selectedProductId} fetchProductData={fetchProductData}></ProductFormModal>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default ProductsTable;