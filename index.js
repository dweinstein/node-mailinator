var q = require('hyperquest');
var split = require('split');
var parse = require('JSONstream').parse;
var util = require('util');
var qs = require('querystring');
var through = require('through2').obj;

module.exports = function Mailinator(opts) {
  var base = opts.apiUrl || "https://api.mailinator.com/api/";

  function _request(opt, callback) {
    opt = opt || {};

    var all = [];
    q(opt.url)
    .pipe(split())
    .pipe(parse(opt.parse))
    .pipe(through(function (chunk, enc, callback) {
      this.push(chunk);
      callback();
    }))
    .on('data', function(data) {
      all.push(data);
    })
    .on('end', function() {
      callback(null, all);
    });
  }

  function readMessage(msgid, callback) {
    var url = base + '/email?' + qs.stringify({token: opts.token, msgid: msgid});
    _request({url: url}, function (err, res) {
      callback(err, err ? null : res[0]);
    });
  }

  function getMessages(to, callback) {
    var url = base + '/inbox?' + qs.stringify({token: opts.token, to: to || opts.to});
    _request({url: url, parse: 'messages.*'}, callback);
  }

  return {
    getMessages: getMessages,
    readMessage: readMessage
  };
};

