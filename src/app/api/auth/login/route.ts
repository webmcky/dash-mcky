import User from '@/models/User';
import bcrypt from 'bcrypt';
import { userAtributes } from '@/types/user';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request, res: Response) {
    try {
        const {email, password} = await req.json();
        const user = await User.findOne({where:{email}}) as unknown as userAtributes | null;
        if(!user){
            return NextResponse.json({error: "Invalid email or password"}, {status: 401});
        }
        // cek password 
        const isPasswordValid = await bcrypt.compare(password, user?.password || '');
        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid email or password"}, {status: 401});
        }
         const {id, name} = user;

        // accesstoken 
        const accesstoken = jwt.sign(
            {id: user.id, email: user.email, name: user.name},
            process.env.JWT_SECRET as string,
            {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN}
        )
        const refreshtoken = jwt.sign(
            {id: user.id, email: user.email, name: user.name},
            process.env.JWT_REFRESH_SECRET as string,
            {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
        )
        
        const res = NextResponse.json(
             {
                message: "Login successful",
                user : {
                    id, name, email
                }
            },
            { status: 200}
           
        ); 
        
        // save in cookies 
        res.cookies.set('accessToken', accesstoken, {
            httpOnly: true,
            maxAge: 60 * 5,
            sameSite: "strict",
            path: "/",
            secure : process.env.NODE_ENV === 'production'

        })

        res.cookies.set('refreshToken', refreshtoken, {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "strict",
        })
        return res;
    } catch (error) {
        return new Response(JSON.stringify({error: "Internal Server Error"}), {status: 500});
    }
}