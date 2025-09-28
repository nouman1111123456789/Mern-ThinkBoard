import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"
import { Dateformat } from "../lib/utility"
import toast from "react-hot-toast"
import api from "../lib/axios"
import { use, useEffect } from "react"

const NoteCard = ({note,setNotes}) => {

  const handleDelete= async (e,id)=>{
    e.preventDefault();

    if(!window.confirm("Are You sure, You want to delete?")) return;
    console.log(id);

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=>prev.filter(note => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("some error accure:",error)
      toast.error("failed to Delete Note")
    }finally{
      //  window.location.reload(); 
    }

  }
  return (
  <Link to={`/notes/${note._id}`}
  className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">

    <div className="card-body">
      <h3 className="card-title text-base-content">{note.title}</h3>
      <p className="text-base-content/70 line-clamp-3">{note.content}</p>
      <div className="card-actions justify-between items-center mt-4">
        <span className="text-sm text-base-content/60 ">{Dateformat(new Date(note.createdAt))}</span>
        <div className="flex items-center gap-1">
          <PenSquareIcon className="size-4"/>
          <button className="btn btn-ghost text-xs text-error" onClick={(e)=>{handleDelete(e,note._id)}}>
            <Trash2Icon className="size-4"/>
          </button>
        </div>
      </div>
    </div>
  </Link>
  )
}

export default NoteCard
