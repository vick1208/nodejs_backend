const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let categories = [
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Perabotan" }
];

app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

app.post('/api/categories', (req, res) => {
    const newCategory = req.body;
    newCategory.id = categories.length ? categories[categories.length - 1].id + 1 : 1;
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

app.put('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex !== -1) {
        categories[categoryIndex] = { id: categoryId, ...req.body };
        res.json(categories[categoryIndex]);
    } else {
        res.status(404).json({ message: "Category not found" });
    }
});

app.delete('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    categories = categories.filter(cat => cat.id !== categoryId);
    res.status(204).send();
});


let products = [
    {
        id: 1,
        name: 'Laptop',
        category: 'Elektronik'
    },
    {
        id: 2,
        name: 'Meja',
        category: 'Perabotan'
    },
];

app.get('/api/products', (req, res) => {
    const productName = req.query.name;
    const productFound = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (productFound) {
        res.json(productFound);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.get('/api/products/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const productName = req.query.name;

    const categoryName = categories.find(cat => cat.id === categoryId).name

    const productFoundCategory = products.find(p => p.category === categoryName);

    // const productFoundByName = products.find(p => p.name.toLowerCase() === productName.toLowerCase());

    if (productName) {
        res.json({
            name: productName,
            "product by Category ID": productFoundCategory
        });
    } else{
        res.json(productFoundCategory);
    }

});


app.listen(port, () => {
    console.log(`Server is running at port :${port}`);
});