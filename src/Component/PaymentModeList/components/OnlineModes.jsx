import React, { Fragment } from 'react'
import { Card, CardHeader, Col } from 'reactstrap';

const OnlineModes = () => {
  return (
    <Fragment>
      <Col sm="12">
        <Card
          style={{
            height: "70vh",
            marginBottom: "5vh",
            overflow: "hidden",
            paddingBottom: "10vh",
          }}
        >
          <CardHeader className="w-100 d-flex justify-content-end">
              <div>
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() => {
                  }}
                >
                  Add New Mode
                </button>
              </div>
          </CardHeader>
        </Card>
        </Col>
        </Fragment>
  )
}



export default OnlineModes