import React,{useState, useEffect} from 'react';
import { Icon } from 'react-icons-kit';
import {edit3} from 'react-icons-kit/feather/edit3'
import {view} from 'react-icons-kit/ikons/view'
import {user_circle} from 'react-icons-kit/ikons/user_circle'
import {trash2} from 'react-icons-kit/feather/trash2'

const getdata = ()=>{
    const data = localStorage.getItem('keyitem');
    if (data){
        return JSON.parse (data)
    } else {
        return []
    }
}

export default function Crud() {
    const [name, setName]=useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [names, setNames]=useState(getdata());
    const [edit, setEdit] =useState(false)
    const [id, setid]= useState(null)

    let submithandler = (e) =>{
        e.preventDefault()
        let values = {name,number,email,address};
    
        if (edit){
            let copy = names;
            Object.assign(copy[id], values)
            setNames([...copy]);
            setEdit(false);
            setid(null);
        }else {
            setNames([...names, values]);
        }

        setName("");
        setNumber("");
        setEmail("");
        setAddress("");
    }

    useEffect(()=>{
        localStorage.setItem("keyitem", JSON.stringify(names))
    },[names])
    
    const deletedata = (index) =>{
        console.log(names);
        const del = names.filter(( v, inde)=> {
            return inde !== index
        });
        setNames (del);
    }

    const View=(index)=>{
        const values =  names[index];
        setName(values.name)
        setAddress(values.address)
        setEmail(values.email)
        setNumber(values.number)
        setEdit(true)
    }
    const Edit = (index) =>{
        const values =  names[index];
        setName(values.name)
        setAddress(values.address)
        setEmail(values.email)
        setNumber(values.number)
        setid(index)
        setEdit(true)
    }
    const viewui={
        width:"70%",
        color: "black",
        border:"1px solid black",
        borderRadius:"0px",
        borderCollapse:"collapse",
        backgroundColor: "white",
        textAlign: "center",
        padding: "10px",
        marginLeft:"10%"
    }

    const viewtable={
        width:"45%",
        marginLeft:'30%',
        color: "black",
        border:"1px solid black",
        borderCollapse:"collapse",
        backgroundColor: "white",
        textAlign: "center",
        padding: "10px"
    }

    const topbar={
        width:"95%",
        backgroundColor:"lightblue",
        color: "white",
        boderRadius:'0px',
        textAlign:"center",
        padding:"8px"
    }

    const boxcontact={
        width:"45%",
        backgroundColor:"black",
        color: "white",
        textAlign:"center",
        padding:"6px"
    }

    const searchbar={
        width:'30%',
        marginLeft:"6%",
        padding:'8px',
        boderRadius:'0px',
        textAlign:"center",
        alignContent:"center",
        backgroundColor:"white"
    }

  return (
    <div>
            <div style={{border:"1px solid", width:"50%", backgroundColor:"grey"}}>
                <br/>
            <div>
                Add Contacts
            </div> <br/>
            <div>
                <form style={viewui} onSubmit={submithandler}>
                    <label style={{textAlign:"left"}}>Name</label><br/>
                    <input type="text" placeholder="Enter your Name" value={name} onChange={(e)=>setName(e.target.value)}></input><br/>

                    <label>Email</label><br/>
                    <input type="text" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>

                    <label>Phone Number</label><br/>
                    <input type="number" placeholder="Enter your Phone Number" value={number} onChange={(e)=>setNumber(e.target.value)}></input><br/>

                    <label>Address</label><br/>
                    <input value={address} placeholder="Enter your Address" onChange={(e)=>setAddress(e.target.value)}></input><br/>
                    <button type="submit" className='btnclass'>{edit? "update": "Add"} </button>
                </form>
            </div>
            </div>
                <br/>
                <br/>
                <div style={boxcontact} >
                    <div style={topbar}> All Contacts</div><br/>
                    <input type='' style={searchbar} placeholder='search contact'></input><br/>
                    <table style={viewtable}>
                        <tbody style={viewtable}>
                        { names.map((check, index)=>
                        <tr key={index} style={viewtable} >
                            <td><Icon icon={user_circle}/> </td>
                            <span>
                            <div>{check.name}</div>
                            <div >{check.number}</div>
                            </span>
                        <td onClick={()=>{View(index)}}><Icon icon={view}/> </td>
                        <td onClick={()=>{Edit(index)}}><Icon icon={edit3}/> </td>
                        <td onClick={()=>{deletedata(index)}}><Icon icon={trash2}/> </td>
                        </tr>
                        )}
                            
                        </tbody>
                    </table>
                </div>
    </div>
  )
}
