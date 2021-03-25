// const jwt = require('jsonwebtoken')
// const { hash } = require('bcryptjs')

module.exports = {
    Query: {
        user: () => "hello from user"
    },
    // Mutation: {
    //     register: (parent, { email, password }) => {
    //         const hashPassword = hash(password, 12);

    //     }
    // }
}