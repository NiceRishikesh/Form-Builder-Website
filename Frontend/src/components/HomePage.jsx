import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import axios from "axios";

function HomePage(){
    const navigate = useNavigate();
    const [formList,setFormList] = useState([])
   async function getAllForms(){
        const response = await axios.get('http://localhost:4000/api/v-1/all-forms');
        console.log(response?.data)
        setFormList(response?.data)
    }

    async function handleDeleteForm(formId){
        await axios.post('http://localhost:4000/api/v-1/delete-form',{
            id:formId
        });
        getAllForms();
    }

    useEffect(()=>{
        getAllForms();
    },[])
    return(
        <>
        <Header/>
        <section className="blog-dashboard-banner">
            <div className="center-wr">
            <div className="header-line">
                <h1>
                Create and Customize Forms Effortlessly <br/> with Our Intuitive Form Builder!
                </h1>
                <h4>Empower Your Workflow with Seamless Input Management and User-Friendly Design
                </h4>
                
                </div>
            </div>
        </section>
        
        {/* My Blogs */}

        <section className="user-blogs-section">
                <div className="center-wr">
                <h3> <span className="heading">See </span><br />
<span className="sub-heading">Your  Forms</span></h3>
                    <div className="user-blogs-collection-wr">

                            <div  style={{cursor:'pointer'}} onClick={()=>navigate("/form/create")} className="add-new-blog-btn-wr">
                                <img src="https://img.icons8.com/?size=100&id=1501&format=png&color=C850C0" alt="" />
                            </div>


                            
                                {formList.length === 0 ?(
                                <>
                                <div className="empty-blog-wr dummy-blog-content last-one">
                                    <img width="50" height="50" src="https://img.icons8.com/ios/50/C850C0/empty-box.png" alt="empty-box"/>
                                    <span>You haven't added any form yet!</span>
                                </div>
                                </>   
                                ) : (
                                    <>
                                      {formList.map((form, index) => (
                                        <div key={index} className="dummy-blog-content">
                                          <span style={{background: '#0000ff4d', fontSize: '18px',color:"#000",fontWeight:"600"}}>{form.title}</span>
                                          <img src='https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/02/form-builders-11-850x435.png' alt='form-image' />
                                          <div className="edit-form-wr-home">
                                            <Link to={`/form/create?q=${form._id}`}>
                                              <img 
                                              style={{cursor:"pointer"}}
                                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAW9JREFUWEft19FxgzAMBmB5k3SL8IY38AjpJO0m7QjewM4TbFE2cU93uEeCLclgU+7avILxd/KPIhSc7KdO5oG/CxqM6/E0Oqs9dSrNKzQYd1GgHABcZsgUIOjO6ikFawqaMV+JjbOoZiACE31JVGvQ8qhSJzRdbf+yvNAMhJsk8rNCzXn6CXpVUAQsQ8uhAoTXzurPKK0GesrMQz4IVJsjywSYQ+F1rM5DX9pdIeZtyqEghcFj2wUSvNq4xwqFTTLXsTeDhBiy51Tr1IWYuK+/2l5z00VxhTZikgHeXaHWmKJQH4ERg47CiEBHYljQ0RgS9BsYEjQaj5NeHDu59hE78uq/SbJQNA+NxoeCh4n7DPfMZGMcjLspUB/c4sXQvrsy5Dw0GPeuQL0JQNUqQ4JG47E6NwZUHZMNtSDQTTAUiAp0M0wS9BRo/LpEwB0APPcZLMgce8vqLZN+g7NP3nhD8Ty0cR/xsn8QV6rTVegbNCH5JS9ai3AAAAAASUVORK5CYII=" />
                                            </Link>
                                            <Link to={`/form/preview?q=${form._id}`} className="preview">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
                                            </Link>
                                              <img 
                                              style={{cursor:"pointer"}}
                                              onClick={()=>handleDeleteForm(form._id)}
                                                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAQxJREFUWEftmFEOgjAMhttxBWZ8lJtwFU6inkRvIjeRR8K8AqtRoyE4thVnQkh5pV2//PvLVhAW9uDCeGAdQFbrCwCUAXUbZUzB3QG2QpEwTw4COGfGVBwoFlC/2RyQaM8pQIjHrOsOsTlfQHOKxhYbx7lgBWioUpRCc+VPlec1NeV5aZUKtTeLRVlb4+1WTyV5gf5h8FDXCdD6FVLGfLbZak0uc/pikiskQMMtcLW9KCQKjdqU/aUWD4mHxEOj8y75WfZY8K3y1Ejki0kOxLqvOoIXB4QAFRpznnWnpu12R31//VWVYT5mWYFt28wCes7nL6hTxM+FEHeDRJVv4ngswJrtQxVTvBegkIp34KxVNKbFKb8AAAAASUVORK5CYII="
                                                />
                                          </div>
                                        </div>
                                      ))}
                                    </>
                                )}
                            

                    </div>

                </div>
        </section>

   
      
        </>
    )
}

export default HomePage;