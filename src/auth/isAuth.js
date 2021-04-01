const { rule, shield } = require('graphql-shield');


const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== null;
});


module.exports = shield({
    Query: {
        company: isAuthenticated
    }
})