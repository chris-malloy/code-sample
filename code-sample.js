router.post('/login', (req, res, next) => {

    var email = req.body.email
    // case for when password is undefined
    if (req.body.password !== undefined) {
        var password = req.body.password;
    } else {
        var password = '';
    }
    var selectQuery = 'SELECT * FROM user WHERE email = ?;';
    connection.query(selectQuery, [email], (error, results) => {
        if (error) {
            throw error
        } else {
            // handle user does not exist
            if (results.length == 0) {
                // send user to signup
                res.json({
                    msg: 'userDoesNotExist',
                })
            } else {
                var passwordMatch = bcrypt.compareSync(password, results[0].password)
                console.log(passwordMatch)
                // handle password match
                if (passwordMatch) {
                    // session?
                    // send them map
                    res.json({
                        msg: 'userFound',
                        userInfo: results[0]
                    })
                    // handle password does not match
                } else {
                    // tell user password does not match
                    res.json({
                        msg: 'wrongPassword',
                    })
                }
            }
        }
    })
});