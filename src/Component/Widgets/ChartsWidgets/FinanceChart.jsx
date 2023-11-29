import React, { Fragment } from "react";
import ReactApexChart from "react-apexcharts";
import { Navigation } from "react-feather";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { H5 } from "../../../AbstractElements";
import { columnChart } from "../../../Pages/Widgets/Charts/WidgetChartsData";
import { Finance } from "../../../Constant";

const FinanceChart = () => {
  // const newData = [
  // [10, 20],
  // [10, 20],
  // [10, 20],
  // [10, 20],
  // [10, 20],
  // [10, 20],
  // ];
  // const data = {
  //   options: {
  //     chart: {
  //       height: 500,
  //       type: "bar",
  //       animations: {
  //         enabled: true,
  //         easing: "linear",
  //         dynamicAnimation: {
  //           speed: 1000,
  //         },
  //       },
  //       events: {
  //         animationEnd: function (chartCtx) {
  //           // const newData = chartCtx.w.config.series[0].data.slice();
  //           // newData.shift();
  //           window.setTimeout(function () {
  //             chartCtx.updateOptions(
  //               {
  //                 series: [
  //                   {
  //                     data: newData,
  //                   },
  //                 ],
  //                 xaxis: {
  //                   min: 10,
  //                   max: 100,
  //                 },
  //               },
  //               false,
  //               false
  //             );
  //           }, 300);
  //         },
  //       },
  //       toolbar: {
  //         show: false,
  //       },
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     legend: {
  //       show: true,
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     plotOptions: {
  //       bar: {
  //         radius: 10,
  //         horizontal: false,
  //         columnWidth: "80%",
  //         endingShape: "rounded",
  //       },
  //     },
  //     stroke: {
  //       width: 0,
  //     },
  //     // colors: [primary, "#fb2e63"],
  //     xaxis: {
  //       type: "datetime",
  //       range: 200,
  //     },
  //     yaxis: {
  //       decimalsInFloat: 1,
  //     },
  //     title: {
  //       text: "Load Average",
  //       align: "left",
  //       style: {
  //         fontSize: "12px",
  //       },
  //     },
  //     subtitle: {
  //       text: "20%",
  //       floating: true,
  //       align: "right",
  //       offsetY: 0,
  //       style: {
  //         fontSize: "22px",
  //       },
  //     },
  //     fill: {
  //       colors: ["blue"],
  //       //colors: ['#3ca1ba'],
  //       type: "gradient",
  //       gradient: {
  //         shade: "light",
  //         type: "vertical",
  //         shadeIntensity: 0.4,
  //         inverseColors: false,
  //         opacityFrom: 1,
  //         opacityTo: 0.9,
  //         stops: [0, 100],
  //       },
  //     },
  //     tooltip: {
  //       y: {
  //         formatter: function (val) {
  //           return "$ " + val + " thousands";
  //         },
  //       },
  //     },
  //     grid: {
  //       show: true,
  //       padding: {
  //         left: 4,
  //         right: 0,
  //       },
  //     },
  //   },
  //   series: [
  //     {
  //       name: "ULAI DATA",
  //       data: [
  //         [10, 20],
  //         [10, 20],
  //         [10, 20],
  //         [10, 20],
  //         [10, 20],
  //         [10, 20],
  //       ],
  //     },
  //   ],
  // };

  // console.log("DATA", columnChart.options, columnChart.series);
  return (
    <Fragment>
      <Col xl="5" lg="12" className="box-col-5">
        <Card>
          <CardHeader>
            <Row>
              <Col xs="9">
                <H5>{Finance}</H5>
              </Col>
              <Col xs="3" className="text-end">
                <Navigation className="text-muted" />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="chart-container">
              <div id="columnchart">
                <ReactApexChart
                  options={columnChart.options}
                  series={columnChart.options}
                  height="350"
                  type="bar"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};
export default FinanceChart;
