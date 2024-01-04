const UserDb = require("../model/model");

//create and save new user
exports.create = (req,res) => {
    // validate req
    if(!req.body){
        res.status(400).send({mesg: "Content cannot be empty"})
        return;
    }
    //new user 
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in DB;
    user
    .save(user)
    .then(data => {
        // res.send(data))
        res.redirect("/add-user")
    })
    .catch(err =>{
        res.status(500).send({message: err.message || "Error Occured in Create operation" })
    })

}

// Find a user 
exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;
        UserDb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({messsage: "User Not found by this id!" + id})
            }else{
                return res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({messsage: "Error retrieving user's ID!"})
            console.log()
        })

    }else{
        UserDb.find()
        .then( user => res.send(user))
        .catch(err => {
            res.status(500).send({message: err.message || "Error Occured in Finding user operation" })
        })
    }

}

// Update a new identified user by user id; 

exports.update = (req,res) => {
    if(!req.body){
        return res.status(400).send({mesg: "Content update cannot be empty"})
    }
    const id = req.params.id;
    UserDb.findByIdAndUpdate(id.req.body , { useFindAndModify: false})
    .then( data => {
        if(!data){
            res.status(404).send({message: `Cannot Update user with ${id} , user not Found `})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error Updating user information" })
    })
}



// Delete a user with specified user id in the request:
exports.delete = (req,res) => {
    const id = req.params.id;
    UserDb.findByIdAndDelete(id)
    .then(data => {
        if(data){
            res.status(404).send({message: `Cannot delete ${id} Maybe it is wrong`})
        }else{
            res.send({message: "User Deleted Successfully"})
        }
    })
    .catch(err => {
        res.status(404).send({message: `Could not delete user with ${id}`})
    })

}