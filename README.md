QuickApp
========

[tools.devular.com/quickapp](http://tools.devular.com/quickapp)

## Installation

Clone from github or download the zipfile.
```
   $ git clone git@github.com:jonsherrard/quickapp.git
```
Copy the example config file to config.json
```
  cp example.config.json config.json
```
From the command line run the following:
```
   npm install && gulp
```
That's it! How you serve the files is up to you. You may have Apache or Nginx running.
You could use PHP's simple static server:
```
  $ php -S localhost:3456
```
Or Python's:
```
  python -m SimpleHTTPServer
```

Gulp will launch a live reload server, and watch your source files for changes

## Contributions

Very welcome.
