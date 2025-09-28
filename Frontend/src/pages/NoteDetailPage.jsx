import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios"

const NoteDetailPage = () => {
  const [note , setNote] = useState(null);
  const [loading  , setLoading] = useState(true);
  const [saving , setSaving] = useState(false)

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    const fetchNotes= async()=>{
      try {
       const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("error is fetching note",error)
        toast.error("Failed to fetch the note")
      }finally{
        setLoading(false);
      }
    }

    fetchNotes();
  },[id])

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-start justify-center">
        <LoaderIcon className="animate-spin size 10"/>
      </div>
    )
  }

  const handleDelete= async (e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are You sure, You want to delete?")) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate("/");
      toast.success("Note Deleted Success");
    } catch (error) {
      toast.error("Failed to Delete Note");
    }finally{
      setLoading(true);
    }
  }

  const handleSaving= async (e,id)=>{
    e.preventDefault();

     if(!note.title.trim || !note.content.trim){
      toast.error("All fields are requird")
      return
    }

    setLoading(true);
    try {
      await api.put(`/notes/${id}`,{
        title : note.title,
        content : note.content
      });
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      console.error("some error",error);
      toast.error("Failed to Update  Note")
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto ">
          <div className="flex items-center justify-between md-6">
          <Link to={"/"} className="btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5"/>
          Back to Notes
          </Link>
          <button onClick={(e)=>{handleDelete(e,note._id)}} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5"/>
           {loading ? "Deleting" : "Delete Note" }
          </button>
        </div>

        <div className="card bg-base-200 ">
          <div className="card-body">

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-xl">Title</span>
              </label>
              <input 
              type="text" 
              placeholder="Note Title"
              className="input input-bordered"
              value={note.title}
              onChange={(e)=>setNote({...note,title:e.target.value})}/>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-xl">Note</span>
              </label>
              <textarea
              type = "text" 
              placeholder="Note Detail"
              className="textarea textarea-bordered h-32"
              value={note.content}
              onChange={(e)=>setNote({...note,content : e.target.value})} />
            </div>

            <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={loading} onClick={(e)=>{handleSaving(e,note._id)}}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>

          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage