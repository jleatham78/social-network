const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought)

router
    .route(':thoughtId/reactions')
    .post()//create reaction)
    .delete()//remove reaction)