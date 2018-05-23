
[![GitHub license](https://img.shields.io/badge/license-MIT-ff69b4.svg)](https://github.com/peerquery/app-stream/blob/master/LICENSE)
[![Discord chat](https://img.shields.io/badge/chat-discord-orange.svg)](https://discord.gg/rz9GwAa)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Utopian.io](https://img.shields.io/badge/contribute%20by-utopian.io-blue.svg)](http://utopian.io)

# **App Stream**
**App Stream** is a node.js utility that allows you to curate `comment` operations from the Steem blockchain into a MYSQL DB. You can then access your content from the DB by an API, direct SQL or GUI such as Workbench/PHPMYAdmin.

**Consider this challenge**:
* a user creates a query(conventional blog post or *comment* in the Steem terminology) on *PeerQuery.com*
* someone comments on the post from *Steemit.com*
* the post author edits the same post using *Busy.org*
* eventually someone replies to the comment made on the post using the *eSteem* app

How should *Peer Query* we track all these activities made from several clients on our posts?

## **App Stream** solution
**App Stream** attempts to address this challenge by storing all `posts` made from a target with a *key* which is defined as `/@author/permlink`. *Keys* of new `comment/reply` operations on the Steem Blockchain are compared with the keys in the DB and if a match if found, the new `comment` operation is added to the DB as a comment/reply along with its own key. The process is designed to be as efficient and modular as possible.

Aside from solving the above problem, **App Stream** can be used for lots of other exiting uses including:
* curate all posts made by a client(eg: *steemit.com*) along with all comments and replies made to these posts no matter which other client was used to make the comments or replies
* curate all posts made by a author(eg: *adsactly*) along with all comments and replies made to these posts no matter which other client was used to make the comments or replies
* curate all posts made by a category(eg: *life*) along with all comments and replies made to these posts no matter which other client was used to make the comments or replies
* **App Stream** also catches all edits to these posts/comments/replies, no match the client/app on which the edit was made from. You can access the curated posts along with their comments/replies from the DB via API or direct SQL query.


## Table of Contents

- [**App Stream**](#app-stream)
  - [**App Stream** solution](#app-stream-solution)
  - [Table of Contents](#table-of-contents)
  - [Quick local install](#quick-local-install)
    - [Prerequisites](#prerequisites)
    - [Get **App Stream**](#get-app-stream)
    - [Setup MYSQL](#setup-mysql)
    - [Setup server](#setup-server)
  - [Terminology definitions](#terminology-definitions)
    - [Post](#post)
    - [Comment](#comment)
    - [Reply](#reply)
    - [Target filters](#target-filters)
    - [`strict` and `common` app modes:](#strict-and-common-app-modes)
    - [`config.source_app`](#configsource_app)
  - [Info configurations(optional)](#info-configurationsoptional)
  - [](#)
  - [`controller`](#controller)
    - [`config.app_state`](#configapp_state)
    - [`config.api_state`](#configapi_state)
    - [`config.api_mode`](#configapi_mode)
    - [`config.subdomain`](#configsubdomain)
    - [`config.guide_api`](#configguide_api)
    - [`config.db_setup`](#configdb_setup)
  - [Features](#features)
    - [Absolute content indexing](#absolute-content-indexing)
    - [Lazy conditional load and control](#lazy-conditional-load-and-control)
    - [Two Blockchain access apps](#two-blockchain-access-apps)
    - [Three activity filters.](#three-activity-filters)
    - [Three activity types](#three-activity-types)
    - [Six DB engines](#six-db-engines)
  - [Access control](#access-control)
    - [CORS](#cors)
    - [Robots](#robots)
  - [Instance examples](#instance-examples)
    - [Curate all posts from any Steem app](#curate-all-posts-from-any-steem-app)
    - [Curate all posts from the Steem user `adsactly`](#curate-all-posts-from-the-steem-user-adsactly)
    - [Curate all posts from the Steem category `love`](#curate-all-posts-from-the-steem-category-love)
    - [Curate all posts and comments from any Steem app](#curate-all-posts-and-comments-from-any-steem-app)
    - [Curate all posts and comments from the Steem user `adsactly`](#curate-all-posts-and-comments-from-the-steem-user-adsactly)
    - [Curate all posts and comments from the Steem category `love`](#curate-all-posts-and-comments-from-the-steem-category-love)
    - [Curate all posts, comments and replies from any Steem app](#curate-all-posts-comments-and-replies-from-any-steem-app)
    - [Curate all posts, comments  and replies from the Steem user `adsactly`](#curate-all-posts-comments--and-replies-from-the-steem-user-adsactly)
    - [Curate all posts, comments and replies from the Steem category `love`](#curate-all-posts-comments-and-replies-from-the-steem-category-love)
  - [Fetch API examples](#fetch-api-examples)
    - [Test if url is post or comment](#test-if-url-is-post-or-comment)
    - [Fetch without knowing type](#fetch-without-knowing-type)
    - [Fetch url whose type is known as post](#fetch-url-whose-type-is-known-as-post)
    - [Fetch url whose types is known as comment/reply](#fetch-url-whose-types-is-known-as-commentreply)
  - [Curate API examples](#curate-api-examples)
    - [Fetch last ? number of posts](#fetch-last--number-of-posts)
    - [Fetch last ? number of comments](#fetch-last--number-of-comments)
    - [Fetch last comments and replies](#fetch-last-comments-and-replies)
  - [Stats API examples](#stats-api-examples)
    - [Count posts for ? days](#count-posts-for--days)
    - [Count comments for ? days](#count-comments-for--days)
    - [Count comment and replies for ? days](#count-comment-and-replies-for--days)
  - [Cool addons](#cool-addons)
    - [API guides](#api-guides)
    - [Depth determiner](#depth-determiner)
    - [Sub domain support](#sub-domain-support)
    - [Optimization](#optimization)
  - [Cool hacks](#cool-hacks)
    - [Jailbreak](#jailbreak)
    - [Hosted app-stream as a service](#hosted-app-stream-as-a-service)
    - [Hivemind](#hivemind)
    - [Custom app/client activity streamer](#custom-appclient-activity-streamer)
  - [Recommendations](#recommendations)
  - [Limitations](#limitations)
    - [Live  stream only](#live--stream-only)
    - [No support for votes yet](#no-support-for-votes-yet)
    - [Requires valid `json_metadata`](#requires-valid-json_metadata)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Acknowledgment](#acknowledgment)
  - [Happy **App Stream**ing Steem!](#happy-app-streaming-steem)


**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

## Quick local install

### Prerequisites
* `npm`
* MYSQL 5.7+ for `json` support

### Get **App Stream**
* Clone repo: `git clone http://github.com/peerquery/app-stream.git`
* Switch to working directory: `cd App Stream`

### Setup MYSQL
* Create a new empty DB with no tables or anything
* Enter the details of your DB into the `.env` file
* See a sample of `.env` file in [*/docs/sample.env*](https://github.com/peerquery/app-stream/blob/master/docs/sample.env).

### Setup server
* Install dependencies: `npm install `
* If you do not want default setup, tweak: `/config/config.js`
* Run `npm setup`
* You system is live, see the console for confirmation messages
* Access your DB content via MYSQL Workbench, PHPMYAdmin or the API on localhost




## Terminology definitions

On the Steem Blockchain, what is identified in conventional sense as `post`, `comment` and `reply` are identified simply as `comment` operations.

In this document and **App Stream**, we use the terms `post`, `comment` and `reply` in the conventional sense. The glossary below maps these terms to their Steem counterparts.

### Post
`post` as used in this document and in **App Stream** refers to `blog posts` in the conventional sense which on Steem corresponds to a `root` `comment` transaction with an empty `parent_author` field. When fetched from the Steem API, it returns a depth of `0`.

### Comment
`comment` as used in this document and in **App Stream** refers to `comments` in the conventional sense - *a response to a post*. On the Steem blockchain it corresponds to a `comment` transaction whose `parent_author` fields are not empty. When fetched from the Steem API, `comments` have a depth of 1.

### Reply
`reply` as used in this document and in **App Stream** refers to `response to a comment` in the conventional sense. On the Steem blockchain it corresponds to a `comment` transaction whose `parent_author` fields are not empty and when fetched from the Steem API, `comments` have a depth greater than 1.

### Target filters
Target filter allows you to determine which `target` by which to curate operations. The target filter could be an app, username or category depending on the DB engines you set.

For post/comments/replies by `app`, the target should be the value of the `app` field in the `JSON_metadata` of the targeted app. Below are the current `app` values used some of Steem clients:


| App				|	`config.app_match = 'common'`	| `config.app_match = 'strict'`			|
| :---------------: | :-----------------------------:	| :-----------------------------------:	|
| 					|	`config.target` **must be**		|	`config.target` **must be**			|
| Steemit:			|	`steemit`						|	`steemit/0.1`						|
| Busy:				|	`busy`							|	`busy/2.4.0`						|
| Dtube:			|	`dtube`							|	`dtube/0.7`							|
| eSteem:			|	`esteem`						|	`esteem/1.6.0` `esteem/1.5.1`		|
| DSound:			|	`dsound`						|	`dsound/0.3`						|
| Steem Press:		|	`steempress`					|	`steempress/1.2` `steempress/1.1`	|
| DLive:			|	`dlive`							|	`dlive/0.1`							|
| Peer Query:		|	`peerquery`						|	`peerquery/beta`					|
| Steem shot:		|	`steepshot`						|	`steepshot/0.1.2.21`				|
| DMania			|	`dmania`						|	`dmania/0.7`						|
| Zappl:			|	`zappl`							|	`zappl/0.1`							|
| Streemian:		|	`streemian`						|	`streemian/scheduledpost`			|
| Beam				|	`beem`							|	`beem/0.19.23`						|
| Post Promoter		|	`postpromoter`					|	`postpromoter/1.8.9`				|
| DPorn				|	`dporn.app`						|	`dporn.app/v0.0.3`					|

*Utopian* uses `busy/2.4.0` hence you might want to curate by `utopian-io` category instead.

### `strict` and `common` app modes:
Default: `config.app_match = 'common'` ; alt: `config.app_match = 'strict'`

`common` mode will index all posts coming from an app, regardless of its version. Most Steem clients are frequently updated, yet not users switch to the latest version. *Steem Press* posts coming from versions `steempress/1.2` and `steempress/1.1` while *SteemJS* posts come in as `steemjs/test`, `steemjs/example`, ... The default mode is `common` and it will only consider the name of the app, not its version or whatever comes after the slash: `app/whatever`. You could use an SQL query to search the `json_metadata` fields and retrieve only content from the app version you want.

`strict` mode will ensure that the curated content comes from app versions that matches exactly the defined value, disregarding content from other versions of the app. Eg: in strict mode where app is `esteem/1.6.0`, content from `esteem`, `esteem/1.5.1`, `esteem/whatever` apps will be ignored.

This settings only applies to when curating by an app using the following engines:
* `post-by-app`
* `post-comment-by-app`
* `post-comment-reply-by-app`

The option to choose which `app` to use can be set in the `config` file. The default `app` type is set to `ops`.


### `config.source_app`
`config.app_match = '' is NOT to be confused with `config.source_app`.

`config.source_app` ensures that when curating by `author` or `category`, content is only curated when it was generated by the `source`.

Example: I want to curate all posts by author `dzivenu` but only when the content originates from Steemit.com - ignoring all those by `dzivenu` which are from Busy.org, Utopian, eSteem or any other Steem client.

In that case I would set `config.source_app = 'dzivenu'`

This setting only applies to when curating by author or category:
* `post-by-author`
* `post-by-category`
* `post-comment-by-author`
* `post-comment-by-category`
* `post-comment-reply-by-author`
* `post-comment-reply-by-category`



## Info configurations(optional)

The info section of the config are only displayed on URL endpoint of the app. Below are the default settings, edit them according to your brand.

```bash
//app info
config.app_name = 'app stream';		// the name of your system after your brand
config.app_version = '1.0.0';		// app version
config.api_version = '1.0.0';		// api version
config.app_owner = '';				// name of the project owner
config.app_admin = '';				// name of project admin
```

## 

```
//filter settings
config.target = 'steemit';			// target whose posts you want to curate, could be user, app or category
config.streamer_app = 'ops';		// determine which streamer app(method) to use. second option is 'blocks'
config.db_engine = 'post-by-app';	// determines activities(post/comment/reply) to curate and type(user/app/category)
config.app_match = 'common';		// for curating by app only. eg: 'common' for 'steemit' and 'strict' for 'steemit/0.1'
config.source_app = '';				// determines if curation should be done for only the specified 'source_app' app
```


## `controller`
Remember that the default values of these values are OK. You could run the program for production with them.


### `config.app_state`
Default: `config.app_state = 'on'`. Turn off: `config.app_state = 'off'`

Turns the core indexing functionality on/off. If you have run the app with this value set as *on* for a while with your DB populated and you no longer want to index new content into the DB, then turn off the indexing function by setting this option to *off*. If 'off' API will work but DB will not receive new data, which means you can still use the API to serve already indexed content - provided the API function is also not turned *off*.


### `config.api_state`
Default: `config.api_state = 'on'`. Turn off: `config.api_state = 'off'`

Turns *API* functionality on/off. In case you do not want to enable API access to indexed content, turn off api functionality with the option. You can turn the APi off id you want to access content using only direct SQL query.


### `config.api_mode`
`config.api_mode = 'open'`

Does nothing for now. Meant to signal if API key is required for API use.


### `config.subdomain`
Default: `config.subdomain = 'api'`. Turn off using `config.subdomain = ''`

This determines if your server should use a subdomain like the default `api.whatevermy.host` or `rpc`, `data`, `node`, ...


### `config.guide_api`
Default: `config.guide_api = 'on'`. Turn off using `config.guide_api = 'on'`

Determines whether or not to enable API guides on API endpoint bases, further explanation on *api guides* can be found below.


### `config.db_setup`
Default: `config.db_setup = 'true'`. Turn off using `config.db_setup = 'false'`

The DB of App Stream is very complex and consists of:
* 2 tables with all kinds of fields: json, text, timestamp, varchar, auto-increment, ...
* 1 view of the each of the two tables above
* 3 complex conditional *db indexing* stored procedures each with 11 IN variables and 1 OUT variable
* 10 *db api* stored procedures with IN and OUT variables

Manual setup is difficult and will generate lots of errors due to the different types of MYSQL clients and versions. Also, the main indexer app has to run only after the DB set up is successful.

`db_setup` automates the process by a custom `db_manager` module which will first perform the following actions and only activates the core system when it has succeeded without error:
* connect to DB
* create tables for `posts` and `comment/replies` - if they do not exist
* create views for `posts` and `comment/replies` - if they do not exist
* create all stored procedures for db engines - if they do not exist
* create all stored procedures for db apis - if they do not exist
* logs all progress and termites process if error occurs
* activates main app if db set up is successful

These activities are necessary whenever you are connecting to a DB for the first time, as it will set up the db complete with tables, views and all stored procedures.

You may still leave it on even when your are reconnecting to DB on which has been already setup - it will not delete any existing content.

Despite the complexity, the `db_manager` is fully automated and near instant in speed! The raw sql files can be viewed in the `sql` folder.



## Features

### Absolute content indexing
**App Stream** indexes all posts and their subsequent comments and replies from its `target`, along with all edits to them.

### Lazy conditional load and control
Due to the modular nature of most functions, **App Stream** only loads modules which it needs.

**Example 1: fetching one of the two apps**
* It fetches one of the two apps(*ops/blocks*) as defined by user in the `config.js` using: `var app = require('./src/app/' + config.streamer_app);`
* It turns `app` *on/off* as defined by user in  `config.js` using: `if (config.app_state == 'on') app();`

**Example 2: fetching and configuring subdomain**
* It configures subdomain using: `if (config.subdomain !== '') server.use(subdomain(config.subdomain, express.Router() ));`

**Example 3: fetching, configuring and using one of the six db engines**
* It determines DB engine using as set by user in `config.js` using `var db_engine = require('./../../config/config').db_engine;`
* It fetches the engine using: `var engine = require('./../../src/db-engines/' + db_engine);`
* It then uses the engine like this: `engine(op, tx_id, block, timestamp)`


### Two Blockchain access apps
App Stream activity stream processors. There are two types:
* `ops` - streams `operations` and filters for `comment` operations.
* `blocks` - streams `block numbers`, then fetches `blocks` and then filters for `comment` operations.


### Three activity filters.
Supported curation routes(for `posts` since they are the primary source of activity):
* `app` - curate `post` only when its `app` value in `JSON_metadata` corresponds to the target app
* `tag/category` - curate `post` only when its `parent_permlink` value corresponds to the target app
* `author` - curate `post` only when its `author` value in `JSON_metadata` corresponds to the target app

### Three activity types
Supported curated activities include:
* `post`
* `comment`
* `replies`
* `votes` - coming soon


### Six DB engines
Supported engines for data processing include:
* `post-by-app`
* `post-by-author`
* `post-by-category`
* `post-comment-by-app`
* `post-comment-by-author`
* `post-comment-by-category`
* `post-comment-reply-by-app`
* `post-comment-reply-by-author`
* `post-comment-reply-by-category`


## Access control

### CORS
**App Stream** uses a custom CORS module for handling CORS access to your server/endpoint. Without the proper CORS, external websites would not be able to acess data from the API.

The default CORS as can be seen in `/config/cors.js` and allows you to list a list of allowed origins that may access the API.

Make sure you add the IP from which you hope to access the API from to the list. By default only two origins are allowed `['lvh.me', 'localhost']`.

There is also a template in the same file to allow you to open up the origin to allow all sites to access it. This is not enabled by default to prevent against potential unauthorized access of your APIs by web origins/bots - in high volumes it may overload your server.


### Robots
Web crawlers will crawl anything on the web. We do not want our APIs exposed so the robots file in `routes/robots/robots.js` is as follows:
```bash
User-agent: *
Disallow: /
```
This can be accessed from the endpoint `whatevermy.host:port/robots.txt`. On *localhost:80* its at `localhost/robots.txt`

## Instance examples

Remember that there are only two places to configure during run:
* `.env` file - server and DB settings
* `config.js` - main config files, this is where there entire configuration happens

Below are the corresponding settings for the `config.js` files in the respective instances.

### Curate all posts from any Steem app
Set value of `config.target` in the `filter settings` section of the `config.js` file to the app's name, except for *Utopian* which uses `busy` - so you might want to curate by `utopian-io` category instead for Utopian posts.
```bash
config.target = 'steemit'; // target app/client is Steemit.com
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-by-app'; // activates the 'post-by-app' engine
config.source_app = ''; // it is recommended that you leave this option as it is 
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts from the Steem user `adsactly`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the Steem username of your target.
```bash
config.target = 'adsactly'; // target account is 'adsactly'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-by-author'; // activates the 'post-by-author' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts from the Steem category `love`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the category you want to target.
```bash
config.target = 'love';	// target category is 'love'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-by-category'; // activates the 'post-by-category' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts and comments from any Steem app
Set value of `config.target` in the `filter settings` section of the `config.js` file to the app id(as listed above).
```bash
config.target = 'steemit'; // target app/client is Steemit.com
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-by-app'; // activates the 'post-comment-by-app' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts and comments from the Steem user `adsactly`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the Steem username of your target.
```bash
config.target = 'adsactly'; // target account is 'adsactly'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-by-author'; // activates the 'post-comment-by-author' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts and comments from the Steem category `love`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the category you want to target.
```bash
config.target = 'love';	// target category is 'love'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-by-category'; // activates the 'post-comment-by-category' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts, comments and replies from any Steem app
Set value of `config.target` in the `filter settings` section of the `config.js` file to the app id(as listed above).
```bash
config.target = 'steemit'; // target app/client is Steemit.com
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-reply-by-app'; // activates the 'post-comment-reply-by-app' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts, comments  and replies from the Steem user `adsactly`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the Steem username of your target.
```bash
config.target = 'adsactly'; // target account is 'adsactly'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-reply-by-author'; // activates the 'post-replies-comment-by-author' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```

### Curate all posts, comments and replies from the Steem category `love`
Set value of `config.target` in the `filter settings` section of the `config.js` file to the category you want to target.
```bash
config.target = 'love';	// target category is 'love'
config.streamer_app = 'ops'; // default, you can set to 'blocks' if you prefer that app
config.db_engine = 'post-comment-reply-by-category'; // activates the 'post-comment-reply-by-category' engine
config.source_app = ''; // it is recommended that you leave this option as it is  
config.db_setup = true'; //must be 'true' for the first run on a DB
```





## Fetch API examples
After server is set up, and has populated content, you can them access the API routes, provided the API function is not turned off by setting `config.api_state = 'off'`.

Again, remember that you can only access content which has already been indexed since the app began to run.

### Test if url is post or comment
Scheme:
`/api/fetch/type/@:author/:permlink`

Example, provided that the link is expected to be have been indexed:
`/api/fetch/type/@elear/utopian-already-rewarding-early-adopters`

Returns:
* `post` if url is a post
* `comment` if url is a comment or reply
* `none` if not found as post, comment or reply

### Fetch without knowing type
Scheme:
`/api/fetch/@:author/:permlink`

Example, provided that the link is expected to be have been indexed:
`/api/fetch/@elear/utopian-already-rewarding-early-adopters`

Returns a `json` with the following for post:
* `id`
* `block`
* `tx_id`
* `author`
* `permlink`
* `category`
* `title`
* `body`
* `json_metadata`
* `timestamp`
* `last_update`
* `url`
* `depth`

Returns a `json` with the following for comment/reply:
* `id`
* `block`
* `tx_id`
* `author`
* `permlink`
* `parent_author`
* `parent_permlink`
* `body`
* `timestamp`
* `json_metadata`
* `url`
* `depth`
* `source`

This function will search the post table for the url and if it does not find it will then search the comments/replies table.

This method for fetching might not be recommended if you already know the type(post or comment/reply) of url you are requesting since it would demand the DB to search two tables to find the url.

If you already know the type of a url, use the functions below to reduce load on the DB server.

### Fetch url whose type is known as post
Scheme:
`/api/fetch/post/@:author/:permlink`

Example, provided that the link is expected to be have been indexed:
`api/fetch/post/@elear/utopian-already-rewarding-early-adopters`

Returns a `json` with the following for post:
* `id`
* `block`
* `tx_id`
* `author`
* `permlink`
* `category`
* `title`
* `body`
* `json_metadata`
* `timestamp`
* `last_update`
* `url`
* `depth`

### Fetch url whose types is known as comment/reply
`/api/fetch/comment/@:author/:permlink`

Example, provided that the link is expected to be have been indexed:
`/api/fetch/comment/@blockrush/re-elear-utopian-already-rewarding-early-adopters-20171005t143700907z`

Returns a `json` with the following for comment/reply:
* `id`
* `block`
* `tx_id`
* `author`
* `permlink`
* `parent_author`
* `parent_permlink`
* `body`
* `timestamp`
* `json_metadata`
* `url`
* `depth`
* `source`




## Curate API examples

### Fetch last ? number of posts
Scheme: `/api/curate/:num`

Returns a `json` containing only the `url`, `body`, `title` and `timestamp` of the latest `num` number of posts

Exmaple: `/api/curate/10` - returns a `json` of `url`, `body`, `title` and `timestamp` of latest 10 posts


### Fetch last ? number of comments
Scheme: `/api/curate/comments/:num`

Returns a `json` containing only the `urls`,`body`, and `timestamp` of the latest `num` number of comments

Exmaple: `/api/curate/comments/10` - returns a `json` of `urls`, `body`, and `timestamp` of latest 10 comments


### Fetch last comments and replies
Scheme: `/api/curate/replies/:num`

Returns a `json` containing only the `urls`, `body`, and `timestamp` of the latest `num` number of comments and replies

Exmaple: `/api/curate/replies/10` - returns a `json` of `urls`, `body`, and `timestamp` of latest 10 comments and replies




## Stats API examples

### Count posts for ? days
Scheme: `/api/stats/count/posts/:days`

Returns `json` object of post count for `days`

Maximum is restricted to 100 days to avoid overloading the DB; days counts over 100 will be reset to 100.

### Count comments for ? days
Scheme: `/api/stats/count/comments/:days`

Returns `json` object of comment count for `days`

Maximum is restricted to 100 days to avoid overloading the DB; days counts over 100 will be reset to 100.

### Count comment and replies for ? days
Scheme: `/api/stats/count/replies/:days`

Returns `json` object of comment and replies count for `days`

Maximum is restricted to 100 days to avoid overloading the DB; days counts over 100 will be reset to 100.




## Cool addons

### API guides
API guides provide API endpoint *bases* with basic documentation. There are 4 API endpoint bases:
* `/api`
* `/api/fetch`
* `/api/curate`
* `/api/stats`

Example, when api guides is on, the endpoint base `localhost/api/curate` serves a *highlighted* version of the following plain text:
```bash
API guide for curate route
Below are the supported calls for the /curate API route
------------------------------------------------------------
/api/curate/:num - fetch latest ? posts
/api/curate/comments/:num - fetch latest ? comments
/api/curate/replies/:num - fetch latest ? comments and replies
------------------------------------------------------------
num is number of posts to be returned, maximum is set to 100
example: to get latest 20 posts for curation do: /api/curate/20
return to main API home page at ./api
```

### Depth determiner
For each post, comment or reply indexed, its appropriate depth value is automatically generated.

### Sub domain support
**App Stream** support subdomains. This can be configured in the `control` section of the `config.js` file.

Default is `config.subdomain = 'api';`. You can set the subdomain to whatever you want `config.subdomain = 'rpc';`, `config.subdomain = 'data';`, ...

On localhost you can acess the default api subdomain: `api.localhost`. Turn the subdomain functionality off by setting `config.subdomain = '';`

### Optimization
* Modular custom functions for portability
* Use we raw SQL instead of ORM/Sequelize for speed
* MYSQL for popularity and ease of use
* Stored procedures instead of inline queries for complex queries.
* Connection pools instead of single connections
* `dsteem` instead of `steemjs` for speed


## Cool hacks
Aside from using **App Stream** to index content from your client, there are some exciting potential uses too.

### Jailbreak
You can remove the target filters so app will curate all posts, comments and replies from all Steem regardless of the app/client, author or category.

### Hosted app-stream as a service
You could host **App Stream** and serve data over the API.

### Hivemind
You can pair **App Stream** with your `hivemind` node for polarizingly richer data access interface/platform.

### Custom app/client activity streamer
Now with **App Stream** you can index all posts, comments and replies of all posts made on any client, by any user or tag.

This is a great tool for experiments, monitoring and even analysis of posts from a Steem app, author or category.


## Recommendations

Always remember that in oder to index content, the app has to literally:
* stream all new Steem operations,
* curate `comment` operations
* apply your filters
* compare every new Steem post with already indexed posts in the MYSQL DB.

Imagine comparing every single new comment with over 1 million entries on two different tables(if not found in posts table then search comments/replies table) and performing an insert/update transaction based on the result of the comparison.

This process means the server load is already potentially at its max. Avoid adding more queries to interfere with the content indexing DB processes else it may fail to process some new contents.

Keep this understanding of the potentially maxed out DB server state in mind when building a custom API or doing a custom MYSQL query, hence keep your queries as easy/light as possible.

Also, it is advised to maintain a separate DB for other needs of your site instead of creating new tables for other use, and to run this app as a standalone system solely for the purposes of indexing and serving by API.

## Limitations

### Live  stream only
**App Stream** only curates content created from the moment it was setup; it does not curate content created before it was setup. If you want to curate content already created we would recommend using Steemit Inc's `SBDS` solution.

### No support for votes yet
**App Stream** does not yet curate votes. This feature will be added to through subsequent updates.

### Requires valid `json_metadata`
**App Stream** will not curate any Steem post that lacks a valid `json_metadata` field for the following reasons:
* MYSQL generate error when trying to insert content where the `json_metadata` field is empty
* strict app mode only works if we are able to find the `app` from the `json_metadata`
* we consider it good practice for clients/apps to add `json_metadata` to their posts

Most main stream Steem clients provide valid `json_metadata` fields content so this should not be a problem.

## Contributing
Kindly refer to the [Contributor guide](https://github.com/peerquery/app-stream/blob/master/docs/contributor-policy.md).

## Code of Conduct
**App Stream** adheres to **Peer Query's** Community standards: [/docs/code-of-conduct](https://github.com/peerquery/app-stream/blob/master/docs/code-of-conduct.md).

## Acknowledgment
Thanks to [@smooth](https://steemit.com/@smooth) and [@howo](https://steemit.com/@howo) for their recommendations on the db indexing structure.

## Happy **App Stream**ing Steem!
*- The Peer Query team*
