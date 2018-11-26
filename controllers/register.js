const handleRegister = (req,res,db,bcrypt) => {
    const {name,password,email} = req.body;
    if(!name || !password || !email){
        return res.status(400).json('something on register form is empty')
    }
    // to hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })  
        })
        .then(trx.commit)
        .catch(trx.rollback) //rollback the all data that doesn't complete
    })
    .catch(err => res.status(400).json('unable to register'))    
}

module.exports = {
    handleRegister:handleRegister
}