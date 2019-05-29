# sissi – simple static sites

<img src='sissi.png'  width='160px' />

Hi, I’m sissi. It’s a pleasure to meet you!

*sissi*, that’s short for **si**mple **s**tatic **si**tes.

It’s also the name of a well-known Austrian empress which became kind of a running gag between my developer parents. So, to everyone else it’s Empress Elisabeth – to you, my friend, it’s just sissi. Your **simple static site generator**.

## Contents
1. [Why the world needs me]
2. [What I can do for you]
    - [Packages]
    - [Environment]
3. [Quick Start]
    - [Installation]
    - [Create a new project]
    - [Work on your site]
    - [Publish the static site]
4. [Recommended first steps]
5. [Required files]
    - [config.json]
    - [structure.json]
    - [content.json]
    - [Entry Component]
6. [Working With Routes]
7. [Server Setup]
8. [Contributions]
9. [My folks]

## Why the world needs me
[Another](https://jekyllrb.com/) [static](https://www.gatsbyjs.org/docs/) [site](http://gohugo.io/) [generator](https://www.getlektor.com/), you may wonder? Well, yes.

Most static site generators are aimed at people who know their way around computers. Servers, command line, you know, all that complicated stuff. Then there’s Wordpress and the likes – tools for heavy users who need a bunch of different functionalities and at least some of the gazillions of plugins available. I am not trying to compete with either!

Instead, I’m here to help if your mom asks you to make her a website. Just real quick and simple. And then she asks you to change the background image. Every. Single. Week. Let me take over, right there!

## What I can do for you
I turn your React apps into static sites and offer a simple (yet customisable) built-in CMS to edit contents. Here’s how:

### Packages

[sissi-cli] will get you started on a new project with just one command! It’s all you will ever need to build your simple static sites. Behind the scenes [sissi-core] will

* set the stage for you, the developer,
* migrate all your awesome content whenever you make changes to your website structure,
* help me link your routes together,
* turn your app into a static site,
* make sure your mom can take care of her own content.

### Environment

I breathe **JavaScript** – I run on [Node.js servers](https://nodejs.org) only, PHP makes me sick. And my favourite frontend playground is [React](https://reactjs.org/). I might be able to join you elsewhere but I’ve never tried before so you’ll have to show me how.

And that’s all you need to know! Let’s get started, shall we?

## Quick Start
You're just two CLI commands away from starting your sissi project – this is so exciting!

### Installation
First you need to globally install sissi:

`npm install -g sissi-cli`

### Create a new project
To create a new project enter:

`sissi new`

and answer my questions to help me set it up. I will create all the required files for you, so after this you’re good to go!

### Work on your site
While working on your site all you need is:

`sissi dev`

This command will run your new project on `localhost:3000` and the CMS on `localhost:3010`.

### Publish the static site

After you're done developing and setting up your server, enter:

`sissi start`

on your server. I will then build the static site and start the CMS.

## Recommended First Steps

After the [Quick Start] you will have everything you need to start developing and you know best how to go about it! There are just a few things I’d recommend to do right away so you won’t forget to change them later on:

1. Change the `secret` and `phrase` in the `config.json` (can be any string, to learn more see: [config.json])
2. Enter your details in the `package.json`
3. Clean up the `/public` folder – remove the images, replace the favicon and customise the font in the `index.html`

Oh, and have fun! I’ll allow it. ;)

## Required Files
I try to be as flexible as possible but there are a few things that I really can’t do without:

1. [config.json]
2. [structure.json]
3. [content.json]
4. [Entry Component]

I will create all these files for you but you will have to make some changes!

The most important ones are summed up above under [Recommended First Steps] so you can skip the following explanations and examples and revisit them later, if you’re itching to get started.

### 1. config.json
I need a `config.json` to make sure only authorised people can access the CMS and edit contents. During setup I will already fill in the given `username` and `password` (don't use the defaults!) but please make sure to also change the `secret` and `phrase` required by [JWT (Json Web Token)](https://jwt.io/). This is a potential security risk!

The secret is JWT standard, the phrase is used to create a user token without hinting to the username. Both need to be strings and neither you nor your users will have to remember them.

Here’s what the file should look like:
```
{
  "JWT": {
    "secret": "yourSecret"
  },
  "users": [
    {
      "username": "yourUsername",
      "password": "yourPassword",
      "phrase": "yourPhrase"
    }
  ]
}
```

### 2. structure.json
Without a `structure.json` the CMS will not run. This is because the `structure.json` tells me how your website is structured and which items and fields to display to the person editing the website contents. Your file should contain the following five segments:

* [settings]
* [fields]
* [global]
* [pages]
* [sections]

This is your playground and the heart and soul of every *sissi* project!

#### settings
`settings` is where you define project basics, i.e. the project name and the desired language for the CMS. Here’s an example:
```
  "settings": {
    "projectName": "yourProjectName",
    "language": "en"
  }
```
| Key | Type | Default | Required | Notes |
| - | - | - | - | - |
| projectName | string | | | |
| language | string | `en` | | supported: `en`, `de`

I look forward to learning more languages in the future! If you'd like to teach me one, please see [Contributions].

#### fields
`fields` is a list of all the fields you want to expose to the website editor. They make up the forms displayed in the CMS and can be grouped and reused. Here are a few examples:
```
"fields": {
  "image": {
    "label": "Image",
    "type": "image"
  },
  "title": {
    "label": "Title",
    "placeholder": "Your title",
    "type": "string"
  },
  "content": {
    "label": "Contents",
    "placeholder": "Please add your content using markdown",
    "type": "markdown"
  },
  "gallery": {
    "label": "Gallery",
    "type": "list",
    "itemLabel": "Photo",
    "fields": ["image", "description"],
    "maxItems": 9,
    "minItems": 3
  }
}
```

These fields are the puzzle pieces that make up all the editable contents of your website – and are used in the following three segments of the `structure.json`: [global], [pages] and [sections].

Note that the last field with the `list` type is actually a group of fields. These can be useful for displaying and editing lists with complex items – in this example a gallery where each photo comes with a description.

| Key | Type | Default | Required | Notes |
| - | - | - | - | - |
| label | string | | yes | |
| type | string | | yes | supported: `string`, `text`, `markdown`, `image`, `date`, `choice`, `tags`, `list`
| placeholder | string | | | supported for types: `string`, `text`, `markdown` |
| maxLength | number | | | supported for types: `string`, `text` |
| autocompleteSource | string | | supported for types: `string`, `tags`; format: `'contentType.itemType.fieldName'`, e.g. `'sections.photos.title'` |
| options | object[] | | for type `choice` | option format: `{ key: string, label: string }` |
| itemLabel | string | | for type `list` | description for each item in the list |
| fields | string[] | | for type `list` | the fields for each item |
| maxItems | number | | for type `list` | |
| minItems | number | | for type `list` | ||

#### global
`global` is the ideal place to store some general website data – such as a company name, logo, background image, or meta title. You simply define this by adding the desired `fields`. The number of pages for your project are also defined here. Sometimes it’s as simple as that:
```
"global": {
  "fields": ["title"],
  "maxItems": 6,
  "minItems": 4
}
```

If you want to set a fixed number of pages just enter the same number as minimum and maximum. The CMS will then prevent users from adding or deleting pages.

If you want to create a *single page website* just enter `1` for both `minPages` and `maxPages`.

| Key | Type | Default | Required | Notes |
| - | - | - | - | - |
| fields | string[] | | yes | has to correspond with the defined [fields](link) |
| maxItems | number | | yes | |
| minItems | number | | yes | ||

#### pages
`pages` is a collection of the different page types you want to use on your website.

For *single page sites* you can skip this part because they don’t have pages and therefore no page types. (Actually, you **need** to skip this part or I will be confused and mess up your CMS. Sorry!)

For websites with more than one page I strongly recommend to add a page with type `standard` as fallback. Apart from that you’re free to create as many types as you like! Here are two examples:
```
"pages": {
  "standard": {
    "label": "Standard page",
    "fields": ["path", "title"],
    "maxItems": 4,
    "minItems": 1
  },
  "gallery": {
    "label": "Gallery page",
    "fields": ["path", "title", "description"],
    "maxItems": 24,
    "minItems": 4,
    "allowedItems": ["image"],
    "isProtected": true
  }
}
```

| Key | Type | Default | Required | Notes |
| - | - | - | - | - |
| label | string | | yes | |
| fields | string[] | | yes | |
| maxItems | number | | yes | |
| minItems | number | | yes | |
| allowedItems | string[] | `['standard']` | | has to correspond with the defined [sections](link) |
| isProtected | boolean | `false` | | protected pages cannot be added or deleted in the CMS |

Note: I will generate a path for each page. If you add a `path` field I will use its content or otherwise create the path from the `title` or `name` field. If none of these exist the path will be the randomly created page id. Also, since I need an entry point for the website, I will force the path for the index page (i.e. the top page in the CMS – which can easily be changed) to be an empty string.

#### sections
`sections` work pretty much like pages and are also made up of the `fields` you defined earlier. Again, I urge you to create a `standard` section type. Here’s how this might look like:
```
"sections": {
  "standard": {
    "label": "Standard section",
    "fields": ["title", "content"]
  },
  "photos": {
    "label": "Photos section",
    "fields": ["title", "description", "gallery"]
  }
}
```

| Key | Type | Default | Required | Notes |
| - | - | - | - | - |
| label | string | | yes | |
| fields | string[] | | yes | has to correspond with the defined [fields](link) |
Note: Every section with either a `path`, `title` or `name` field can be used as a sub-route! Learn more under [EntryComponent] and [Working With Routes].

### 3. content.json
The `content.json` holds – surprise! – all the contents of your website. I will use it to:

1. build the static website
2. fill the form fields in the CMS

Whenever you start the CMS (with `sissi dev` or `sissi start`) or when visiting/reloading the running CMS I will go looking for the `content.json`. If you have made changes to the `structure.json` I will migrate your content – and create a `content.json.backup` to make sure none of your data is lost in the process.

If there is none I will create a new (and basically empty) `content.json` from the given `structure.json`.

This all happens automatically so you don’t need to concern yourself with the exact composition of the file – it's basically the structure filled with data!

Just note that **your project will not run without this file** so if you delete it you need to start or visit the CMS to create a new one.

### 4. Entry Component
I will connect your `content.json` to your React app via the `render()` function in your `index.js`. This function will map through your pages and sections and return the entry component enhanced with content props for each page and eligible section. It's all set up for you – so no worries!

With the `sissi new` command I already set up a `Page.js` as an entry component for you – this is how I usually roll and you can just go from there if you like.

Feel free to put things like header and footer in the `Page` component. This might seem counterintuitive at first because it means your header and footer will be rendered on every single page and not just once in your `App` component (which you might usually prefer). But remember, we will turn all this into a static site so the outcome is exactly the same!

However, if you want to use an `App` (or any other) component as entry point you’re free to do so. Just make sure to pass it to the `render()` function in the `index.js` file.

Your entry component will receive the following props:

| Key | Type | Notes |
| - | - | - |
| content | object | the full content object |
| global | object | the global content |
| page | object | the current page |
| pages | object[] | all pages |
| path | string | the path of the current page |
| sections | object[] | the sections of the current page |
| section | object | the current section (for sections only!) |
Note: If (and only if!) you use sections as sub-routes and link to them in your app you need to make sure your EntryComponent is ready to handle it – if you receive a `section` object you can be sure to be on a sub-route and render the content accordingly.

## Working With Routes
In order to link your internal routes and make sure that I include all your routes in the static version of your site you have to use the `SissiLink` component.

`SissiLink` is a wrapper for the [ReactRouter Link](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md) component and supports all its main features. To make it work simply import it from `sissi-core` and use it in your jsx. The only thing you *have* to do is include a `to` attribute pointing to the desired route:

```
import { SissiLink } from 'sissi-core';

export default () => (
  <SissiLink to='/about'>
    About me
  </SissiLink>
);
```

This will render a link just like this:

```
<a href="/about" data-type="sissi-internal">About me</a>
```

Note the `data-type="sissi-internal"` part? That’s how the snapshot generator will know which sites to include in the static version of your app, so this is essential!

With `SissiLink` you can link to your pages using their auto-generated `_path` prop – all pages have it. Sections can (but don't have to!) be used as sub-routes. When a section has a `path`, `title` or `name` field it, too, will receive a `_path` prop and can be linked to.

## Server Setup
Here’s where I need to take a step back – I’m still learning about setting up a server on my own, so I can’t do this for you yet. But I can point you in the right direction with a couple of hints!

When you’re ready to make your project public you need a [Node.js](https://nodejs.org/en/) server where you install `sissi` as a global dependency (`npm i -g sissi`, remember?).

Then run `sissi start` to prepare both your sites. I say *both*, because you’ll have:

1. your static website in the `build` folder
2. your CMS running on port `3010`.

This part is my job. Your job is to point one domain to the folder and another to the port so the static site and CMS can both be visited by the public.

I recommend configuring [Nginx](https://www.nginx.com/) as a [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy), so that it might serve the static website on *your-website.org* and the CMS on *admin.your-website.org*. Here’s a [good tutorial](https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/) to get you started.

If you plan on serving multiple websites from the same server you might want to configure the CMS port instead of using the defaults. You can do that by creating a `.sissi` file (I will do that for you if you started your project with `sissi new`). This file might look like this:

```
{
  "buildDir": "build",
  "tmpDir": "tmp",
  "cmsPort": 3010,
  "devPort": 3000
}

```
None of these options is required, but might come in handy when you know me a bit better.

## Contributions
Hey, again. I’m so glad you’ve made it here! Because I could really use your help.

I’m still a child and have yet to grow and [much to learn][issues], so please be patient. If you could kindly [point out how I can improve][issues] or if you even want to teach me something new I’d be forever grateful!

I am working on writing full contribution guidelines and hope you'll check back soon for more. Until then – don't be shy! All feedback and ideas are appreciated and I am convinced that everyone can teach me something, be it a code newbie or pro.

To get you started here are some useful commands:

`npm run dev:cms` starts the CMS in development mode (surprise!),
`npm run lint` makes sure you follow my code guidelines and
`npm run test` runs all the beautiful tests.

## My folks

<img src='/src/templates/public/images/a-square.svg'  width='160px' />

So, now that we’ve met and I’ve told you so much about me please let me introduce you to my lovely creators. Head over to [A square] to say hi and see what else they do when they’re not busy tending to me!

See you around.

<img src='/src/templates/public/images/sissi.svg'  width='40px' /> Yours, sissi

[A square]: https://a-square.eu
[issues]: https://github.com/square-a/sissi/issues

[sissi-cli]: https://github.com/square-a/sissi-cli
[sissi-core]: https://github.com/square-a/sissi-core

[Why the world needs me]:#why-the-world-needs-me
[What I can do for you]:#what-i-can-do-for-you
[Packages]:#packages
[Environment]:#environment
[Quick Start]:#quick-start
[Installation]:#installation
[Create a new project]:#create-a-new-project
[Work on your site]:#work-on-your-site
[Publish the static site]:#publish-the-static-site
[Recommended first steps]:#recommended-first-steps
[Required files]:#required-files
[config.json]:#1-configjson
[structure.json]:#2-structurejson
[content.json]:#3-contentjson
[Entry Component]:#4-entry-component
[Working With Routes]:#working-with-routes
[Server Setup]:#server-setup
[Contributions]:#contributions
[My Folks]:#my-folks

[settings]:#settings
[fields]:#fields
[global]:#global
[pages]:#pages
[sections]:#sections
