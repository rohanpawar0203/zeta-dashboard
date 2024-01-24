import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, CardBody, Col, Media, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { PlusSquare, Upload, card } from "react-feather";
import { H4, H6, LI, P, UL, Image, H5, H3 } from "../../AbstractElements";
import errorImg from "../../assets/images/search-not-found.png";
import TurnoverChart from "../Widgets/ChartsWidgets/TurnoverChart";
import {
  AddNew,
  AllFiles,
  Files,
  Folders,
  RecentlyOpenedFiles,
} from "../../Constant";
import {
  BoxSvg,
  BoxSvg1,
  CancelledSvg,
  CancelledSvg1,
  DollerSvg,
  MessageSvg,
  NewUsersSvg,
  PendingSvg,
  PendingSvg1,
  ProductSvg,
  TruckSvg,
  TruckSvg1,
} from "../Widgets/SvgIcons";
import { connectWithSocketIOServer } from "../Live Chats/Client/wss";
import { WhatsAppAnalyticsAPI } from "../../api";
import appStore from "../Live Chats/Client/AppStore";
import { Bar } from "react-chartjs-2";
import Chart from "react-apexcharts";
import configDB from "../../Config/Theme-Config";
import { apiCall } from "./chartData";

const DashboardContent = () => {
  const { userData } = appStore();
  // const userDataToken = JSON.parse(appStore);
  const [chatSeries, setChatSeries] = useState([
    {
      data: [],
    },
  ]);
  const [chatOptions, setChatOptions] = useState({
    chart: {
      height: 350,
      type: "column",
      animations: {
        enabled: true,
        easing: "easein",
        speed: 800,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        rowWidth: "100%",
        // dataLabels: {
        //   position: "bottom", // top, center, bottom
        // },
      },
    },
    stroke: {
      width: 1,
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val;
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    // yaxis: {
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     show: false,
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
    title: {
      text: "No of chat session. (per day)",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
    responsive: [
      {
        breakpoint: 360,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
    legend: {
      position: "top",
    },
  });

  const [cartSeries, setCartSeries] = useState([
    {
      data: [],
    },
  ]);
  const [cartOptions, setCartOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easein",
        speed: 800,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        // dataLabels: {
        //   position: "bottom", // top, center, bottom
        // },
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val;
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    // yaxis: {
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     show: false,
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
    title: {
      text: "No of carts. (per day)",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  const [orderSeries, setOrderSeries] = useState([
    {
      data: [],
    },
  ]);
  const [orderOptions, setOrderOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easein",
        speed: 800,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        // dataLabels: {
        //   position: "bottom", // top, center, bottom
        // },
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val;
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    // yaxis: {
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     show: false,
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
    title: {
      text: "No of orders. (per day)",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  const [chatHourSeries, setChatHourSeries] = useState([
    {
      data: [],
    },
  ]);
  const [chatHourOptions, setChatHourOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easein",
        speed: 800,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: false,
        // dataLabels: {
        //   position: "bottom", // top, center, bottom
        // },
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val;
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    // yaxis: {
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     show: false,
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
    title: {
      text: "No of chats. (per hour)",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  const [trendingSeries, setTrendingSeries] = useState([
    {
      data: [],
    },
  ]);
  const [trendingOptions, setTrendingOptions] = useState({
    chart: {
      height: 350,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easein",
        speed: 800,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        // dataLabels: {
        //   position: "bottom", // top, center, bottom
        // },
      },
    },
    dataLabels: {
      enabled: false,
      // formatter: function (val) {
      //   return val;
      // },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    // yaxis: {
    //   axisBorder: {
    //     show: false,
    //   },
    //   axisTicks: {
    //     show: false,
    //   },
    //   labels: {
    //     show: false,
    //     formatter: function (val) {
    //       return val;
    //     },
    //   },
    // },
    title: {
      text: "Trending Products",
      floating: false,
      offsetY: 0,
      align: "center",
      style: {
        color: "#444",
      },
    },
  });

  // useEffect(async () => {
  // }, []);

  useEffect(async () => {
    connectWithSocketIOServer();

    let getChatData = await apiCall(
      userData._id,
      "no-of-chat-session-each-day"
    );
    getChatData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getChatData.length !== 0) {
      setChatOptions((prevOptions) => {
        const newOptions = getChatData.map((element) =>
          new Date(element._id).getDate()
        );
        return {
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: [...prevOptions.xaxis.categories, ...newOptions],
          },
        };
      });

      setChatSeries((prevSeries) => {
        const newSeriesData = getChatData.map((element) => element.count);
        return [
          {
            ...prevSeries[0],
            data: [...prevSeries[0].data, ...newSeriesData],
          },
        ];
      });
    }

    let getCartData = await apiCall(userData._id, "no-of-carts-each-day");
    getCartData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getCartData.length !== 0) {
      setCartOptions((prevOptions) => {
        const newOptions = getCartData.map((element) =>
          new Date(element._id).getDate()
        );
        return {
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: [...prevOptions.xaxis.categories, ...newOptions],
          },
        };
      });

      setCartSeries((prevSeries) => {
        const newSeriesData = getCartData.map((element) => element.count);
        return [
          {
            ...prevSeries[0],
            data: [...prevSeries[0].data, ...newSeriesData],
          },
        ];
      });
    }

    let getOrderData = await apiCall(userData._id, "no-orders-for-each-day");
    getOrderData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getOrderData.length !== 0) {
      setOrderOptions((prevOptions) => {
        const newOptions = getOrderData.map((element) =>
          new Date(element._id).getDate()
        );
        return {
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: [...prevOptions.xaxis.categories, ...newOptions],
          },
        };
      });

      setOrderSeries((prevSeries) => {
        const newSeriesData = getOrderData.map((element) => element.count);
        return [
          {
            ...prevSeries[0],
            data: [...prevSeries[0].data, ...newSeriesData],
          },
        ];
      });
    }

    let getChatHourData = await apiCall(userData._id, "no-chats-for-each-hour");
    // getChatHourData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getChatHourData.length !== 0) {
      getChatHourData.forEach((dayData) => {
        const newSeries = [];
        const newXAxisCategories = [];
        const day = new Date(dayData._id).toLocaleDateString();
        newXAxisCategories.push(day);
        const seriesData = {
          name: day,
          data: [],
        };
        dayData.chatCount.forEach((hourData) => {
          seriesData.data.push(hourData.count);
        });

        newSeries.push(seriesData);
        setChatHourSeries(newSeries);
      });
      setChatHourOptions((prevOptions) => {
        const newOptions = getChatHourData.map((element) =>
          new Date(element._id).getDate()
        );
        return {
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: [...prevOptions.xaxis.categories, ...newOptions],
          },
        };
      });
    }

    let getTrendingProductData = await apiCall(
      userData._id,
      "products-searched-for-each-day"
    );
    getTrendingProductData
      .sort((a, b) => new Date(a.count) - new Date(b.count))
      .reverse();
    // getTrendingProductData.reverse();
    if (getOrderData.length !== 0) {
      setTrendingOptions((prevOptions) => {
        const newOptions = getTrendingProductData.map(
          (element) => element._id.productName
        );
        return {
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: [...prevOptions.xaxis.categories, ...newOptions],
          },
        };
      });

      setTrendingSeries((prevSeries) => {
        const newSeriesData = getTrendingProductData.map(
          (element) => element.count
        );
        return [
          {
            ...prevSeries[0],
            data: [...prevSeries[0].data, ...newSeriesData],
          },
        ];
      });
    }
  }, []);

  return (
    <Fragment>
      <Col sm="6" xl="5" lg="10" style={{ marginBottom: "10px" }}>
        <Card className="o-hidden">
          <CardBody>
            <Chart
              key="chat"
              options={chatOptions}
              series={chatSeries}
              type="bar"
              width={"100%"}
              height={380}
            />
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" xl="5" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Chart
              key="order"
              options={orderOptions}
              series={orderSeries}
              type="bar"
              width={"100%"}
              height={380}
            />
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" xl="5" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Chart
              key="cart"
              options={cartOptions}
              series={cartSeries}
              type="bar"
              width={"100%"}
              height={380}
            />
          </CardBody>
        </Card>
      </Col>

      <Col sm="6" xl="5" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Chart
              key="cart"
              options={chatHourOptions}
              series={chatHourSeries}
              type="area"
              width={"100%"}
              height={380}
            />
          </CardBody>
        </Card>
      </Col>

      <Col sm="6" xl="11" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Chart
              key="cart"
              options={trendingOptions}
              series={trendingSeries}
              type="bar"
              width={"100%"}
              height={380}
            />
          </CardBody>
        </Card>
      </Col>

      {/* <Col sm="6" xl="3" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Media className="static-widget">
              <Media body>
                <H4 attrH6={{ className: "font-roboto" }}>
                  Messages <br /> Delivered
                </H4>
                <H5 attrH4={{ className: "mb-0 counter" }}>
                  <CountUp end={whatsAppAnalytics?.whatsappDeliveredCount} />
                </H5>
              </Media>
              <MessageSvg />
            </Media>
            <div className="progress-widget">
              <div className="progress sm-progress-bar progress-animate">
                <div
                  className={"progress-gradient-success"}
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <span className="animate-circle"></span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" xl="3" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Media className="static-widget">
              <Media body>
                <H4 attrH6={{ className: "font-roboto" }}>
                  Messages <br /> Read
                </H4>
                <H5 attrH4={{ className: "mb-0 counter" }}>
                  <CountUp end={whatsAppAnalytics?.whatsappReadCount} />
                </H5>
              </Media>
              <MessageSvg />
            </Media>
            <div className="progress-widget">
              <div className="progress sm-progress-bar progress-animate">
                <div
                  className={"progress-gradient-primary"}
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <span className="animate-circle"></span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="6" xl="3" lg="10">
        <Card className="o-hidden">
          <CardBody>
            <Media className="static-widget">
              <Media body>
                <H4 attrH6={{ className: "font-roboto" }}>
                  Messages <br /> Sent
                </H4>
                <H5 attrH4={{ className: "mb-0 counter" }}>
                  <CountUp end={whatsAppAnalytics?.whatsappSentCount} />
                </H5>
              </Media>
              <MessageSvg />
            </Media>
            <div className="progress-widget">
              <div className="progress sm-progress-bar progress-animate">
                <div
                  className={"progress-gradient-success"}
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <span className="animate-circle"></span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col> */}
    </Fragment>
  );
};
export default DashboardContent;
