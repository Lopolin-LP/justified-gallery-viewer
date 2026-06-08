function randomWait() {
	return new Promise(res => {
		setTimeout(res, Math.round(Math.random()*5)*1000);
	})
}
(async function(){
	await Promise.all(Array(50).fill(null).map(async (v) => {
		await randomWait();
		return v;
	}));
	console.log("Finished!")
})()