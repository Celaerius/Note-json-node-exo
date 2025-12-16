const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todo.controllers');

router.get('/', TodoController.getAllTodos);
router.get('/notags', TodoController.getTodosNoTags);
router.post('/', TodoController.createTodo);



module.exports = router;
