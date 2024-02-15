import { H5, H6, Spinner } from "../../../AbstractElements";
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
import { ProductsListAPI } from "../../../api";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ProductFormModal from "./ProductFormModal";
import ScrollBar from "react-perfect-scrollbar";

const ProductsTable = () => {
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

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ProductsListAPI}/${user._id}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast(error);
    }
    setLoading(false);
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(`${ProductsListAPI}/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <Fragment>
      <Col sm="12">
        <Card>
          <div
            style={{
              height: "65vh",
              marginBottom: "5vh",
              overflow: "hidden",
              paddingBottom: "10vh",
            }}
          >
            <CardHeader className="w-100 d-flex justify-content-end">
              {/* <div>
              <H5>{"Products"}</H5>
            </div> */}
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => {
                    setselectedProductId("");
                    toggle();
                  }}
                >
                  Add New Product
                </button>
              </div>
            </CardHeader>
            {loading ? (
              <div className="loader-box">
                <Spinner attrSpinner={{ className: "loader-3" }} />
              </div>
            ) : products.length > 0 ? (
              <div className="h-100 table-responsive">
                  <ScrollBar>
                <Table>
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">{"Product ID"}</th>
                      <th scope="col">{"Product Name"}</th>
                      <th scope="col">{"Product SKU"}</th>
                      <th scope="col">{"Product Type"}</th>
                      <th scope="col">{"Price"}</th>
                      <th scope="col"> </th>
                    </tr>
                  </thead>
                  <tbody style={{ height: "60vh", overflowY: "scroll" }}>
                    {products?.map((item, ind) => (
                      <tr key={ind}>
                        <th scope="row">{item.productId}</th>
                        <td>{item.productName}</td>
                        <td>{item.productSku}</td>
                        <td>{item.productType}</td>
                        <td>{item.price}</td>
                        <td>
                          <Dropdown
                            isOpen={dropdownOpenId === item?.productId}
                            toggle={() => {
                              toggleDropDownId((pre) => {
                                if (!pre) {
                                  return item?.productId;
                                } else {
                                  return null;
                                }
                              });
                            }}
                          >
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
                                  ...(HoveredProduct === item?.productId &&
                                    hoverStyle),
                                }}
                                className="d-flex justify-content-center align-items-center rounded"
                                onMouseEnter={() => {
                                  setHoveredProduct(item?.productId);
                                }}
                                onMouseLeave={() => {
                                  setHoveredProduct("");
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
                              <DropdownItem
                                onClick={() => {
                                  setselectedProductId(item?._id);
                                  toggle();
                                }}
                              >
                                <H5
                                  attrH5={{
                                    className: "my-0 ms-2 fw-bolder mb-1",
                                  }}
                                >
                                  Edit Product
                                </H5>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => {
                                  deleteProduct(item?._id);
                                }}
                              >
                                <H5
                                  attrH5={{
                                    className: "my-0 ms-2 fw-bolder mb-1",
                                  }}
                                >
                                  Delete Product
                                </H5>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </ScrollBar>
              </div>
            ) : (
              <div className="w-100 h-75 d-flex justify-content-center align-items-center">
                <H6>No Products Exist</H6>
              </div>
            )}
            <ProductFormModal
              setLoading={setLoading}
              modal={modal}
              NewMessage={"New Bot"}
              toggle={toggle}
              title="Update Product"
              productID={selectedProductId}
              fetchProductData={fetchProductData}
            ></ProductFormModal>
          </div>
        </Card>
      </Col>
    </Fragment>
  );
};

export default ProductsTable;
