import { NextRequest, NextResponse } from "next/server";



export  async function POST(req:NextRequest) {
    if (req.method == "POSt") {
        const payload = await req.json()
        console.log("📦 Webhook Payload:", payload);
        return new NextResponse(JSON.stringify({message: "Webhooks recieved successfully"}))
    }else {
        return new NextResponse(JSON.stringify({message: "Webhooks not receieved"}))
    }
    
}