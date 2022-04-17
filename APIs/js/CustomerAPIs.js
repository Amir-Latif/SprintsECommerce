document.getElementById("register").addEventListener("click", function (e) {
  e.preventDefault();
  fetch("api/identity/register", {
    method: "POST",
    body: new FormData(e.currentTarget),
  }).then((response) => {
    if (response.ok) response.json();
    else response.json().then((data) => console.log(data.description));
  });
});

//====================================================================

document.getElementById("login").addEventListener("click", function () {
  fetch("api/identity/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "amir.latif.programming@outlook.com",
      password: "123456Aa@",
      RememberMe: true,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document.getElementById("logout").addEventListener("click", function () {
  fetch("api/identity/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
//====================================================================

document
  .getElementById("changePassword")
  .addEventListener("click", function () {
    fetch("api/identity/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "amir.latif.programming@outlook.com",
        currentPassword: "0123456Aa@",
        newPassword: "123456Aa@",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });
//====================================================================

document.getElementById("searchProduct").addEventListener("click", function () {
  fetch("api/product/searchProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "product",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document
  .getElementById("getCategoryProducts")
  .addEventListener("click", function () {
    fetch("api/product/getCategoryProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: "category" }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

//====================================================================

document.getElementById("addToCart").addEventListener("click", function () {
  fetch("api/product/addToCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: "c5ceca02-b0a6-49df-9bd3-ea23e0a3af9b",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document
  .getElementById("removeFromCart")
  .addEventListener("click", function () {
    fetch("api/product/removeFromCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: "c5ceca02-b0a6-49df-9bd3-ea23e0a3af9b",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

//====================================================================

document.getElementById("manageOrder").addEventListener("click", function () {
  fetch("api/product/manageOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      paymentMethod: "COD",
      voucher: "",
      orderId: "",
      action: "Add",
      productId: "",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document.getElementById("manageReview").addEventListener("click", function () {
  fetch("api/product/manageReview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      review: "some review",
      productId: "c5ceca02-b0a6-49df-9bd3-ea23e0a3af9b",
      rating: 2,
      action: "Add",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
