var http = require('http');
var fs = require('fs');
var paramify = require('paramify');
var stringify = JSON.stringify;
var split = require('split');
var parse = require('JSONStream').parse;
var through = require('through2').obj;
var q = require('hyperquest');
var url = require('url');

var tap = require('tap');
var test = tap.test;

var mailinator = require('../index');

var options = {
  hostname: 'localhost',
  port: 8089,
  path: '',
  method: 'GET'
};

var inbox = require('./fixtures/inbox.json');
var email = require('./fixtures/email.json');

//
// route the requests from the http sever.
//
var server = http.createServer(function(req, res) {


  var parsed = url.parse(req.url);
  var match = paramify(parsed.pathname);
  var args = [req, res, match];

  var isGET = req.method == 'GET';

  if (isGET && match('/inbox')) {
    res.statusCode = 200;
    return res.end(stringify(inbox) + '\n');
  }

  if (isGET && match('/email')) {
    res.statusCode = 200;
    return res.end(stringify(email) + '\n');
  }

  res.statusCode = 404;
  res.end(stringify('Not Found'));

}).listen(8089);

test('test mailinator', function(t_parent) {

  test('test inbox', function (t) {
    var mail = mailinator({token: 'foo', apiUrl: 'http://localhost:8089'});
    mail.getMessages('foo', function (err, res) {
      t.deepEqual(res, inbox.messages);
      t.end();
    });
  });

  test('test message', function (t) {
    var mail = mailinator({token: 'foo', apiUrl: 'http://localhost:8089'});
    mail.readMessage('foo', function (err, res) {
      t.deepEqual(res, email);
      t.end();
    });
  });

  test('teardown', function (t) {
    server.close();
    t.end();
  });

  t_parent.end();
});

