import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
dotenv.config()

export const Auth={
    private: async (req:Request,res:Response,next:NextFunction)=>{
       let  sucess=false
        

      
    
        if(req.headers.authorization){
            const [authType,token]=req.headers.authorization.split(' ')
        
            if(authType === 'Bearer'){
                    try{
                        JWT.verify(token,process.env.JWT_KEY as string)
                        sucess=true
                    }catch(e){
                        console.log(e);
                        
                    }
            }

        }

        if(sucess){
            next()
        }else{
            res.json({error:'entrada não autorizada'})
        }
       
    

    






    }
}