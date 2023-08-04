import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi"
// import Error from 'next/error'

const getTopics = async()=>{
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    })

    if(!res.ok){
      throw new Error("failed too fetch the topics!")
    }
    return res.json()
    
  } catch (error) {
    console.log("Error Loading topics: ",error)
  }
}

const TopicList = async() => {
  const {topics} = await getTopics()
  console.log("topic", topics)
  return (
    <>
    {topics.map((item)=>(
    <div className='p-4 border border-slate-300 my-3 justify-between flex gap-5 items-start' key={item._id}>
        <div>
            <h2 className='font-bold text-2xl'>{item.title}</h2>
            <p>{item.description}</p>
        </div>
        <div className='flex gap-2 items-center'>
            <RemoveBtn id={item._id}/>
            <Link href={`/editTopic/${item._id}`}>
                <HiPencilAlt size={24} />
            </Link>
        </div>
    </div>
    ))}
    </>
  )
}

export default TopicList