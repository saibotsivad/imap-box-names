const test = require('tape')
const boxNames = require('./index')

test('if there is an error return that error', t => {
	const error = { message: 'specific error' }
	const imapMock = {
		getBoxes(cb) {
			cb(error)
		}
	}
	boxNames(imapMock)
		.catch(outputError => {
			t.ok(outputError === error, 'equivalent by reference')
			t.end()
		})
})

test('the returned array contains correct names', t => {
	const boxObject = {
		INBOX: {
			delimiter: '.',
			children: {
				Archive: {},
				Sent: {
					delimiter: '/',
					children: {
						Gross: {}
					}
				}
			}
		}
	}
	const imapMock = {
		getBoxes(cb) {
			cb(false, boxObject)
		}
	}
	boxNames(imapMock)
		.then(names => {
			t.deepEqual(names, [ 'INBOX', 'INBOX.Archive', 'INBOX.Sent', 'INBOX.Sent/Gross' ], 'contains all box names')
			t.end()
		})
})
