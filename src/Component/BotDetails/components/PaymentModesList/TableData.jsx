import React from 'react';
import { Btn, H6, Image } from '../../../../AbstractElements';

const style = {
  width: 40,
  height: 40
};
const style2 = {
  width: 60, fontSize: 13, padding: 3
};
export const paymentsData = [
  { 
    "userId": <H6>12345</H6>,
    "Payment Name": <H6>JusPay</H6>,
    "Payment Type": <H6>Online</H6>,
    "Payment Enabled": <H6>Yes</H6>,
    "action":
      <div className='d-flex  gap-1'>
        <span>
          <Btn attrBtn={{ style: style2, color: 'danger', className: 'btn btn-xs', type: 'button' }}>Delete</Btn>
        </span>
        <span>
          <Btn attrBtn={{ style: style2, color: 'primary', className: 'btn btn-xs ms-2', type: 'button' }}>Edit </Btn>
        </span>
      </div >
  },
];
export const paymentDataColumns = [
  {
    name: 'User ID',
    selector: (row) => row.userId,
    sortable: true,
    center: false,
    wrap: true
  },
  {
    name: 'Payment Name',
    selector: (row) => row['Payment Name'],
    sortable: true,
    center: false,
  },
  {
    name: 'Payment Type',
    selector: (row) => row['Payment Type'],
    sortable: true,
    center: false,
  },
  {
    name: 'Payment Enabled',
    selector: (row) => row['Payment Enabled'],
    sortable: true,
    center: false,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    sortable: true,
    center: false,
  },
];