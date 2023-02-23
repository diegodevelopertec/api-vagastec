import {Request,Response} from 'express'
import { where } from 'sequelize'
import { users } from '../Models/userModel'

export const createUser=async (req:Request,res:Response)=>{

   let {nome,foto,cpf,tipo,email,password,github,linkedin}=req.body
   let newUser=await users.create({nome,foto,cpf,tipo,email,password,github,linkedin})
    res.json({id:newUser.id,newUser})




}


export const getAllUsers=async (req:Request,res:Response)=>{
    let listUsers=await users.findAll()
    res.json(listUsers)
}

export const getUser=async (req:Request,res:Response)=>{
   let {id}=req.params
     let user=await users.findByPk(id)
     if(user){
        res.json({user})
     }else{
        res.json({erro:'usuário não existe'})
     }
}

export const updateUser= async (req:Request,res:Response)=>{
    let {id}=req.params
    let {nome,foto,cpf,tipo,email,password,github,linkedin}=req.body

    let user=await users.findByPk(id)
    if(user){
        user.nome=nome
        user.email=email
        user.cpf=cpf
        user.tipo=tipo
        user.password=password
        user.github=github
        user.foto=foto
        user.linkedin=linkedin

        await user.save()
        res.status(200).json({user})
    }else{
        res.json({erro:'usuário não encontrado'})
    }

}

export const deleteUser=async(req:Request,res:Response)=>{
    let {id}=req.params
    await users.destroy({where:{id}})
    res.json({sucess:'usuário deletado'})
}


export const getUsersTypes=async (req:Request,res:Response )=>{

    let {type}=req.params

    if(type === 'candidato'){
        let listUsers=await users.findAll({where:{
            tipo:'candidato'
        }})
        res.json(listUsers)
    }else if(type === 'recrutador'){
        let listUsers=await users.findAll({where:{
            tipo:'recrutador'
        }})
        res.json(listUsers)
    }else{
        res.json({error:'nada encontrado' })
    }


}