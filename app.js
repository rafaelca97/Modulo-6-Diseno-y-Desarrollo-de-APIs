const express = require (`express`);
const app = express();
const port = 3000;

const books = require (`./routes/books`);

app.use(express.json());

const swaggerJsDoc = require (`swagger-jsdoc`);
const swaggerUI = require(`swagger-ui-express`);
const swaggerOptions = {
    definition: {
        openapi: `3.0.0`,
        info: {
            title: `ACME Technologies`,
            version: `1.0.0`,
            description: `App test APIRest`,
            contact: {
                name: `Rafa Campos`,
                email: `rafaelcamposcamacho97@gmail.com`
            }
        },
        servers: [
            {url: `http://localhost:3000`}
        ],
        supportedSubitMethods: []
    },
    apis: [
        `./routes/books.js`
    ]
}

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerSpecs, {customCss: `.swagger-ui .topbar, .swagger-ui .try-out {display: none}`}))

app.use(`/books`, books);
app.use(`/*`, (req, res) => {
    res.status(404).json({
        message: `Incorrect route or params`,
    })
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost${port}`);
})

