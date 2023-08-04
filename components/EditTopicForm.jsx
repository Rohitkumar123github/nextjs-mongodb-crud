"use client"
import {useState} from 'react'
import { useRouter } from 'next/navigation'
const EditTopicForm = ({id,title,description}) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const router = useRouter()

  const handleSubmit=async(e)=>{
    e.preventDefault()

    if(!newTitle || !newDescription){
      alert("Title and Description are required")
      return
    }

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
        method: "PUT",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({newTitle, newDescription})
      })

      if(!res.ok){
        throw new Error("Failed to update topic")
      }
      router.push("/")
      router.refresh()

    } catch (error) {
      console.log(error)
    }
  }

  console.log("newTi--", newTitle)
  return (
    <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
    <input type="text" placeholder="Topic Title" className="border border-slate-500 px-8 py-2" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} autoFocus/>
    <input type="text" placeholder="Topic Description" className="border border-slate-500 px-8 py-2" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}/>
    <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit" type='submit'>Update Topic</button>
</form>
  )
}

export default EditTopicForm