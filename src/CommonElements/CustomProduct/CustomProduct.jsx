import React, { useContext } from 'react'
import { Row, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { H4, LI, P, Image, UL, Btn } from '../../AbstractElements';
import ProductContext from '../../_helper/ecommerce/product';


const CustomProducts = (products) => {
    const { productItem, symbol } = useContext(ProductContext);
  return (
    <div className='d-flex flex-column gap-2'>
     { 
     products?.length > 0 ? (
     products?.map((product, ind) => (
        <div id="gridId" className={'sm-8 md-6 lg-6'} key={product?._id}>
                <Card >
                  <div className="product-box">
                    <div className="product-img">
                      <Image attrImage={{ className: 'img-fluid', src: `${product?.images[0] ? product?.images[0]: ''}`, alt: 'product-img' }} />
                    </div>
                    <div className="product-details">
                      <Link to={`${process.env.PUBLIC_URL}/ecommerce/productpage`}>
                        <H4>{product?.productName}</H4>
                      </Link><P>{product?.productDescription}</P> 
                      <div className="product-price">{symbol} {product?.price}</div>
                    </div>
                  </div>
                </Card>
    </div>
     ))
     ): ''
     }    
 
    </div>
  )
}

export default CustomProducts;