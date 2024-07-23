const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let categories = [
    { id: 1, name: "Elektronik" },
    { id: 2, name: "Perabotan" },
    { id: 3, name: "Pakaian" }
];

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
    {
        id: 3,
        name: 'Kursi',
        category: 'Perabotan'
    },
    {
        id: 4,
        name: 'Rak Sepatu',
        category: 'Perabotan'
    },
    {
        id: 5,
        name: 'Gaun Putih',
        category: 'Pakaian'
    }
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
    const newCategoryId = categories.length ? categories[categories.length - 1].id + 1 : 1;
    const category = {
        id: newCategoryId,
        name: newCategory.name
    };
    categories.push(category);
    res.status(201).json(category);
});

app.put('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const updateCategory = req.body;
    const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: "Category not found" });
    }
    categories[categoryIndex].name = updateCategory.name;
    res.status(200).json(categories[categoryIndex]);
});

app.delete('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.filter(cat => cat.id === categoryId);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    categories = categories.filter(cat => cat.id !== categoryId);
    res.status(200).json(category);
});




app.get('/api/products/search', (req, res) => {
    const productName = req.query.name;
    const productFound = products.filter((product) =>
        product.name.toLowerCase().includes(productName.toLowerCase())
    );
    res.json(productFound);
});

app.get('/api/products/:category/product', (req, res) => {
    const category = req.params.category.toLowerCase();
    const productName = req.query.name ? req.query.name.toLowerCase() : '';

    const filterProduct = products.filter((product) => {
        product.category.toLowerCase() === category &&
            product.name.toLowerCase().includes(productName);
    });

    if (filterProduct.length === 0) {
        return res.status(404).json({ message: "Product Not Found" });
    }

    res.json(filterProduct);

});


app.listen(port, () => {
    console.log(`Server is running at port :${port}`);
});