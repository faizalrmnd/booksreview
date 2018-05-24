# Booksreview
A simple website where you can post book and share your opinion.

## Setup for demo

#### Create file .env:
```
SECRET=helohelo
CLOUD_BUCKET=ecommerce-faizal
GCLOUD_PROJECT=sharp-effort-200807
KEYFILE_PATH=My First Project-ab82cea39004.json
```

#### Get the My First Project-ab82cea39004.json from me!

### API

#### List of login routes:

| Route                    | HTTP | Description          |
| ------------------------ | ---- | -------------------- |
| `/register`              | POST | register             |
| `/login`                 | POST | login                |

#### List of book routes:

| Route                  | HTTP   | Description                           |
| ---------------------- | ------ | ------------------------------------- |
| `/book`             | GET    | Get all the books                  |
| `/book/:id`         | GET    | Get one book by id                 |
| `/book/find/:userid`      | POST    | Get books by poster                |
| `/book/post`        | POST   | Post a book                       |
| `/book/delete/:id`  | POST | Delete a book                     |
| `/book/vote`                 | PUT | to vote                |

#### List of review routes:

| Route                    | HTTP | Description          |
| ------------------------ | ---- | -------------------- |
| `/review`              | GET | get all reviews             |
| `/review/post`                 | POST | post a review                |
| `/review/delete`                 | POST | delete a review                |
| `/review/vote`                 | PUT | to vote                |

### Usage
#### With only npm:

```
npm install 
npm start --> on server folder
npm run serve --> on client folder
```