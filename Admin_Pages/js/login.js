document.addEventListener("DOMContentLoaded", async function () {
  let form = document.querySelector("form");
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let phone = form[0].value;
    let password = form[1].value;

    try {
      let response = await axios.post("/auth", {
        phoneNumber: phone,
        password: password,
      });

      let swaggerToken = response.data.token;

      localStorage.setItem("swaggerToken", swaggerToken);

      // console.log(swaggerToken);

      window.location.replace("../html/users.html");
    } catch (error) {
      console.error(error);
    }

    form.reset();
  });
});
