//fake/pseudo database. Will remove later! This is just to test our connection.
const users = [
    {
        username: "cathy123",
        password: "icecream"
    },
    {
        username: "bobbi",
        password: "badpassword"
    },
    {
        username: "petey",
        password: "bestcateverrr"
    }
]

function getUsers() {
    return users;
}

module.exports = { getUsers }