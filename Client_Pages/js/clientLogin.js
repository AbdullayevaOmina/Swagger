document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      let { data } = await axios.post("/auth/client-login", {
        phoneNumber: form[0].value,
        password: form[1].value,
      });

      // console.log(data.token);

      localStorage.setItem("clientLoginToken", data.token);

      window.location.replace("../html/products.html");
    } catch (error) {
      console.error(error);
    }

    form.reset();
  });
});
