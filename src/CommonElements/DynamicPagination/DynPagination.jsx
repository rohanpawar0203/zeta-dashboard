import React, { useEffect, useState } from "react";
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

const DynPagination = ({ data, switchPage }) => {
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [limit, setlimit] = useState(25);
  const [records, setRecords] = useState({ str: 1, las: 1 });

  const handlePageChange = (eventType) => {
    if (eventType === "NEXT" && page < totalPages) {
      setPage((pre) => pre + 1);
    }
    if (eventType === "PREVIOUS" && page > 1) {
      setPage((pre) => pre - 1);
    }
    executeSwitchChange();
  };

  const executeSwitchChange = () => {
    setTimeout(() => {
      if (page && limit) {
        switchPage(page, limit);
      }
    }, 500);
  };

  useEffect(() => {
    let pages = Math.ceil(data?.length / 10);
    pages && settotalPages(pages);
  }, [data]);

  useEffect(() => {
    if (page && limit) {
      setRecords((pre) => ({
        str: (page - 1) * limit + 1,
        las: (page - 1) * limit + limit,
      }));
    }
  }, [page, limit]);

  return (
    <div style={{margin:'10px 0px', padding: '0 15px'}} className="w-100 d-flex align-items-center flex-wrap justify-content-between">
      <div style={{height: '32px'}} className="d-flex gap-3 align-items-center">
        {data?.length >= 1 && (
          <Input style={{fontSize: '13px', color: 'teal', width:'100px'}}
            onChange={(e) => {
              setlimit(e?.target?.value);
              executeSwitchChange();
            }}
            className="form-control form-control-primary-fill btn-square"
            name="select"
            type="select"
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
            {data?.length >= 50 && (
              <option
                style={{ fontSize: "12px", fontWeight: "500" }}
                key={uuid()}
                value={50}
              >
                50
              </option>
            )}
            {data?.length >= 75 && (
              <option
                style={{ fontSize: "12px", fontWeight: "500" }}
                key={uuid()}
                value={75}
              >
                75
              </option>
            )}
            {data?.length >= 100 && (
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
        <div style={{width: '150px', height: '100%'}}
          className="ml-1  d-flex align-items-center"
        >
          <p style={{ fontSize: "14px", fontWeight: "600", color: 'teal', margin:'0'}}>{`${records["str"]}-${records["las"]}  of  ${data?.length}`}</p>
        </div>
      </div>
      <Pagination aria-label="Page navigation example">
        <ul className="pagination pagination-sm pagination-primary">
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#javascript"
                onClick={() => {
                  handlePageChange("PREVIOUS");
                }}
              >
                <span aria-hidden="true">«</span>
              </PaginationLink>
            </PaginationItem>
          )}

          {totalPages &&
            totalPages > 0 &&
            new Array(totalPages)?.fill("0")?.map((item, ind) => (
              <PaginationItem key={uuid()} active={page === ind + 1}>
                <PaginationLink
                  href="#javascript"
                  onClick={() => {
                    setPage(ind + 1);
                  }}
                >{`${ind + 1}`}</PaginationLink>
              </PaginationItem>
            ))}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#javascript"
                onClick={() => {
                  handlePageChange("NEXT");
                }}
              >
                <span aria-hidden="true">»</span>
              </PaginationLink>
            </PaginationItem>
          )}
        </ul>
      </Pagination>
    </div>
  );
};

export default DynPagination;
