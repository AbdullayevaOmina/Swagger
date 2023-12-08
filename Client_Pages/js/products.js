document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("clientLoginToken")}`,
  };
  let div = document.querySelector("#nimadir");

  try {
    const response = await axios.get("/products", { headers });

    response.data.forEach((element) => {
      let card = `<div class="card my-3">
          <div class="card-header">
            <img style="max-width: 199px;" class="card-img" src="${element.image}" alt="..." />
          </div>
          <div class="card-body">
            <p>
              <b>Name:</b> ${element.name.uz}
            </p>
            <p>
              <b>Price:</b> 💲${element.price}
            </p>
          </div>
        </div>`;

      div.innerHTML += card;
    });
  } catch (error) {
    console.error(error);
  }
});
