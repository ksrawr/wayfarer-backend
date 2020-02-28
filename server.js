const express = require('express');
const app = express();

/* Change to .env variable later	 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
})