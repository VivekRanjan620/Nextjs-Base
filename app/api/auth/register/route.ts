import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import db from '../../../lib/db'

export async function POST(req: NextRequest){
    const { name, email, password} = await req.json();

    //INPUT-FIELDS-CHECK
    if(!name || !email || !password){
        return NextResponse.json({ success:false, message: "Required all fields"}, {status:400});        
    }

    // EMAIL ALLREADY-EXIST
    const[existing]: any = await db.query(
        "SELECT id FROM users WHERE email =?", [email]
    );
    if(existing.length > 0){
        return NextResponse.json({success:false , message: "Email allReady Registred"}, {status:400})
    }

    //PASSWORD-HASH
    const hashedPassword = await bcrypt.hash(password, 10);

    //USER-SAVE
    await db.query(
        "INSERT INTO users (name, email, password) VALUES(?,?,?)",
        [name, email, hashedPassword]
    );
    
    return NextResponse.json({success: true, message: "Account created, Now You can login"})

}