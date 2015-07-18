node-mailinator
===============

node [mailinator](http://www.mailinator.com) api.

## Example

```js
var mailinator = require('mailinator')({token: 'token-here'});

mailinator.getMessages('georgebush', function (err, messages) {
  console.log(messages);
  mailinator.readMessage(messages[0].id, function (err, res) {
    console.log(res);
  });
});
```

## API

```js
var mailinator = require('mailinator')(opts);
```

#### `opts`

An object of options:

- `opts.token` is a token string from [mailinator](http://www.mailinator.com/). **Required**.
- `opts.apiUrl` is the base url for the api. Defaults to `"https://api.mailinator.com/api/"`.
- `opts.to` is the [local part][local-part] of an email address that mail was sent to. E.g. `"obscure"` would aquire the mail sent to obscure@mailinator.com

#### `mailinator.getMessages(to, cb)`

- `to` is the [local part][local-part] of an email address that mail was sent to. If `null`, the default is `opts.to`.
- `cb(err, messages)`
  - `err` is null or an Error object.
  - `messages` is the parsed response data. [Example `messages` object](https://github.com/dweinstein/node-mailinator/blob/master/test/fixtures/inbox.json)

```js
// whatever@mailinator.com
mailinator.getMessages("whatever", function (err, data) {
  console.dir(data); // => [{ id: '1420049469-71065803-whatever', ... }, ...]
})
```

#### `mailinator.readMessage(msgId, cb)`

- `msgId` is the id of the desired message. E.g. `"1420049469-71065803-whatever"`
- `cb(err, message)`
  - `err` is null or an Error object.
  - `message` is the parsed response data. [Example `message` object](https://github.com/dweinstein/node-mailinator/blob/master/test/fixtures/email.json)

```js
// whatever@mailinator.com
mailinator.readMessage("1420049469-71065803-whatever", function (err, data) {
  console.dir(data); // => { apiInboxFetchesLeft:697, apiEmailFetchesLeft: 10, ... }
})
```

## License

[ISC](http://opensource.org/licenses/ISC)

[local-part]: https://en.wikipedia.org/wiki/Email_address#Local_part
