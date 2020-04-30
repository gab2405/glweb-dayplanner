const Task = require('../models/task');

module.exports = {
    create: async (req, res, next) => {
        const data = req.body;
        const title = req.body.title;

        // Check if there is an item with the entered name
        const foundItem = await Task.findOne({
            "title": title
        });
        if (foundItem && !foundItem.deleted) {
            return res.status(403).json({
                msg: 'Task existiert bereits'
            });
        }
        // Create a new item
        const newItem = new Task(data);
        //save newProduct and respond with it
        await newItem.save();
        res.status(201).json({
            newItem
        });
    },

    gettaskday: async (req, res, next) => {
        const filter = {
            _id: req.body.id
        };
        let today = new Date();
        const data = {
            date: today,
            done: false
        }
        let findItem = await Task.findOne(filter);
        findItem.taskdays.push(data)
        await findItem.save();
        res.status(200).json({
            findItem
        });
    },

    getAll: async (req, res, next) => {
        Task.find({
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
        let item = await Task.findOne(filter);
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
        let updateItem = await Task.findOneAndUpdate(filter, data, {
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
        let item = await Task.findOne(filter);
        if (item) {
            item.deleted = true;
            await item.save();
            res.status(200).json({
                "msg": "Task gelöscht"
            })
        } else {
            res.sendStatus(400)
        }
    },

    finalDelete: async (req, res, next) => {
        Task.deleteMany({
            'deleted': true
        }, function (err) {
            if (err) return handleError(err);
            res.status(200).json({
                "msg": "Alle gelöschten Tasks entfernt"
            })
        });
    }
}