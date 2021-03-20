const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUser)
    .get(getUserById)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/:userId/friends/:friendId')
    .post()//new friend);
    .delete()//delete friend);

module.exports = router;