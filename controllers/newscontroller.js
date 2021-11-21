const newscontent = require('../models/newscontent')
const jwtcheck = require('../controllers/jwtcheck')
const { response } = require('express')


exports.create = (request,response)=>{
    let verify = jwtcheck.check(request.headers.authorization)
    if ( verify == false){
        response.status(500).send({
            message:"verify false"
        })
    } else {            
        if ( verify.roles !== "admin"){
            response.status(500).send({
              message:"verify false"
            })
        } else{
            let newscreate = new newscontent({
                title: request.body.title,
                excerpt:  request.body.description.substring(0,30),
                description: request.body.description,
                image:  request.body.image,
                date: new Date(),
                upload: verify.username,
            })        
            newscreate.save(newscreate).then(coba =>{
              response.send({
                message: 'news has been create',
                result: coba})
                })
            }
        }

    } 


    exports.delete = (request, response) => {
        let _id = request.body._id
        let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                newscontent.findOne({"upload" : verify.username,"_id": request.body._id  })
                .then(result=>{
                    if(result === null){
                        response.send({ message : 'content salah user'})
                        }else{
                        if (verify.username !== result.upload){
                            response.send({ message: 'user upload salah', status: 501, auth: false })
                            }else {
                                let params = {
                                    title: request.body.title,
                                    excerpt:  "gagal",//request.body.description.substring(0,30),
                                    description: request.body.description,
                                    image:  request.body.image,
                                    date: new Date(),
                                }
                                newscontent.deleteOne( { _id: _id } )
                                .then(resp => {
                                    response.send({
                                        message: "Delete Success",
                                        result: _id
                                    })
                                })
                                .catch(err =>{
                                    response.send({
                                        message:"error"
                                })
                            })
                        }
                    }
                })
            }
        }
    }
      
    
    exports.view = (request,response)=>{let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            } else{
                newscontent.find().then(coba =>{
                    response.send({
                        message: 'view News',
                        result: coba
                    })
                }) 
            }
        }
    }


    exports.update = (request,response)=>{let verify = jwtcheck.check(request.headers.authorization)
        if ( verify == false){
            response.status(500).send({
                message:"verify false"
            })
        } else {            
            if ( verify.roles !== "admin"){
                response.status(500).send({
                  message:"verify false"
                })
            }else{
                newscontent.findOne({"upload" : verify.username,"_id": request.body._id  })
                .then(result=>{
                    if(result === null){
                        response.send({ message : 'content salah user'})
                        }else{
                        if (verify.username !== result.upload){
                            response.send({ message: 'user upload salah', status: 501, auth: false })
                            }else {
                                let params = {
                                    title: request.body.title,
                                    excerpt:  "gagal",//request.body.description.substring(0,30),
                                    description: request.body.description,
                                    image:  request.body.image,
                                    date: new Date(),
                                }
                                newscontent.updateOne({_id: request.body._id}, params)
                                .then(resp => {
                                response.send({
                                    message: "Update Success",
                                    })
                                })
                                .catch(err =>{
                                    response.send({
                                        message:"error"
                                })
                            })
                        }
                    }
                })
            }
        }
    }