import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import axios from "axios";

function CreateNewForm() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [showInputFields, setShowInputFields] = useState(false);
  const [editFieldData, setEditFieldData] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);

  const [inputDetails, setInputDetails] = useState({
    type: "text",
    name: "",
    placeholder: "",
    formOrder:undefined,
    required: false
  });

  const toggleShowInput = () => {
    setShowInput((prevShowInput) => !prevShowInput);
    setShowInputFields((prevShowInputFields) => !prevShowInputFields);
  };
  const toggleShowInputFields = () => {
    setShowInputFields((prevShowInputFields) => !prevShowInputFields);
  };

  const handleInputClick = (input) => {
    setIsEditing(true);
    setInputDetails(input);
    setShowInputFields(true);
  };

  function handleDeleteInput(index) {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    updatedInputs = updatedInputs.map((item,index)=>{
      item.formOrder = index;
      return item;
    })
    setInputs(updatedInputs);
    
  }
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function updateInput(){
    let temp = inputs?.map((item,index)=>{
      return item.formOrder === inputDetails?.formOrder ? inputDetails : item;        
    })
    setInputs(temp);
    console.log(temp)
    setIsEditing(false);
    setShowInputFields(false);
  }

  const addInput = () => {
    let orderCount = inputs?.length;
    setInputs((prevInputs) => [...prevInputs, {...inputDetails,formOrder:orderCount}]);
    setInputDetails({
      type: "text",
      name: "",
      placeholder: "",
      formOrder:undefined,
      required: false,
    });
    setShowInputFields((prevShowInputFields) => !prevShowInputFields);

  };
  var queryParamValue = "";


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v-1/forms", {
        title: formTitle,
        inputs: inputs,
      });
      console.log("Form saved successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(location.search);
      queryParamValue = queryParams.get('q');
      const response = await axios.post("http://localhost:4000/api/v-1/update-form", {
        title: formTitle,
        inputs: inputs,
        id:queryParamValue
      });
      console.log("Form saved successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response ? error.response.data : error.message
      );
    }
  };


  // Edit form functionality

 
const location = useLocation();
async function getFormData(){
    const response = await axios.post('http://localhost:4000/api/v-1/get-form-by-id',{
        id: queryParamValue
    });
    if(response?.status !== 400){
      setInputs(response?.data?.inputs)
      setFormTitle(response?.data?.title)
      setEditFieldData(true);
      setShowInput(true);
    }
}
const queryParams = new URLSearchParams(location.search);
queryParamValue = queryParams.get('q'); 

  useEffect(()=>{
    if(queryParamValue !== ""){
      getFormData();
    }
},[]);


  return (
    <>
      <Header />
      <section className="blog-dashboard-banner edit-form"></section>
      <section className="edit-form-parent-wr">
        <div className="center-wr">
          <div className="edit-form-parent-container">
            <div className="edit-form-heading">
              <h3 style={{ fontWeight: "400", fontSize: "21px" }}>
                Create New Form
              </h3>
            </div>
            <div className="edit-form-preview-wr">
              <div className="edit-form-wr">
                <div className="form-title">
                  <input
                    type="text"
                    placeholder="Utitled Form"
                    onChange={(e) => setFormTitle(e.target.value)}
                    value={formTitle}
                  />
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAW9JREFUWEft19FxgzAMBmB5k3SL8IY38AjpJO0m7QjewM4TbFE2cU93uEeCLclgU+7avILxd/KPIhSc7KdO5oG/CxqM6/E0Oqs9dSrNKzQYd1GgHABcZsgUIOjO6ikFawqaMV+JjbOoZiACE31JVGvQ8qhSJzRdbf+yvNAMhJsk8rNCzXn6CXpVUAQsQ8uhAoTXzurPKK0GesrMQz4IVJsjywSYQ+F1rM5DX9pdIeZtyqEghcFj2wUSvNq4xwqFTTLXsTeDhBiy51Tr1IWYuK+/2l5z00VxhTZikgHeXaHWmKJQH4ERg47CiEBHYljQ0RgS9BsYEjQaj5NeHDu59hE78uq/SbJQNA+NxoeCh4n7DPfMZGMcjLspUB/c4sXQvrsy5Dw0GPeuQL0JQNUqQ4JG47E6NwZUHZMNtSDQTTAUiAp0M0wS9BRo/LpEwB0APPcZLMgce8vqLZN+g7NP3nhD8Ty0cR/xsn8QV6rTVegbNCH5JS9ai3AAAAAASUVORK5CYII=" />
                </div>
                <div
                  className="input-generation-wr"
                  style={{ display: showInput ? "flex" : "none" }}
                >
                  
                               {inputs.length !== 0 ? (
                    <>
                      {inputs.map((input, index) => (
                            <div key={index} >
                          <img
                          className="rearrange-button"
                            style={{ width: "20px" }}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAJJJREFUWEftl7ERgDAMA+2xKNmAjQgbsQElY4WjpZEKFQ5RyljnKG/Hd8kotrKYn7AhVBETkhG6t6tl5P5N2KMfy7m2d5/R2BCiaELzEkK1V8U9GBFJmhAz9BiNDc377Jn+YDT/7SF0M1WcfvaqA1GecQ0xDctoZISYwxiNDXlSl/kGoWZUxcedQyoCKI8JDUfoAdd3/CWbmkUgAAAAAElFTkSuQmCC"
                          />
                          <input
                            type="text"
                            readOnly
                            value={input.type}
                            style={{ border: "0px", paddingBottom: "5px" }}
                          />
                          <img 
                            style={{ width: "20px",margin:"0 10px",cursor:"pointer" }}
                            onClick={() => handleInputClick(input)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAW9JREFUWEft19FxgzAMBmB5k3SL8IY38AjpJO0m7QjewM4TbFE2cU93uEeCLclgU+7avILxd/KPIhSc7KdO5oG/CxqM6/E0Oqs9dSrNKzQYd1GgHABcZsgUIOjO6ikFawqaMV+JjbOoZiACE31JVGvQ8qhSJzRdbf+yvNAMhJsk8rNCzXn6CXpVUAQsQ8uhAoTXzurPKK0GesrMQz4IVJsjywSYQ+F1rM5DX9pdIeZtyqEghcFj2wUSvNq4xwqFTTLXsTeDhBiy51Tr1IWYuK+/2l5z00VxhTZikgHeXaHWmKJQH4ERg47CiEBHYljQ0RgS9BsYEjQaj5NeHDu59hE78uq/SbJQNA+NxoeCh4n7DPfMZGMcjLspUB/c4sXQvrsy5Dw0GPeuQL0JQNUqQ4JG47E6NwZUHZMNtSDQTTAUiAp0M0wS9BRo/LpEwB0APPcZLMgce8vqLZN+g7NP3nhD8Ty0cR/xsn8QV6rTVegbNCH5JS9ai3AAAAAASUVORK5CYII=" />

                          <img
                            style={{ width: "20px",cursor:"pointer" }}
                            onClick={() => handleDeleteInput(index)}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAQxJREFUWEftmFEOgjAMhttxBWZ8lJtwFU6inkRvIjeRR8K8AqtRoyE4thVnQkh5pV2//PvLVhAW9uDCeGAdQFbrCwCUAXUbZUzB3QG2QpEwTw4COGfGVBwoFlC/2RyQaM8pQIjHrOsOsTlfQHOKxhYbx7lgBWioUpRCc+VPlec1NeV5aZUKtTeLRVlb4+1WTyV5gf5h8FDXCdD6FVLGfLbZak0uc/pikiskQMMtcLW9KCQKjdqU/aUWD4mHxEOj8y75WfZY8K3y1Ejki0kOxLqvOoIXB4QAFRpznnWnpu12R31//VWVYT5mWYFt28wCes7nL6hTxM+FEHeDRJVv4ngswJrtQxVTvBegkIp34KxVNKbFKb8AAAAASUVORK5CYII="
                          />
                        </div>
                      ))}
                        <div
                    className="add-new-input-button"
                    onClick={toggleShowInputFields}
                  >
                    <img
                      style={{ width: "20px" }}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAKpJREFUWEftl8ENgCAUQ/vH8qRu4EbiRmyAnhwLw40YQzEexFgSTyWheb+pYGhsWWN+IENsIiL0P0L7FAYA6Utr7fy4Mgol/XGG9ik4g83pkIi4dH50MpQTECGWBxESoRKBU+ldbjVYnxdjRNwI1WJ5FosxDywbXa3OyvNzhvL/1PsjqxmDeohREiERYgSYrgxVEGrrks8M39UfvzruHsj2y5AIMQJMby5DB+LNmiXe//IfAAAAAElFTkSuQmCC"
                    />
                  </div>
                    </>
                  ) : (
                    <></>
                  )}
                   
         

                
                </div>

                <div className="submit-btn-wrs">
                  {inputs?.length <= 20}{
                    <button className="show-inputs" onClick={toggleShowInput}>
                    {showInput ? "Close Input Edit" : "Add Inputs"}
                  </button>
                  }

                  {editFieldData === false ? (
                    <button onClick={handleSubmit} className="submit">
                    Submit Form
                  </button>
                    
                  ):(
                    <>
                     <button onClick={handleUpdate} className="submit">
                      Update Form
                    </button>
                    </>
                
                
                  )}
                   </div>
              </div>
              <div className="form-preview-wr">
                {showInputFields ? (
                  <div className="form-preview-inner-wr">
                    <div className="input-preview-container-wr">
                      <select
                        name="type"
                        value={inputDetails.type}
                        onChange={handleInputChange}
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                      </select>

                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={inputDetails.name}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        name="placeholder"
                        placeholder="Placeholder"
                        value={inputDetails.placeholder}
                        onChange={handleInputChange}
                      />
                      <div className="required-check-container">
                        <img
                          style={{ width: "20px", marginRight: "4px" }}
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAhRJREFUWEftWIFNAzEMvGySTgKdBDoJMAntJJRJyCaBqxzJ9Sdx8m1FhYhUUfHJ53J3tuMG3NkId4YHfwNQRowAngE8AOB3fpKwzb/8HALScVaBKYYy4iuAl4lNCjCuGxpDgDLiI4B3YWLoxWbSMDAXUIOV0wYAKEkKSElkJA7K9/TzjIfgdz3eAlKXrS6gjPghLy4vHT6p8hnBaWD7gLRr0dwEVGHmGJC2s3opYNp7TaaqgMQzZKeM7qk8kA1Qu4C0t2tbgL4UzV1mBDz9wsG51VAXUGSJ6YKD3tu4gDIiFzCiTiNwXWcYabumFVBkvnhqMX+xWUbU7FRp1fhmAHGdOfCCpTNAs+zIBpTLlawcQliiAmXNVstsAXFi0fgiI6+V2QLSeceVy4uu1nMTxWdBYwFp/2yYgb1NR6PM+I6m5l6LaLOA8mh0KU/oguuWBvHdfQESUNXDX0OymzKkTX0Wjh2DrgGkk2/X1PrlQ2E/mxhFrmZ6sZIxWZWiWq01lqmVgHQ0txOjNRsANxfNAvKqQa2WaX1dllYA6tbKGiDmCF2Ru16aSYzmBjp2/ahUZP5rKOE59UsbmVOrUXzzK6wc0N7N566wjbJwqjvSAA71WY2OpXsDvaQN4lWVrVCtDWL6qDWUrvQuIHUJu7RRZApxW+shQKpCMyX8fitdyc7ejw2fvQ6kF43DDHkXtWs9/wfkMfkN6NQcNMjxNIQAAAAASUVORK5CYII="
                        />
                        <span>required?</span>
                        <span>
                          <input
                            checked={inputDetails.required}
                            name="required"
                            onChange={handleInputChange}
                            type="checkbox"
                          />
                        </span>
                      </div>
                      <div className="submit-btn-wrs">
                        {isEditing === true ? (
                          <button className="submit" onClick={updateInput}>
                          Update Input
                        </button>
                        ):(
                          <button className="submit" onClick={addInput}>
                          Save Input
                        </button>
                        )}
                        
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="before-edit">
                    Start Editing to See the Preview!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateNewForm;
