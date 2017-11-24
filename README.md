# imap-box-names

This module takes an instance of the
[imap](https://github.com/mscdex/node-imap) module, and
an error-first callback, generating all valid IMAP
box (also known as "folder") names.

## general use

```js
const Imap = require('imap')
const boxNames = require('imap-box-names')

const imap = new Imap({
	user: 'me@gmail.com',
	password: 'abc123',
	host: 'imap.gmail.com',
	port: 993,
	tls: true
})

// must wait until imap is ready
imap.once('ready', () => {
	boxNames(imap)
		.then(names => {
			console.log('array of box names', names)
		})
		.catch(error => {
			console.log('error from imap module', error)
		})
})
```

### `imap`

The instance of `imap` provided must be instantiated and
have already emitted the `ready` event.

### `error`

The returned error is whatever error is given by the imap
module after `imap.getBoxes()` is called.

### `names` *(array)*

The returned value is an array of formed IMAP box names. For
example:

```js
names = [
	'INBOX',
	'INBOX.Sent',
	'INBOX.Archived',
	'INBOX.Trash'
]
```

## license

Published and released under the [VOL](http://veryopenlicense.com).
