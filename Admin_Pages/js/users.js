document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let swaggerToken = localStorage.getItem("swaggerToken");
  const headers = {
    Authorization: `Bearer ${swaggerToken}`,
  };

  let usersSection = document.querySelector("#users");
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
    const response = await axios.get("/users", {
      headers,
    });
    console.log(response.data);
    response.data.forEach((element, index) => {
      let card = `<div class="card my-3 d-flex">
			<div class="card-body">
			<p>${index + 1}</p>
			<h2>${element.name}</h2>
			<p>${element.phoneNumber}</p>
			</div>
			</div>`;

      usersSection.innerHTML += card;
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});
