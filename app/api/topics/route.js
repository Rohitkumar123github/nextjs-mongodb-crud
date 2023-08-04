import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic"
import { NextResponse } from "next/server"


//adding new data to db
export async function POST(request){
    const {title, description } =await request.json()
    await connectMongoDB()
    //creating model
    await Topic.create({title, description})
    return NextResponse.json({message: "Topic Created"},{ status: 201})
}


//getting all the data in the db
export async function GET(){
    await connectMongoDB()
    const topics = await Topic.find()
    return NextResponse.json({topics}, {status: 200})

}

//deleting a particular topic in the db
export async function DELETE(request){
    const id = request.nextUrl.searchParams.get('id')
    await connectMongoDB()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message: "Topic deleted"}, {status: 200})
}