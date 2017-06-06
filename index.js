module.exports = (imap, cb) => {
	imap.getBoxes((error, boxes) => {
		if (error) {
			cb(error)
		} else {
			cb(false, getRecursiveBoxNames(boxes))
		}
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
