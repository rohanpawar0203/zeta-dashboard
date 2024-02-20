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

const DynPagination = ({ totalCount, switchPage }) => {
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
    let pages = Math.ceil(totalCount / limit);
    pages && settotalPages(pages);
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

  return (
    <div
      style={{ margin: "10px 0px", padding: "0 15px" }}
      className="w-100 d-flex gap-2 align-items-center flex-wrap justify-content-between"
    >
      <div
        style={{ height: "32px" }}
        className="d-flex gap-3 align-items-center"
      >
        {totalCount > 25 && (
          <Input
            style={{ fontSize: "13px", color: "teal", width: "100px" }}
            onChange={(e) => {
              setlimit(e?.target?.value);
              setPage(1);
              executeSwitchChange();
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
                href="#javascript"
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
              <PaginationItem key={uuid()} active={page === ind + 1}>
                <PaginationLink
                  href="#javascript"
                  onClick={() => {
                    setPage(ind + 1);
                    executeSwitchChange();
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
    </div>
  );
};

export default DynPagination;
