document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let swaggerToken = localStorage.getItem("swaggerToken");
  const headers = {
    Authorization: `Bearer ${swaggerToken}`,
  };
  
});
