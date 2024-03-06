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
  Primary,
  RecentlyOpenedFiles,
} from "../../Constant";
import {
  BoxSvg,
  BoxSvg1,
  CancelledSvg,
  CancelledSvg1,
  MessageSvg,
  NewUsersSvg,
  PendingSvg,
  PendingSvg1,
  TruckSvg,
  TruckSvg1,
} from "../Widgets/SvgIcons";
import { connectWithSocketIOServer } from "../Live Chats/Client/wss";
import { TotalOrdersCountAPI, WhatsAppAnalyticsAPI } from "../../api";
import appStore from "../Live Chats/Client/AppStore";
import { Bar } from "react-chartjs-2";
import Chart from "react-apexcharts";
import configDB from "../../Config/Theme-Config";
import { apiCall } from "./chartData";
import { ProductSvg, DollerSvg } from "./Elements/svgs/Product";
import {
  apexBarChart,
  apexColumnChartsone,
} from "../Charts/apexCharts/apexData";

const DashboardContent = () => {
  const { userData, token } = appStore();
  const [user_id, setUser_id] = useState(userData?.userId ? userData?.userId :  userData?._id);
  const [orderInfo, setorderInfo] = useState({});
  // const userDataToken = JSON.parse(appStore);
  const [chatSeries, setChatSeries] = useState([]);
  const [chatOptions, setChatOptions] = useState({});

  const [cartSeries, setCartSeries] = useState([]);
  const [cartOptions, setCartOptions] = useState({});

  const [orderSeries, setOrderSeries] = useState([]);
  const [orderOptions, setOrderOptions] = useState({});

  const [chatHourSeries, setChatHourSeries] = useState([]);
  const [chatHourOptions, setChatHourOptions] = useState({});

  const [trendingSeries, setTrendingSeries] = useState([]);
  const [trendingOptions, setTrendingOptions] = useState({});

  const getTotalOrdersCount = async () => {
    try {
      const res = await axios.get(
        `${TotalOrdersCountAPI}/${user_id}/orders-till-now/data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === "200" || res?.status === 200) {
        let result = res?.data?.data[0];
        setorderInfo(result);
      }
    } catch (error) {
      console.log("cancelled", error);
    }
  };

  useEffect(() => {
    getTotalOrdersCount();
  }, []);

  useEffect(async () => {
    // connectWithSocketIOServer();

    let getChatData = await apiCall(
      user_id,
      "no-of-chat-session-each-day"
    );
    getChatData?.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getChatData.length !== 0) {
      const newOptions = getChatData?.map((element) =>
        new Date(element._id).getDate()
      );
      const newSeriesData = getChatData?.map((element) => element.count);

      setChatOptions({
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 360,
            options: {
              chart: {
                offsetY: 10,
              },
            },
          },
        ],
        // colors: [Primary],
        xaxis: {
          categories: newOptions,
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
        },
        title: {
          text: "No of chats. (per day)",
          floating: false,
          offsetY: 0,
          align: "center",
          style: {
            color: "#444",
          },
        },
      });

      setChatSeries([
        {
          data: newSeriesData,
        },
      ]);
    }

    let getCartData = await apiCall(user_id, "no-of-carts-each-day");
    getCartData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getCartData.length !== 0) {
      const newOptions = getCartData.map((element) =>
        new Date(element._id).getDate()
      );
      const newSeriesData = getCartData.map((element) => element.count);

      setCartOptions({
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 360,
            options: {
              chart: {
                offsetY: 10,
              },
            },
          },
        ],
        // colors: [Primary],
        xaxis: {
          categories: newOptions,
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
        },
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
      setCartSeries([
        {
          data: newSeriesData,
        },
      ]);
    }

    let getOrderData = await apiCall(user_id, "no-orders-for-each-day");
    getOrderData.sort((a, b) => new Date(a._id) - new Date(b._id));
    if (getOrderData.length !== 0) {
      const newOptions = getOrderData.map((element) =>
        new Date(element._id).getDate()
      );
      const newSeriesData = getOrderData.map((element) => element.count);

      setOrderOptions({
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 360,
            options: {
              chart: {
                offsetY: 10,
              },
            },
          },
        ],
        // colors: [Primary],
        xaxis: {
          categories: newOptions,
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
        },
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
      setOrderSeries([
        {
          data: newSeriesData,
        },
      ]);
    }

    let getChatHourData = await apiCall(user_id, "no-chats-for-each-hour");
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
      const newOptions = getChatHourData.map((element) =>
        new Date(element._id).getDate()
      );
      setChatHourOptions({
        chart: {
          height: 350,
          type: "radialBar",
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
          categories: newOptions,
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
    }

    let getTrendingProductData = await apiCall(
      user_id,
      "products-searched-for-each-day"
    );
    getTrendingProductData
      .sort((a, b) => new Date(a.count) - new Date(b.count))
      .reverse();
    // getTrendingProductData.reverse();
    if (getOrderData.length !== 0) {
      const newOptions = getTrendingProductData.map(
        (element) => element._id.productName
      );
      const newSeriesData = getTrendingProductData.map(
        (element) => element.count
      );
      setTrendingOptions({
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 360,
            options: {
              chart: {
                offsetY: 10,
              },
            },
          },
        ],
        // colors: [Primary],
        xaxis: {
          categories: newOptions,
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
        },
        title: {
          text: "Trending products",
          floating: false,
          offsetY: 0,
          align: "center",
          style: {
            color: "#444",
          },
        },
      });
      setTrendingSeries([
        {
          data: newSeriesData,
        },
      ]);
    }
  }, []);

  return (
    <Fragment>
      <Row style={{ justifyContent: "space-evenly" }}>
        <Col sm="6" xl="3" lg="6" key={2}>
          <Card className="o-hidden">
            <CardBody>
              <Media className="static-widget">
                <Media body>
                  <H6 attrH6={{ className: "font-roboto" }}>
                    {"Total Orders"}
                  </H6>
                  <H4 attrH4={{ className: "mb-0 counter mt-4 text-center" }}>
                    <CountUp end={orderInfo?.noOfOrders} />
                  </H4>
                </Media>
              </Media>
              {/* <div className="progress-widget">
                    <div className="progress sm-progress-bar progress-animate">
                      <div className={"progress-gradient-success"} role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span className="animate-circle"></span></div>
                    </div>
                  </div> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" xl="3" lg="6" key={2}>
          <Card className="o-hidden">
            <CardBody>
              <Media className="static-widget">
                <Media body>
                  <H6 attrH6={{ className: "font-roboto" }}>
                    {"Total Order Value"}
                  </H6>
                  <H4 attrH4={{ className: "mb-0 counter  mt-4 text-center" }}>
                    <CountUp end={orderInfo?.totalOrderValue} />
                  </H4>
                </Media>
              </Media>
              {/* <div className="progress-widget">
                    <div className="progress sm-progress-bar progress-animate">
                      <div className={"progress-gradient-success"} role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span className="animate-circle"></span></div>
                    </div>
                  </div> */}
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" xl="3" lg="6" key={2}>
          <Card className="o-hidden">
            <CardBody>
              <Media className="static-widget">
                <Media body>
                  <H6 attrH6={{ className: "font-roboto" }}>
                    {"Avg Order Value"}
                  </H6>
                  <H4 attrH4={{ className: "mb-0 counter mt-4 text-center" }}>
                    <CountUp end={orderInfo?.averageOrderValue} />
                  </H4>
                </Media>
              </Media>
              {/* <div className="progress-widget">
                    <div className="progress sm-progress-bar progress-animate">
                      <div className={"progress-gradient-success"} role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><span className="animate-circle"></span></div>
                    </div>
                  </div> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Col sm="6" xl="5" lg="10" style={{ marginBottom: "10px" }}>
        <Card className="o-hidden">
          <CardBody>
            <div id="column-chart">
              <Chart
                options={chatOptions}
                series={chatSeries}
                type="bar"
                width={"100%"}
                height={380}
              />
            </div>
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
                <H5 attrH4={{ className: "mb-0  mt-2 text-center" }}>
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
                <H5 attrH4={{ className: "mb-0  mt-2 text-center" }}>
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
