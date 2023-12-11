document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let swaggerToken = localStorage.getItem("swaggerToken");
  const headers = {
    Authorization: `Bearer ${swaggerToken}`,
  };

  let users = document.querySelector("tbody");
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let phone = form[1].value;
    let password = form[2].value;

    try {
      await axios.post(
        "/users",
        {
          name: name,
          phoneNumber: phone,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${swaggerToken}`,
          },
        }
      );

      console.log(swaggerToken);
    } catch (error) {
      console.error(error);
    }

    form.reset();
  });

  try {
    const response = await axios.get("/users", { headers });
    console.log(response);

    response.data.forEach((element, index) => {
      let user = `<tr>
              <th scope="row">${index + 1}</th>
              <td>${element.name}</td>
              <td>${element.phoneNumber}</td>
              <td>${element.password}</td>
              <td>${element._id}</td>
            </tr>`;

      users.innerHTML += user;
    });
  } catch (error) {
    console.error(error);
  }
});
