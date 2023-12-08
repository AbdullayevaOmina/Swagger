document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";

  let swaggerToken = localStorage.getItem("swaggerToken");
  const headers = {
    Authorization: `Bearer ${swaggerToken}`,
  };
  let form = document.querySelector("form");
  let div = document.querySelector("#nimadir");

  async function categoriesName(value) {
    const res = await axios.get("/categories", {
      headers: headers,
    });
    res.data.forEach((element) => {
      if (element.uz.toLowerCase() === value.toLowerCase()) {
        return element._id;
      }
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const categoryId = await categoriesName(form[8].value);
      await axios.post(
        "/products",
        {
          name: { uz: form[0].value, ru: form[1].value },
          price: form[2].value,
          color: { uz: form[3].value, ru: form[4].value },
          description: { uz: form[5].value, ru: form[6].value },
          image: form[7].value,
          category: categoryId,
        },
        {
          headers: headers,
        }
      );
      console.log(form[8].value);
    } catch (error) {
      console.error(error);
    }

    // form.reset();
  });



  try {
    const response = await axios.get("/products", {
      headers: headers,
    });
    console.log(response);

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
