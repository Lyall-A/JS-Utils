const App = require("../App");
const app = new App();

app.get("/", (req, res) => {
    res.end("hi")
});


app.listen(5000, () => console.log("listening"));