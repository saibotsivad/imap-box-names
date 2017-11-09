module.exports = function imapBoxNames(imap) {
	return new Promise((resolve, reject) => {
		imap.getBoxes((error, boxes) => {
			if (error) {
				reject(error)
			} else {
				resolve(getRecursiveBoxNames(boxes))
			}
		})
	})
}

function getRecursiveBoxNames(boxes) {
	return Object.keys(boxes)
		.reduce((list, box) => {
			list.push(box)
			if (boxes[box].children) {
				const childBoxes = getRecursiveBoxNames(boxes[box].children)
					.map(name => `${box}${boxes[box].delimiter}${name}`)
				list.push(...childBoxes)
			}
			return list
		}, [])
}
