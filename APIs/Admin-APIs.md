- Only the admin is authorized to perform the following APIs
- All request dates are to be sent in the format of string obtained from the `input type=date` using `e.target.value` {"2022-04-06"}
- All response date can be parsed in JS; for example: `new Date("2022-04-06T17:07:07.994806Z")`
- Whenever `""` is mentioned, use an empty string `""` to get all results without filter

================================================

# Assign a role to a user

## Request

```
post("api/admin/assignRoles")
```

### Request Data

Email: string
Role: one of [Admin, Customer] (case sensetive)

## Response

Status Code 200 successful
status code 404 if user is not found with a response body `"User not found"`
status code 400 if role is not from the optinos
status code 406: the user is already assined with the role

=====================================================================

# Get a list of customers

## Request

```
post("api/admin/getCustomerActivities")
```

### Request Data

email : string or ""
status: string or ""
joiningDate: string in the format got from `e.target.value` from `input type date` or ""

## Response

Array of

```
{
"email":string {"amir.latif.programming@outlook.com"},
"orders":[],
"cartContent":[],
"reviews":[],
"joiningDate": string
}
```

=====================================================================

# Manage Customer status

## Request

```
post('manageCustomer')
```

### Request Data

email: string
status one of ["Active", "Deactivated", "Suspended"] (case sensetive)

## Response

status code 200 if successful
status 404 if user does not exist with a response body `"User does not exist"`
status 400 if the status is not from the options
=====================================================================

# Get a list of Products

## Request

```
fetch("api/admin/getProducts")
```

## Response

Array of

```
 {
 productId,
Name,
Description,
category,
brand,
Price,
Color,
Reviews,
orderId (associated with this product),
DateAdded,
StockAvailability,
DateReturned,
ReasonOfReturn,
}
```

- empty array means no products are present

=====================================================================

# Get a list of Orders

## Request

```
post("api/admin/getOrders")
```

### Request Data

orderStatus: one of {"UnderReview", "OnTheWay", "Cancelled", "Delivered"}(case sensetive) || "",
status: string || "",
joiningDate: string || "",

## Response

Array of

```
 {

}
```

- empty array means no orders are present

====================================================

# Manage product (add, remove, update)

## Request

```

  post("api/admin/manageProduct")
```

### Request data

to be formatted as in the APIs file & index.html noting the following
images and color inputs are optional
action is mandatory and to be one of ["Add", "Remove", "Update"] (case sensetive)

## Response

status 200 if successful
status 400 with the error in the response body

====================================================

# Manage Order

## Request

```
  post("api/admin/manageOrderStatus")
```

### Request data

orderId: string
status: one of ["UnderReview", "OnTheWay", "Cancelled", "Delivered"] (Case Sensetive)

## Response

status 200 if successful
status 400 if status is not of the options
status 404 if orderId is incorrect

====================================================

# Get Stats

## Request

```
  post("api/admin/getStats")
```

### Request data

criteria: one of ["UsersCount" (without suspended users), "OrdersCount", "TotalIncome" (in last 7 days), "NewCustomersCount" (in last 7 days), "TodayOrdersCount"]

## Response

status 200 if successful
status 400 if criteria is not of the options

====================================================

# Manage Category

## Request

```
  post("api/admin/manageCategory")
```

### Request data

to be formatted as in the APIs file & index.html noting the following
images and color inputs are optional
action is mandatory and to be one of ["Add", "Remove", "Update"] (case sensetive)

## Response

status 200 if successful
status 400 if action is not of the options
status 405 with a response body "category already exists"

====================================================

# Manage Brand

## Request

```
  post("api/admin/manageBrand")
```

### Request data

to be formatted as in the APIs file and index.html noting the following
images and color inputs are optional
action is mandatory and to be one of ["Add", "Remove", "Update"] (case sensetive)

## Response

status 200 if successful
status 400 if action is not of the options
status 405 with a response body "brand already exists"

====================================================

# Manage Voucher

## Request

```
  post("api/admin/manageVoucher")
```

### Request data

to be formatted as in the APIs file and index.html noting the following
images and color inputs are optional
action is mandatory and to be one of ["Add", "Remove", "Update"] (case sensetive)

## Response

status 200 if successful
status 400 for wrong request data with response body
====================================================
