function sliceField(field, length) {
	let sliceName = field;
	if (field.length > 30) {
		sliceName = field.slice(0, length);
		sliceName += "...";
	}
	return sliceName;
}

module.exports = { sliceField };
