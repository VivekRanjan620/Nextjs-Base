import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import db from "../../../lib/db"
import { createToken } from "../../../lib/auth"

export async function POST(req: NextRequest){
    const {email , password} = await req.json();

    //FIND USER
    const [users]: any = await db.query(
    "SELECT * FROM users WHERE email = ?", [email]
  );

  if(users.length === 0){
    return NextResponse.json({success:false, message: "Email or Password wrong"}, {status:401})
  };

  const user = users[0];

  //PASSWORD-CHECK
  const isValid = await bcrypt.compare(password, user.password);
  if(!isValid){
    return NextResponse.json({success:false, message: "Email or Password wrong"}, {status:401})
  }

  //CREATE-TOKEN AND PUT INTO COOKIE
  const token = await createToken(user.id, user.role);
  const response = NextResponse.json({ 
    success: true,
    message: "Login Successful", 
    role: user.role
     });

  response.cookies.set("token", token,{
     httpOnly: true,  // JS se access nahi hoga — secure hai
     maxAge: 60 * 60 * 24 * 7, // 7 din
  });

  return response;
  
}