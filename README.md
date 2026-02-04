# OVERKILL TODO PROJECT

This project is to show my progress in creating a simple app like todo but with added complexity to show how to implement authentication, testing, logging and error handling in a web api enviroment.

## Tools and Frameworks

- NodeJS
- Express
- WebPack (I know node supports native typescript support)
- Jest (For testing)
- Winstion (For logging) 
- Better-Auth (For handling authentication)
- Prisma
- MongoDB
- Docker

## Getting started

### Cloning the project
``` sh 
git clone https://github.com/mikek1337/mid-level-project.git
```

### Setting up the database
``` 
docker compose up -d
```
this will setup the mongodb database with replica-set

### Installing dependencies 
```sh
pnpm install
```

### Enviromental variables
```
PORT=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
DATABASE_URL=
```
Note: make sure your URL for the database is proper for Prisma mongodb connection string

### Setting up the collection for MongoDB

```sh
pnpm prisma db push
pnpm prisma generate
```

### Building the project
```sh
pnpm build
```

### Running the server
```sh
pnpm start
```












