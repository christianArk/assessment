# Introduction
This is a Nodejs expressJs api application

## Dependencies
- MongoDB
- Nodejs

## Installation
- Run the comand to install the dependencies

```bash
# install dependencies
npm install
```

- Create a **.env** file in the root directory (rs2.api)
- Copy the contents of **env.txt** and place in the new **.env** you created
- Change the values of the items e.g DB_URL and PORT if needed
- To start the application in development mode, run the command bellow

```bash
# run the application
npm run dev
```

- To build the application for deployment, run the command bellow

```bash
# Build for production and start
npm run build
npm run start
```

## Test Data

A seeder will populate the mongoDB database

### User Data

```
{
  loginName: "chris",
  password: "password"
}
```

### Product Data

```
[
    {
        name: "Eloquent Javascript",
        type: "Books",
        description: "Learn Javascript",
    },
    {
        name: "Mumford and Sons",
        type: "Music",
        description: "Babel Album",
    },
    {
        name: "Game of thrones",
        type: "Games",
        description: "Game of thrones",
    },
]
```
