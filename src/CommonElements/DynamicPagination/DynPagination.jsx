import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Pagination, PaginationItem, PaginationLink, CardHeader } from 'reactstrap';
import { Previous, Next} from '../../Constant'
import {v4 as uuid} from 'uuid';

const DynPagination = ({data, switchPage}) => {
    const [page, setPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);

    const handlePageChange = (eventType) => {
        if(eventType === 'NEXT' && (page < totalPages)){
            setPage((pre) => (pre + 1));
        }
        if(eventType === 'PREVIOUS' && (page > 1)){
            setPage((pre) => (pre - 1));
        }
    }

    useEffect(() => {
      let pages = Math.ceil(data?.length / 10);
      pages && settotalPages(pages);
    }, [data]);

    useEffect(() => {
      if(page){
        switchPage(page);
      }
    }, [page])
    
    

  return (
    <Pagination aria-label="Page navigation example">
      <ul className="pagination pagination-sm pagination-primary">
      <PaginationItem>
      <PaginationLink href="#javascript" onClick={() => {handlePageChange('PREVIOUS')}}>{Previous}</PaginationLink>
      </PaginationItem>

        {totalPages && totalPages > 0 && 
        new Array(totalPages)?.fill('0')?.map((item, ind) => (
          <PaginationItem key={uuid()} active={page === (ind+1)}>
            <PaginationLink href="#javascript" onClick={() => {setPage(ind+1)}}>{`${ind + 1}`}</PaginationLink>
          </PaginationItem>
        ))
        }
        <PaginationItem>
          <PaginationLink href="#javascript" onClick={() => {handlePageChange('NEXT')}}>{Next}</PaginationLink>
        </PaginationItem>
      </ul>
    </Pagination>
  );
};

export default DynPagination;
