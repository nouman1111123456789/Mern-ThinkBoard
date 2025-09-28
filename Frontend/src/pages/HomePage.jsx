import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import RateLimitedUI from "../components/RateLimitedUI"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import api from "../lib/axios"
import NotesNotFound from "../components/NotesNotFound"


const HomePage = () => {
  const [isRateLimited , setisRateLimited]=useState(false);
  const [Loading , setLoading] = useState(true);
  const [notes , setNotes] = useState([]);
  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setisRateLimited(false);
        console.log(res.data);
      } catch (error ) {
        console.error("Error in fetching data",error);
        if(error.response.status === 429){
          setisRateLimited(true);
        }else{
          toast.error("error is getting notes");
        }
      }finally{
          setLoading(false);
        }
    }

    fetchNotes();
  },[])


   return (
    <div className="min-h-screen">
      <NavBar/>

      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl  p-4 mx-auto mt-6">
        {Loading && <div className="text-primary text-center py-10">Loading notes....</div>}
      </div>

      {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

      {notes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ms-10">
          {notes.map((note) =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      ) }
    </div>
  )
}

export default HomePage