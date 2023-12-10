document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("clientLoginToken")}`,
  };
  let form = document.querySelector("form");
  let div = document.querySelector("#nimadir");

  async function UIproduct(data) {
    data.forEach((element) => {
      let card = `<div class="card">
          <div class="card-head p-2">
            <img
              class="card-img"
              src="${element.image}"
              alt=""
            />
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="border border-danger aravacha rounded">
                <button class="btn btn-danger border border-white">
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
              <div class="d-flex align-items-center fs-3">
                <i id="like" class="fa-regular fa-heart like"></i>
              </div>
              
            </div>

            <h5 class="my-2 mt-3 text-center text-white">${element.name.uz}</h5>
            <h6 class="text-primary text-center">$ ${element.price}</h6>
          </div>
        </div>`;

      div.innerHTML += card;
    });
  }

  async function searchProducts(query) {
    div.innerHTML = "";
    try {
      let { data: products } = await axios.get("/products/search", {
        params: { q: query },
        headers: headers,
      });

      if (products.length > 0) {
        UIproduct(products);
      } else {
        div.innerHTML =
          "<h3 class='w-100 text-white text-center mt-5'>No products found.</h3>";
      }
    } catch (error) {
      console.error(error);
    }
  }

  form.addEventListener("keyup", async (e) => {
    let searchQuery = form[0].value.trim();
    if (searchQuery.length > 0) {
      searchProducts(searchQuery);
    } else {
      let { data: allProducts } = await axios.get("/products", headers);
      UIproduct(allProducts);
    }
  });
});
