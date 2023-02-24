import {Request,Response} from 'express'
import { where } from 'sequelize'
import { users } from '../Models/userModel'
import  JWT  from 'jsonwebtoken'






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
        res.json({error:`nenhum ${type} encontrado`})
    }


}

export const Register=async(req:Request,res:Response)=>{
    if(req.body.email && req.body.senha ){
        let {nome,foto,cpf,tipo,email,password,github,linkedin}=req.body

        let user=await users.findOne({where:{email}})

        if(!user){
            let newUser=await users.create({nome,foto,cpf,tipo,email,password,github,linkedin})
            const token=JWT.sign(
                {id:newUser.id,emai:newUser.email},
                process.env.JWT_KEY as string,
                {expiresIn:'2h'}
            )

            res.json({id:newUser.id,token})
        }else{
            res.json({erro:'email e/ou senhas já existem'})
        }
    
    }

     return res.json({erro:'email e/ou senha não enviados'})

}


export const Login=async(req:Request,res:Response)=>{
 
    if(req.body.email && req.body.senha ){
        let {email,senha}=req.body

        let user=await users.findOne({where:{email,senha}})

        if(user){
           
            const token=JWT.sign(
                {id:user.id,emai:user.email},
                process.env.JWT_KEY as string,
                {expiresIn:'2h'}
            )

           res.json({status:true,token})
        }else{
            res.json({status:false})
        }
    
    }
     return res.json({erro:'email e/ou senha não enviados'})
   

}




