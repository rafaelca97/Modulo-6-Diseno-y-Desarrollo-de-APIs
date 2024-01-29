const express = require (`express`);
const app = express();

/**
 * @swagger
 * tags:
 *      name: Books
 *      description: Books API REST
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Book:
 *              type: object
 *              required:
 *                  - id
 *                  - name
 *                  - author
 *                  - editorial
 *              properties:
 *                  id:
 *                      type: number
 *                      description: Unique identifier
 *                  name:
 *                      type: string
 *                      description: product name
 *                  author:
 *                      type: string
 *                      description: manufacturer name
 *                  editorial:
 *                      type: string
 *                      description: product details
 */

const books = [
    {id: 1, name: "El Quijote", author: "Miguel de Cervantes", editorial: "Santillana"},
    {id: 2, name: "La Regenta", author: "Leopoldo Alas 'Clarín'", editorial: "Santillana"},
    {id: 3, name: "Luces de Bohemia", author: "Valle-Inclán", editorial: "Santillana"}
];

/**
 * @swagger
 * /books/search?brand=term:
 *  get: 
 *      summary: return products matched by brand
 *      tags: [Books]
 *      parameters:
 *          - in: query
 *            name: brand
 *            schema:
 *              type: string
 *            require: true
 *            description: brand product
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "json response {products: <array-products> | []}"
 *          400:
 *              description: "Incorrect query params"
 *          500:
 *              description: "Server error"
 *  post: 
 *      summary: return products matched by brand
 *      tags: [Books]
 *      parameters:
 *          - in: query
 *            name: brand
 *            schema:
 *              type: string
 *            require: true
 *            description: brand product
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "json response {products: <array-products> | []}"
 *          400:
 *              description: "Incorrect query params"
 *          500:
 *              description: "Server error"
 *  put: 
 *      summary: return products matched by brand
 *      tags: [Books]
 *      parameters:
 *          - in: query
 *            name: brand
 *            schema:
 *              type: string
 *            require: true
 *            description: brand product
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "json response {products: <array-products> | []}"
 *          400:
 *              description: "Incorrect query params"
 *          500:
 *              description: "Server error"
 *  delete: 
 *      summary: return products matched by brand
 *      tags: [Books]
 *      parameters:
 *          - in: query
 *            name: brand
 *            schema:
 *              type: string
 *            require: true
 *            description: brand product
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "json response {products: <array-products> | []}"
 *          400:
 *              description: "Incorrect query params"
 *          500:
 *              description: "Server error"
 */

app.get(`/`, (req, res) => {
    res.status(200).json({
        message: `OK`,
        books
    })
})

app.post(`/`, (req, res) => {
    if(!req.body) {
        return res.status(400).json({
            message:`Book fields mandatory`
        })
    }
    let book = req.body;
    book.id = books.length + 1;
    books.push(book);
    res.status(200).json({
        message: `ok`,
        book: books[books.length - 1]

    })
})

app.put(`/:id`, (req, res) => {
    if(!req.body || !req.params.id) {
        return res.status(400).json({
            message: `Product data or id param mandatory`
        })
    }
    const bookIndex = books.findIndex(elem => {
        return elem.id === Number(req.params.id);
    })
       
    if (bookIndex < 0) {
        return res.status(404).json({
            mensaje: `No se encontró ningún producto con ese id`
        })
    }
    for (const property in req.body) {
        books[bookIndex][property] = req.body[property]
    }
    res.status(200).json({
        message: `ok`,
        book: books[bookIndex]
    })
})

app.delete(`/:id`, (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({
            message: `id param mandatory`
        })
    }
    const bookIndex = books.findIndex(elem => {
        return elem.id === Number(req.params.id);
    })
    if (bookIndex < 0) {
        return res.status(404).json({
            mensaje: `No se encontró ningún producto con ese id`
        })
    }
    const deletedBook = books.splice(bookIndex, 1);
    res.status(200).json({
        message: `oK`,
        book: deletedBook
    })
})

module.exports = app;