const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey:'cb125f3832884dbaaae49e4458cc803a'
  });

const handleImageUrl = (req,res) => {
    app.models
      .predict (Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => res.json(data))
      .catch(err => res.json(err))
}


const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(response => res.json(response))
        .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    handleImage,handleImageUrl
}