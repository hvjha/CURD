
import { useEffect, useState } from 'react';
import './App.css'
import Form from './components/Form';

const BASE_URL = "http://localhost:8080/api/v1/curd";
function App() {
  const [addSection, setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false);
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    mobile:"",

  })

  const [formDataEdit,setFormDataEdit] = useState({
    name:"",
    email:"",
    mobile:"",
    _id:"",
  })

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/create`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData)
      })
      if(!response.ok){
        throw new Error("Failed to submit data")
      }
      const data = await response.json();
      console.log("Data submitted successfully", data);
      if(data.success){
        setFormData({name:"",email:"",mobile:""});
        setAddSection(false);
      }
    } catch (error) {
      console.error("Error:",error);
    }
    getData();
  }

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data)
      setDataList(data.data); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  const handleDelete = async(id)=>{
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        }
      });

      if(!response.ok){
        throw new Error("Failed to delete Data");
      }
      alert("data deleted successfully")
      getData();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/update`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formDataEdit)
      });

      if(!response.ok){
        throw new Error("Failed to update Data");
      }
      alert("data updated successfully")
      getData();
      setEditSection(false);
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleEditOnChange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleEdit = (el) =>{
    setFormDataEdit(el);
    setEditSection(true)
  }
  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add</button>

        {
          addSection && (
           <Form
            handleSubmit={handleSubmit}
            handleOnChange = {handleOnChange}
            handleClose ={()=>setAddSection(false)}
            rest={formData}/>
          )
        }

        {
          editSection && (
            <Form
            handleSubmit={handleUpdate}
            handleOnChange = {handleEditOnChange}
            handleClose ={()=>setEditSection(false)} 
            rest = {formDataEdit}/>
          )
        }

      <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((el,index)=>{
                    return(
                      <tr key={index}>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.mobile}</td>
                        <td>
                        <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                        <button className='btn btn-delete'onClick={()=>handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                ):(
                  <p style={{textAlign:"center"}}>No data</p>
                )
                
              }
            </tbody>
          </table>
        </div>
        </div>
    </>
  )
}

export default App
