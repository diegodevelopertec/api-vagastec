import { UserInfo } from 'os'
import {DataTypes,Model} from 'sequelize'
import { mysqlInstance } from '../Instances/mysqlInstance'


export interface userInterface extends Model{
    id:number,
    nome:string,
    foto?:string,
    cpf:string,
    tipo:string,
    email:string,
    password:string,
    github:string,
    linkedin:string
} 

export const users=mysqlInstance.define<userInterface>('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       
    },
    nome:{
        type:DataTypes.STRING,
    },
    foto:{
        type:DataTypes.STRING,
    },
    cpf:{
        type:DataTypes.STRING,
    },
    tipo:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
     senha:{
        type:DataTypes.STRING,
    },
    github:{
        type:DataTypes.STRING,
    },
    linkedin:{
        type:DataTypes.STRING,
    }









},{
    tableName:'user',
    timestamps:false
})