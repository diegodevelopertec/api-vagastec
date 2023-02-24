import {Request,Response,Router} from 'express'
import * as userController from './../Controllers/useController'
import { Auth } from '../midlewares/Auth'
export const Rotas=Router()

Rotas.get('/',(req,res)=>{
    res.send('hello word')
})


//users

Rotas.post('/login',userController.Login) ///login
Rotas.post('/register',userController.Register)//cadastro
Rotas.get('/users',userController.getAllUsers)//pegar todos os usua´rios 
Rotas.get('/users/:type',userController.getUsersTypes) //pegar todos os usuários do tipo candidato ou recrutador
Rotas.get('/users/:type/:id',userController.getUser) //pegar um usuario somente
Rotas.put('/users/:type/:id',userController.updateUser)//atualizar informações de usuário
Rotas.delete('/users/:type/:id',userController.deleteUser)//deletar um usuário

Rotas.get('/vagas',Auth.private,(req:Request,res:Response)=>{res.json({ok:'vagas'})})

