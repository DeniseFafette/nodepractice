const router = require('express').Router();
const db = require('./users-modal');

// eliminate password for security by destructuring and mapping over the arrray
router.get('/', (req, res) => {
    db.find()
        .then(user => {
            const users = user.map(item => {
                return {
                    username: item.username,
                    id: item.id,
                    role: item.role
                }
            })
            //const {username, id, role} = user[0]
            res.status(200).json({users})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not find users.'});
        })
})

// add user and validate that user doesn't already exist
router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Unable to add user.'})
        })
})

// added validate by Id by replacing req.params.id with req.user - set up users modal
router.put('/:id', validateUserId, (req, res) => {
    db.update(req.user, req.body)
        .then(user => {
            res.status(203).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Unable to edit user.'});
        })
})

// replace req.params.id with req.user
router.delete('/:id', validateUserId, (req, res) => {
    db.remove(req.user)
        .then(user => {
            res.status(203).json({message: 'User successfully deleted', deleted_records: `${user}`})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Unable to delete user.'})
        })
})

// check user ... need to add else if and else so it stops
function validateUser(req, res, next) {
    const username = req.body.username
    if(!username) {
        res.status(403).json({error: 'Please provide a username'})
    } else {
        db.findByUserName(username)
            .then(user => {
                if(user) {
                res.status(404).json({error: "Username already exists"})
                } else {
                    next()
                }
            })
    }
}

function validateUserId(req, res, next) {
    db.findById(req.params.id)
        .then(user => {
            console.log(user)
            if(user) {
                req.user = user.id
                    next()
                } else {
                    res.status(400).json({error: 'Invalid user id'})
                }
            })
}

module.exports = router;