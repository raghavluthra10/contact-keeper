const express = require('express');
const router = express.Router();

// @routes   GET api/contacts
// @desc   Get all users contacts
// @access   Private

router.get('/', (req, res) => {
    res.send('get all contacts');
});

// @routes   POST api/contacts
// @desc   Add new contacts
// @access   Private

router.post('/', (req, res) => {
    res.send('get all contacts');
});

// @routes   PUT api/contacts/:id
// @desc   updtae contacts
// @access   Private

router.put('/:id', (req, res) => {
    res.send('update contact');
});

// @routes   DELETE api/contacts/:id
// @desc   delete contacts
// @access   Private

router.delete('/:id', (req, res) => {
    res.send('delete contact');
});

module.exports = router;