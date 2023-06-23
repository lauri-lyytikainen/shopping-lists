# Project 1: Shared shopping list

The project is hosted at: https://shopping-lists-6e9v.onrender.com/lists

## About the project

This project is a web application that provides its users with shared shopping lists that can be edited by multiple users at the same time. The application is built using deno, eta, and postgresql inside Docker containers. It is hosted on Render.


## Running the application

The application can be ran locally using the following command:

```
$ docker-compose up
```

> The default address is http://localhost:7777

The e2e tests can be ran using the following command:

```
$ docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```
