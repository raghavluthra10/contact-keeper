const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// bringing in UserSchema
const User = require('../models/User');

// @routes   POST api/users
// @desc   Register a user
// @access   Public

router.post('/', [
    check('name', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid Email'),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const { name, email, password } = req.body;

    try {
        // check if user already exists
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({ msg: "User already exists" })
        };

        // If user does not exists, register new user
        user = new User({
            name, email, password
        });

        // encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user to database
        await user.save();

        res.send('User saved')

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;