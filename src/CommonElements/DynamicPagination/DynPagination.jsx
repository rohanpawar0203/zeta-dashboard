import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  Input,
} from "reactstrap";
import { Previous, Next } from "../../Constant";
import { v4 as uuid } from "uuid";
import ScrollBar from "react-perfect-scrollbar";

const DynPagination = ({ totalCount, switchPage }) => {
  const [page, setPage] = useState('');
  const [totalPages, settotalPages] = useState(0);
  const [limit, setlimit] = useState('');
  const [records, setRecords] = useState({ str: 1, las: 1 });

  const handlePageChange = (eventType) => {
    if (eventType === "NEXT" && page < totalPages) {
      setPage((pre) => pre + 1);
    }
    if (eventType === "PREVIOUS" && page > 1) {
      setPage((pre) => pre - 1);
    }
    executeSwitchChange({page , limit});
  };

  const executeSwitchChange = ({page, limit}) => {
      if (page && limit) {
        switchPage(page, limit);
  }
};

  useEffect(() => {
    if(totalCount && limit){
    let pages = Math.ceil(totalCount / limit);
    pages && settotalPages(pages);
    }
  }, [totalCount, limit]);

  useEffect(() => {
    if (page && limit) {
      let limitVal = Number(limit);
      let init = (page - 1) * limitVal + 1;
      let end =
        totalCount < (page - 1) * limitVal + limitVal
          ? totalCount
          : (page - 1) * limitVal + limitVal;
      init &&
        end &&
        setRecords((pre) => ({
          str: init,
          las: end,
        }));
    }
  }, [page, limit]);

  useEffect(() => {
    if(!page && !limit){
      setlimit(25);
      setPage(1);
    }
  }, [])
  
  

  return (
    <ScrollBar style={{height: 'auto',  zIndex: '3', padding: "10px"}}
      className="w-100 d-flex align-items-center justify-content-between flex-wrap">
      <div
        style={{ height: "32px" }}
        className="d-flex gap-3 align-items-center mb-1"
      >
        {totalCount > 25 && (
          <Input
            style={{ fontSize: "13px", color: "teal", width: "100px" }}
            onChange={(e) => {
              let val = +e?.target?.value;
              setlimit(pre => (val));
              setPage(1);
              executeSwitchChange({page: page, limit: val});
            }}
            className="form-control form-control-primary-fill btn-square"
            name="select"
            type="select"
            value={limit}
          >
            <option
              style={{ fontSize: "12px", fontWeight: "500" }}
              value={null}
            >
              Rows
            </option>
            <option
              style={{ fontSize: "12px", fontWeight: "500" }}
              key={uuid()}
              value={25}
            >
              25
            </option>
            <option
              style={{ fontSize: "12px", fontWeight: "500" }}
              key={uuid()}
              value={50}
            >
              50
            </option>
            {totalCount > 50 && (
              <option
                style={{ fontSize: "12px", fontWeight: "500" }}
                key={uuid()}
                value={75}
              >
                75
              </option>
            )}
            {totalCount > 75 && (
              <option
                style={{ fontSize: "12px", fontWeight: "500" }}
                key={uuid()}
                value={100}
              >
                100
              </option>
            )}
          </Input>
        )}
        <div
          style={{ width: "150px", height: "100%" }}
          className="ml-1  d-flex align-items-center"
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "teal",
              margin: "0",
            }}
          >{`${records["str"]}-${records["las"]}  of  ${totalCount}`}</p>
        </div>
      </div>

      <Pagination aria-label="Page navigation example">
        <ul
          style={{ display: "flex" }}
          className="pagination-sm pagination-primary"
        >
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  handlePageChange("PREVIOUS");
                }}
                style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
              >
                <span aria-hidden="true">«</span>
              </PaginationLink>
            </PaginationItem>
          )}

          {totalPages &&
            totalPages > 0 &&
            new Array(totalPages)?.fill("0")?.map((item, ind) => (
              <PaginationItem key={uuid()} active={page === (ind + 1)}>
                <PaginationLink
                  onClick={() => {
                    setPage(pre => (ind + 1));
                    executeSwitchChange({page: (ind+1), limit});
                  }}
                >{`${ind + 1}`}</PaginationLink>
              </PaginationItem>
            ))}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  handlePageChange("NEXT");
                }}
                style={{
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                }}
              >
                <span aria-hidden="true">»</span>
              </PaginationLink>
            </PaginationItem>
          )}
        </ul>
      </Pagination>
      </ScrollBar>
  );
};

export default DynPagination;
