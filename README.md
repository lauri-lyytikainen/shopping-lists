# Project 1: Shared shopping list

The project is hosted at: https://shopping-lists-6e9v.onrender.com
> The site may load slowly because a free tier but once it starts up it works normally

## About the project

This project is a web application that provides its users with shared shopping lists that can be edited by multiple users at the same time. The application is built using deno, eta, and postgresql inside Docker containers. It is hosted on Render.

For styling it uses UIKit.


## Running the application

The application can be ran locally using the following command:

```
$ docker-compose up
```

> The default address is http://localhost:7777

### Tests
The e2e tests can be ran using the following command:

```
$ docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```

> ❗ The e2e tests may fail if the application is not initialized first with the 
> earlier command.


## Project structure

The project is structured in a way that the three tier 
architecture is followed. Eta views, controllers, and 
services are separated into their own folders. The 
database connection is also separated into its own folder. The 
database schemas and migrations are handled by flyway. 
The e2e tests are located in the `e2e-playwright` 
folder.