<style>
    #title {
        display:flex;
        font-size: 6.5em;
        font-weight: 500;
        font-family: 'Chillax-Variable';
        justify-content: center;
        align-items:center;

        margin: 1em;
        color: rgb(70, 138, 113);

        filter: drop-shadow(0 0 10px rgb(70, 138, 113));
    }

    #title svg {
        font-size: 1em;

        width: 1.5em;
        height: 1.5em;
    }

@font-face {
  font-family: 'Chillax-Variable';
  src: url('./static/fonts/Chillax-Variable.woff2') format('woff2'),
       url('./static/fonts/Chillax-Variable.woff') format('woff'),
       url('./static/fonts/Chillax-Variable.ttf') format('truetype');
  font-weight: 200 700;
  font-display: swap;
  font-style: normal;
}


</style>

<div id="title">
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 13C9 15.2091 10.7909 17 13 17C14.1046 17 15.1046 16.5523 15.8284 15.8284M9 13H5M9 13C9 11.448 9.88388 10.1025 11.1757 9.43928M5 13C5 13.5523 4.55228 14 4 14C3.44772 14 3 13.5523 3 13C3 12.4477 3.44772 12 4 12C4.55228 12 5 12.4477 5 13ZM19.2929 6.70711C19.1119 6.52614 19 6.27614 19 6C19 5.44772 19.4477 5 20 5C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7C19.7239 7 19.4739 6.88807 19.2929 6.70711ZM19.2929 6.70711L15.8284 10.1716M9.37149 4.92872C9.73983 4.78126 10 4.42101 10 4C10 3.44772 9.55228 3 9 3C8.44772 3 8 3.44772 8 4C8 4.55228 8.44772 5 9 5C9.13127 5 9.25664 4.97471 9.37149 4.92872ZM9.37149 4.92872L11.1757 9.43928M15.8284 15.8284C16.5523 15.1046 17 14.1046 17 13C17 11.8954 16.5523 10.8954 15.8284 10.1716M15.8284 15.8284L19.2929 19.2929M19.2929 19.2929C19.1119 19.4739 19 19.7239 19 20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19C19.7239 19 19.4739 19.1119 19.2929 19.2929ZM15.8284 10.1716C15.1046 9.44772 14.1046 9 13 9C12.3428 9 11.7227 9.15847 11.1757 9.43928" stroke="rgb(70, 138, 113)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<span>NodeWeaver</span></div>

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