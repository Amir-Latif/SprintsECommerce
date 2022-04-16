document.getElementById("assignRole").addEventListener("click", function () {
  fetch("api/admin/assignRole", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "amir.latif.programming@outlook.com",
      role: "Admin",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document
  .getElementById("getCustomerActivities")
  .addEventListener("click", function () {
    fetch("api/admin/getCustomerActivities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "amir.latif.programming@outlook.com",
        status: "active",
        joiningDate: "2022-04-06",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

//====================================================================

document
  .getElementById("manageCustomer")
  .addEventListener("click", function () {
    fetch("api/admin/manageCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "amir.latif.programming@outlook.com",
        status: "Active",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

//====================================================================

document.getElementById("getProducts").addEventListener("click", function () {
  fetch("api/admin/getProducts")
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document.getElementById("getOrders").addEventListener("click", function () {
  fetch("api/admin/getOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderStatus: "UnderReview",
      userEmail: "amir.latif.programming@outlook.com",
      creationDate: "2022-04-06",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});

//====================================================================

document
  .getElementById("manageProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("api/admin/manageProduct", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
  });

//====================================================================

document.getElementById("manageOrderStatus").addEventListener("click", function () {
  fetch("api/admin/manageOrderStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: "",
      status: "amir.latif.programming@outlook.com",
    }),
  });
});

//====================================================================

document.getElementById("getStats").addEventListener("click", function () {
  fetch("api/admin/getStats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      criteria: "UsersCount",
    }),
  });
});

//====================================================================

document
  .getElementById("manageCategoryForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("api/admin/manageCategory", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
  });

//====================================================================
document
  .getElementById("manageBrandForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("api/admin/manageBrand", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
  });
//====================================================================
document
  .getElementById("manageVoucher")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    fetch("api/admin/manageVoucher", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
  });