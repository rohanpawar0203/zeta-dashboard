import axios from "axios";

export const apiCall = async (userId, params) => {
  try {
    let token = sessionStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/analytics/${userId}/${params}/data?days=30`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    return response.data.data;
    // if (newData.length !== 0) {
    //   const newOptions = newData.map((element) =>
    //     new Date(element._id).getDate()
    //   );
    //   setChatOptions((prevOptions) => ({
    //     ...prevOptions,
    //     xaxis: {
    //       ...prevOptions.xaxis,
    //       categories: [...prevOptions.xaxis.categories, ...newOptions],
    //     },
    //   }));

    //   const newSeries = newData.map((element) => element.count);
    //   setChatSeries((prevSeries) => [
    //     {
    //       ...prevSeries[0],
    //       data: [...prevSeries[0].data, ...newSeries],
    //     },
    //   ]);
    // }
  } catch (error) {
    console.log("chat-session api", error);
    return error;
  }
};
