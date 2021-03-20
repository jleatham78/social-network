const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params, body }, res) {
        console.log(params);
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({ params, body }, res) {
        console.log(params);
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;