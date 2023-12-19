import React, {useEffect, useState} from 'react'
import CommonModal from '../../../_core/Ui-kits/Modals/common/modal';
import { NewBot, BotCreationQstn} from '../../../Constant';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Col, Form, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupText, Input, Row } from 'reactstrap';
import { Btn  } from '../../../AbstractElements';
import { ProductsListAPI } from '../../../api';

const ProductFormModal = ({modal, title, toggle, productID, fetchProductData, setLoading}) => {
  const [initialData, setInitialData] = useState({});
  const { register, handleSubmit, formState: { errors } } = useForm({
    values:{
      ...initialData
    }
  });
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const token = sessionStorage.getItem("token");
  const history = useNavigate();

  const onSubmit = data => {
    if (data !== '') {
      submitHandler(data);
    } else {
      errors.showMessages();
    }
  };

 
  const submitHandler = async (values) => {
    setLoading(true);
    try {
      if (productID) {
        const body = {
          ...values,
        };
        const res = await fetch(
          `${ProductsListAPI}/${productID}`,
          {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await res.json();
        if (res.ok) {
          fetchProductData();
          toast.success(response.message);
          toggle();
        } else {
          toast.error(response.message);
        }
      } else {
        const body = {
          ...values,
          userId: user._id,
          storeId: user?.store?.id,
        };
        const res = await fetch(`${ProductsListAPI}`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await res.json();
        if (res.ok) {
          fetchProductData();
          toast.success(response.message);
          toggle();
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setInitialData({
      productId:  "",
      productName:  "",
      productSku:  "",
      productType:  "",
      price:  "",
  });
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `${ProductsListAPI}/${productID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await res.json();
        setInitialData({
          productId: response?.productId || "",
          productName: response?.productName || "",
          productSku: response?.productSku || "",
          productType: response?.productType || "",
          price: response?.price || "",
        });
      } catch (err) {
        toast(err);
      }
    };
    if (productID) {
      setInitialData({
        productId:  "",
        productName:  "",
        productSku:  "",
        productType:  "",
        price:  "",
    });
      fetchDetails();
    } else {
      setInitialData({
          productId:  "",
          productName:  "",
          productSku:  "",  
          productType:  "",
          price:  "",
      });
    }
  }, [productID]);

  return (
    <CommonModal isOpen={modal} title={title} toggler={toggle} event={handleSubmit(onSubmit)}>
      <Form className="needs-validation" noValidate="">
          <FormGroup >
            <Label>{'Product Name'}</Label>
            <input className="form-control" defaultValue={initialData?.productName} name="productName" type="text" placeholder="Product Name" {...register('productName', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.productName && '* Product Name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Product Sku'}</Label>
            <input className="form-control" defaultValue={initialData?.productSku} name="productSku" type="text" placeholder="Product Sku" {...register('productSku', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.productSku && '* Product Sku is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Product Type'}</Label>
            <input className="form-control" defaultValue={initialData?.productType} name="productType" type="text" placeholder="Product Type" {...register('productType', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.productType && '* Product Type is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Product ID'}</Label>
            <input className="form-control" defaultValue={initialData?.productId} name="productId" type="text" placeholder="Product ID" {...register('productId', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.productId && '* Product ID is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
          <FormGroup>
            <Label>{'Price'}</Label>
            <input className="form-control" defaultValue={initialData?.price} name="price" type="text" placeholder="Price" {...register('price', { required: true })} />
            <span className='text-danger fw-bolder'>{errors.price && '* Price is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </FormGroup>
      </Form>
    </CommonModal>
  )
}

export default ProductFormModal