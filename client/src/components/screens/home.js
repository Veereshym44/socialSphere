import React,{useState,useEffect, useContext}from 'react'
import {UserContext} from '../../App'
function Home() {
const [data,setData]=useState([])
const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
fetch("/allpost",{
    headers:{
        "authorization":"Bearer "+localStorage.getItem('jwt')
    }
}).then(res=>res.json())
.then(result=>{
    
   setData(result.posts)

    
})

    },[])
    

    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                    return result
                }
                else
                return item;
            })
            setData(newData)
        })
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                    return result
                }
                else
                return item;
            })
            setData(newData)
         

        })
    }
    const makeComment=(text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                text,
                postId
               
            })

        }).then(res=>res.json())
        .then(result=>{
          console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id)
                {
                    return result
                }
                else
                return item;
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    return ( 
        <div className='home-container'>
         {
            data.map(item=>{
                return(
                               
<div className="card home-card" >
    <h5>{item.postedby.name}</h5>
    <div className="card-image">
        <img src={item.photo} alt="" />
        </div>
    <div className='card-content'>
  

    {
        item.likes.includes(state._id)?   <i className="material-icons" style={{cursor: "pointer"}} onClick={()=>unlikePost(item._id)}>thumb_down</i>:    <i className="material-icons" style={{cursor: "pointer"}} onClick={()=>likePost(item._id)}>thumb_up</i>
    }
 
    <h6>{item.likes.length}<span>     </span>likes</h6>
        <h6>{item.title}</h6>
        <p>{item.body}</p>
        {
            item.comments.map(record=>{
                
                return(
                    <h6><span style={{fontWeight:"500"}}>{record.postedby.name}</span> {record.text}</h6>
            )
            })
        }
       <form onSubmit={(e)=>{
        
        makeComment(e.target[0].value,item._id)
        
       }}>
       <input type="text" placeholder='add comment' name="" id="" />
       
       </form>

    
    </div>
</div>
                )
            })
         } 
         
 
        </div>
     );
}


export default Home;