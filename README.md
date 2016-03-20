# Listodo
[![Build Status](https://travis-ci.org/cedced19/listodo.svg?branch=master)](https://travis-ci.org/cedced19/listodo)
[![NPM version](https://badge.fury.io/js/listodo.svg)](http://badge.fury.io/js/listodo)

Listodo is a self-hosted website to save your todo list.


![](https://raw.githubusercontent.com/cedced19/listodo/master/demo.png)

## CLI

```bash
$ npm install listodo -g
```

Go in command line to the directory where you have your save.

```bash
$ listodo
```

## Server

```bash
$ git clone --deth=1 https://github.com/cedced19/listodo
$ cd ./listodo
$ npm install --production
$ npm start --production
```

## Options

```
--production               launch in production mode

--port [number]            specified the port
```

## API


There are Rest APIs on `http://localhost:7777/api/`.

You can use a [application](https://github.com/cedced19/listodo-mobile)  to show you your todo list on your mobile phone online and __offline__.

There are two solution to get todo lists on this application:
* redirect ports on your server and get your global ip
* be on the same wifi as your server and get its local ip
