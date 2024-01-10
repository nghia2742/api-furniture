const product = require('../model/product');

const productController = {
    // index: async (req, res) => {
    //     try {
    //         const response = await fetch('https://dummyjson.com/products');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data = await response.json();
    //         res.json(data);
    //     } catch (error) {
    //         res.status(404).json(error);
    //     }
    // },

    index: async (req, res) => {
        try {
            // Filter
            const search = req.query.search;
            let query = {};
            if (search !== undefined) {
                const name = { $regex: search, $options: 'i' };
                query = { ...query, name };
            }

            // Pagination
            const page = req.query.page ?? 1;
            const itemsPerPage = 6;
            const itemsToSkip = (page - 1) * itemsPerPage;

            // Sort
            const sortName = req.query.sort ?? 'id';
            const order = Number(req.query.order) === -1 ? -1 : 1;
            const sort = { [sortName]: order };
            var data = [];

            data = await product
                .find(query)
                .skip(itemsToSkip)
                .limit(itemsPerPage)
                .sort(sort);

            const allData = await product.find({});
            var lengthProducts = allData.length;
            if (search !== undefined) {
                let temp = await product.find(query);
                lengthProducts = temp.length;
            }
            res.json({ data, length: lengthProducts });
        } catch (error) {
            res.status(404).json(error);
        }
    },

    getProductDetail: async (req, res) => {
        try {
            const name = req.params.slug;
            const data = await product.findOne({
                name: { $regex: name, $options: 'i' },
            });
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json('Failed to Fetch');
        }
    },

    getProductByIds: async (req, res) => {
        const productIds = req.body.productIds;

        try {
            const products = await product.find({ _id: { $in: productIds } });

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching products' });
        }
    },
};

module.exports = productController;
