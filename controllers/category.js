const Category = require('../models/category');

module.exports = {
    create: async (req, res, next) => {
        const data = req.body;
        const title = req.body.title;

        // Check if there is an item with the entered name
        const foundItem = await Category.findOne({
            "title": title
        });
        if (foundItem && !foundItem.deleted) {
            return res.status(403).json({
                msg: 'Kategorie existiert bereits'
            });
        }
        // Create a new item
        const newItem = new Category(data);
        //save newProduct and respond with it
        await newItem.save();
        res.status(201).json({
            newItem
        });
    },

    getAll: async (req, res, next) => {
        console.log('getAllCategories')
        console.log(req.body.userId)
        Category.find({
            'deleted': false,
            user_id: req.body.userId
        }, function (err, items) {
            if (err) return console.error(err);
            res.status(200).json({
                items
            });
        })
    },

    findOne: async (req, res, next) => {
        const filter = {
            _id: req.body.id
        };
        let item = await Category.findOne(filter);
        if (item) {
            res.status(200).json({
                item
            })
        } else {
            res.sendStatus(400)
        }
    },

    edit: async (req, res, next) => {
        const filter = {
            _id: req.body._id
        };
        const data = req.body
        let updateItem = await Category.findOneAndUpdate(filter, data, {
            new: true
        });
        res.status(200).json({
            updateItem
        });
    },

    delete: async (req, res, next) => {
        const filter = {
            _id: req.body._id
        }
        let item = await Category.findOne(filter);
        if (item) {
            item.deleted = true;
            await item.save();
            res.status(200).json({
                "msg": "Kategorie gelöscht"
            })
        } else {
            res.sendStatus(400)
        }
    },

    finalDelete: async (req, res, next) => {
        Category.deleteMany({
            'deleted': true
        }, function (err) {
            if (err) return handleError(err);
            res.status(200).json({
                "msg": "Alle gelöschten Kategorien entfernt"
            })
        });
    }
}