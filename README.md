# Blogging Api

This Blogging Api is an examination project for AltSchool's Backend NodeJS Second Semester.

---

## Requirements

1. User should be able to register
2. User should be able to login with JWT
3. Authenticated users should be able to get all the published posts as well as drafts that belong to them
4. Authenticated users should be able to create post
5. Authenticated users should be able to update and delete only the posts that they have written
6. Both authenticated users and Not-logged-in users should be able to get all published posts regardless of who the authors are.
7. Test application

---

## Setup

- I made use of the YARN Package Manager
- I made use of MongoDB Atlas
- Install NodeJS
- pull this repo
- update env with .env
- run `yarn dev`

---

## Base URL

- https://blogging-app-altschool.herokuapp.com/

## Models

---

### User

| field     | data_type | constraints            |
| --------- | --------- | ---------------------- |
| password  | string    | required, minlength: 8 |
| email     | string    | required, unique       |
| firstname | string    | required               |
| lastname  | string    | required               |

### Blog

| field       | data_type | constraints                  |
| ----------- | --------- | ---------------------------- |
| title       | string    | required, unique             |
| description | string    | optional                     |
| author      | string    | optional                     |
| state       | string    | enum: ['draft', 'published'] |
| readCount   | number    | optional                     |
| readingTime | number    | optional                     |
| tags        | Array     | optional                     |
| body        | string    | required                     |

## APIs

---

### Signup User

- Route: https://blogging-app-altschool.herokuapp.com/api/v1/users/signup
- Method: POST
- Body:

```
{
  "password": "john1234",
  "email": "john@gmail.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

- Responses

Success

```
Hurray! Your sign up is successful!

```

---

### Login User

- Route: https://blogging-app-altschool.herokuapp.com/api/v1/users/login
- Method: POST
- Body:

```
{
  "password": "john1234",
  "email": "john@gmail.com"
}
```

- Responses

Success

```
`Hello ${user.firstName}! You've been logged in successfully.`
```

---

### Create Post

- Route: https://blogging-app-altschool.herokuapp.com/api/v1/posts
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
  "title": "The 9th post",
  "description": "A fantastic article",
  "author": "Jackson Adebayo",
  "body": "hello, world! Great to meet you.",
  "state": "draft"
}
```

- Responses

Success

```
{
  "status": "Your blog post has been created successfully",
  "Blog": {
    "title": "The 9th post",
    "description": "A fantastic article",
    "author": "Jackson Adebayo",
    "state": "draft",
    "tags": [],
    "body": "hello, world! Great to meet you.",
    "_id": "63674a991864dffcd24a43e4",
    "createdAt": "2022-11-06T05:48:09.990Z",
    "updatedAt": "2022-11-06T05:48:09.990Z",
    "__v": 0
  }
}
```

---

### Get All

- Route: https://blogging-app-altschool.herokuapp.com/api/v1/posts/
- Method: GET
- Header

  - Authorization: Bearer {token}

- Responses

Success

```
[
   {
    "tags": [],
    "_id": "6362e79470b6398e1cef71db",
    "title": "my first post",
    "description": "my first desc",
    "author": "Emmanuel Eni",
    "state": "draft",
    "body": "Hello readers, This is my first blog post",
    "timestamp": "2022-11-02T21:56:36.452Z",
    "__v": 0
  }
]
```

---

### Get List

- Route: https://blogging-app-altschool.herokuapp.com/api/v1/posts/post_list
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:

  - page (default: 1)
  - per_page (default: 20)
  - readCount
  - readingTime
  - state
  - timestamps

- Responses

Success

```
[
  {
    "title": "my second post",
    "state": "draft"
  },
  {
    "title": "my third post",
    "state": "published"
  },
]
```

---

...

## Contributor

- Emmanuel Eni
- eejeba@gmail.com
