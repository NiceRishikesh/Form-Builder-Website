import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./common/Header";
import axios from "axios";

function PreviewForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [formTitle, setFormTitle] = useState("")
 
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const queryParamValue = queryParams.get('q'); 
async function getFormData(){
    const response = await axios.post('http://localhost:4000/api/v-1/get-form-by-id',{
        id: queryParamValue
    });
    setFormData(response?.data?.inputs)
    setFormTitle(response?.data?.title)
    console.log(response?.data?.title)
}
useEffect(()=>{
    getFormData();
},[])

const [formValues, setFormValues] = useState(
  formData.reduce((acc, form) => {
    acc[form.name] = "";
    return acc;
  }, {})
);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormValues((prevValues) => ({
    ...prevValues,
    [name]: value,
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formValues);
  alert("Form data saved!");
};

  return (
    <>
      <Header />
      <section className="blog-dashboard-banner edit-form"></section>
      <section className="edit-form-parent-wr">
        <div className="center-wr">
        <form onSubmit={handleSubmit}>
      <div className="edit-form-heading">
        <h3 style={{ fontWeight: "400", fontSize: "21px" }}>{formTitle}</h3>
      </div>

      <div className="preview-form">
        {formData.map((form, index) => (
          <div key={index}>
            <input
              type={form?.type}
              name={form?.name}
              placeholder={form?.placeholder}
              value={formValues[form.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="submit-btn-wrs" style={{ textAlign: "center", marginTop: "10px" }}>
        <button className="submit" type="submit">
          Save Input
        </button>
      </div>
    </form>
        </div>
      </section>
    </>
  );
}

export default PreviewForm;
