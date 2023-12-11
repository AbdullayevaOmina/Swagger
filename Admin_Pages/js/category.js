document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("swaggerToken")}`,
  };

  let form = document.querySelector("form");
  let tbody = document.querySelector("tbody");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let uz = form[0].value;
    let ru = form[1].value;
    let img = form[2].value;

    try {
      await axios.post(
        "/categories",
        {
          uz: uz,
          ru: ru,
          image: img,
        },
        {
          headers: headers,
        }
      );

      console.log(swaggerToken);
    } catch (error) {
      console.error(error);
    }

    form.reset();
  });

  try {
    const response = await axios.get("/categories", { headers: headers });

    console.log(response.data);

    response.data.forEach((element, index) => {
      let tr = `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element.uz}</td>
                    <td>${element.ru}</td>
                    <td><img class="img" src="${element.image}" alt=""></td>
                    <td>${element._id}</td>
                  </tr>`;

      tbody.innerHTML += tr;
    });
  } catch (error) {
    console.error(error);
  }
});
