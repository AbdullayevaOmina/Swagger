document.addEventListener("DOMContentLoaded", async function () {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("clientLoginToken")}`,
  };

  let div = document.querySelector("#korzinka");

  function UIproduct(data) {
    data.forEach((element) => {
      let card = `<div class="card">
        <div class="card-head">
          <img
            class="card-img"
            src="${element.image}"
            alt=""
          />
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <button class="fa-solid fa-cart-shopping btn btn-danger border-none iconbtn border-white"></button>
            <div class="d-flex align-items-center fs-3">
              <i class="fa-regular fa-heart like"></i>
            </div>
          </div>

          <h5 class="my-2 mt-3 text-center text-white">${element.name.uz}</h5>
          <h6 class="text-primary text-center">$ ${element.price}</h6>
          <button class="btn btn-outline-primary w-100 mt-3">Learn more</button>
        </div>
      </div>`;

      div.innerHTML += card;
    });

    document.querySelectorAll(".like").forEach((like) => {
      like.addEventListener("click", () => {
        like.classList.toggle("fa-regular");
        like.classList.toggle("fa-solid");
      });
    });

    document.querySelectorAll(".iconbtn").forEach((like) => {
      like.addEventListener("click", () => {
        like.classList.toggle("fa-cart-shopping");
        like.classList.toggle("fa-check");
        like.classList.toggle("btn-success");
        like.classList.toggle("btn-danger");
      });
    });
  }

  try {
    const response = await axios.get("/products", { headers });
    UIproduct(response.data);
  } catch (error) {
    console.error(error);
  }

});
