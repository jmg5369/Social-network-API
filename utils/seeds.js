const connection = require('../config/connection');
const mongoose = require('mongoose')
const { User, Thought } = require('../models');


const userData = [
    {username: "Max236", email: "jmg5366@gmail.com"},
    {username: "Damien189", email: "Damien@gmail.com"}
]


const thoughtData = {
    thoughtText: "I'm so glad to have completed Bootcamp!", 
    username: "Max236"
}


connection.once('open', async () => {
    // Delete the entries in the collection
    await User.deleteMany({});
    await Thought.deleteMany({});
    await User.create(userData)
    let thought = await Thought.create(thoughtData)
    await User.findOneAndUpdate(
        {username: thought.username},
        {$addToSet:{thoughts:thought._id}}

    )
    process.exit(0);
});