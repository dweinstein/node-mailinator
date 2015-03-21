node-mailinator
===============

node [mailinator](http://www.mailinator.com) api.

```
var mailinator = require('mailinator')({token: 'token-here'});

mailinator.getMessages('georgebush', function (err, res) {
  console.log(res);
  mailinator.readMessage(res[0].id, function (err, res) {
    console.log(res);
  });
});
```

Get a token from [mailinator](http://www.mailinator.com/)
