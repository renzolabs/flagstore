const express = require("express");
const app = express();

app.get("/", (req, res) => {
	  res.json({
		      message: "Hello from origin server",
		      headers: req.headers,
		    });
});

app.get("/secure", (req, res) => {
	  const email = req.headers["cf-access-authenticated-user-email"] || "unknown";
	  const country = req.headers["cf-ipcountry"] || "unknown";

	  res.send(`
	      <h1>Secure Page</h1>
	          <p>${email} authenticated at ${new Date().toISOString()} from ${country}</p>
		      <a href="/secure/${country}">View Flag</a>
		        `);
});

app.listen(3000, () => console.log("Server running on port 3000"));
