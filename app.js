const express = require('express')
const path = require('path')

const app = express();

app.use(
    express.static(
        path.join(
            path.join(__dirname, 'CaloriesCounter')
        )
    )
)

app.listen(3000, () => {
    console.log("app running on 3000")
})