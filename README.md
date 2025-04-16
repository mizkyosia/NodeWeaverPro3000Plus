
<div align="center">
<img src="./static/logo2.png" style="filter: drop-shadow(0 0 5px rgb(70, 138, 113)); -webkit-filter: drop-shadow(0 0 5px rgb(70, 138, 113));">
</div>

> By Léo Lewandowski, Victor Dumortier, Sasha Le Roux & Pierre Butez

A simple & straightforward graph editor

## Architecture & Dependencies

Our chosen framework is [SvelteKit](https://svelte.dev/), which is itself based on [Vite](https://vite.dev/) and developped by Svelte.

For the database, we use a MySQL docker container, and the NodeJS package [Prisma](https://www.prisma.io/) to simplify database requests & schema building

To simplify styling and CSS rules, we used [Sass](https://sass-lang.com/), a CSS extension (meaning it is 100% compatible with regular CSS) to make it easier to style components

Additionnally, we use [Docker](https://www.docker.com/) to manage our project, because it ensures compatibility on all devices.

Other used packages are [argon2](https://www.npmjs.com/package/argon2) and [oslojs](https://oslojs.dev/) for password hashing & checking, as well as a simple [email-validator](https://www.npmjs.com/package/email-validator)

## Credits 

The account & session system was heavily inspired by [Lucia](https://lucia-auth.com/) tutorials on authentication

All icons are either made by us or taken from [SVG Repo Dazzle Line Icons](https://www.svgrepo.com/collection/dazzle-line-icons)

## How to run ?

### Installing Docker

This project uses [Docker](https://www.docker.com/), to ensure compatibility on all devices. As such, you need to install it before running the project.

If you're using the Docker CLI, you'll need to configure its user groups and permissions before continuing. I recommend searching tutorials for installing & configuring the Docker CLI for your OS

Then, you need to clone this repo :

```sh
git clone https://github.com/mizkyosia/NodeWeaverPro3000Plus.git
```

### Running

#### Docker CLI

Move the current context to the project's directory :
```sh
cd path/to/NodeWeaverPro3000Plus
```

Pull the necessary images from DockerHub :
```sh
docker compose pull
```

Build the containers :
```sh
docker compose build
```

> [!NOTE]
> These 2 previous instructions must only be done once (unlesse you actively modified the project)

Then, you can run the project like so :
```sh
docker compose up
```

#### Docker GUI

### Accessing the project

You can access the project using `http://localhost:<NODE_DOCKER_PORT>`, where the `NODE_DOCKER_PORT` value is the one declared in the `.env` file at the root of the project.

Most likely, this will be [localhost:3000](http://localhost:3000/)