import {Request,Response,Router} from 'express'
import * as userController from './../Controllers/useController'

export const Rotas=Router()

Rotas.get('/',(req,res)=>{
    res.send('hello word')
})


//users


Rotas.post('/login',) ///login
Rotas.post('/register',)//cadastro
Rotas.get('/users',userController.getAllUsers)//pegar todos os usua´rios 
Rotas.get('/:type',userController.getUsersTypes) //pegar um usuário especifico por tipo
Rotas.get('/:id',userController.getUser) //pegar um usuario somente
Rotas.put('/:id',userController.updateUser)//atualizar informações de usuário
Rotas.delete('/:id',userController.deleteUser)//deletar um usuário




