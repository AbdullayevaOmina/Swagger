document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("clientLoginToken")}`,
  };

  try {
    let { data } = await axios.get("/clients",{ headers: headers});

    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
