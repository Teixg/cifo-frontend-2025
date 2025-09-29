export default async (req, res) => {
	const url = req.query.url || req.query.URL || req.body?.url;
	if (!url) {
		return res.status(400).json({ error: "Missing url parameter" });
	}
	try {
		const fetchRes = await fetch(url);
		const data = await fetchRes.text(); // Use .text() for both JSON and XML
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Content-Type",
			fetchRes.headers.get("content-type") || "application/json"
		);
		return res.status(fetchRes.status).send(data);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
