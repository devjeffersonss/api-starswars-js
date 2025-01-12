const express = require('express')
const app = express()
app.use(express.json())
const port = 4010

const mongoose = require('mongoose')

// conexão com o mongoDb e tratamento de erro!

// criando os tipos de dados para o banco de dados
const Film  = mongoose.model('Film', {
    title:String,
    description: String,
    image_url: String,
    trailer_url: String
})

// Rotas get 
app.get('/' , async (req,res) => {
    const films = await Film.find()
   return res.send(films)
})

app.put('/:id' , async(req, res) =>{
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.description,
        trailer_url: req.body.trailer_url
    },{
        new: true
    })
    return res.send(film)
})

app.post('/' , async (req,res) =>{
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.description,
        trailer_url: req.body.trailer_url
    })
    await film.save()
    return res.send(film)
})


app.delete('/:id' , async (req,res) =>{
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://devjefferson:7zGCYC6AeKSJ8XmM@cluster0.6gsa9bl.mongodb.net/?retryWrites=true&w=majority&appName=cluster0');
    console.log(`Example app listening on port ${port}`)
  })

