import  express  from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { Rotas } from "./Routes/rotas"



dotenv.config()
export const api=express()
api.use(express.urlencoded({extended:true}))
api.use(cors({origin:'*'}))
api.use(Rotas)
api.listen(process.env.PORT)