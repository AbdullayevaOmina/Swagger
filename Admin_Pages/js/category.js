document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("swaggerToken")}`,
  };
  let form = document.querySelector("form");
  let div = document.querySelector("#nimadir");

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
    const response = await axios.get("/categories", {
      headers: headers,
    });

    response.data.forEach((element, index) => {
      let card = `<div class="card my-3">
			<div class="card-body d-flex justify-content-between">
			<p class="w-25"> ${index + 1}</p>
			<h4 class="w-50"> uz: ${element.uz}</h4>
			<h4 class="w-50"> ru: ${element.ru}</h4>
			</div>
			</div>`;

      div.innerHTML += card;
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
