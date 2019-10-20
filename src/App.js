import React from 'react';
import useForm from "./useForm";
import './App.css'; 


const Form = () => {
  const { values, handleChange, handleSubmit } = useForm(login);

  function login() {
    console.log(values);
  }

  return (
    <div className="section">
      
      <div className="container">
      <h1>Stalk My Professor</h1>
        <div className="column">
          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">University</label>
                <div className="control">
                  <input className="input" type="text" name="uni" onChange={handleChange} value={values.email} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Department</label>
                <div className="control">
                  <input className="input" type="text" name="department" onChange={handleChange} value={values.email} required />
                </div>
              </div>
              <div className="field">
                <label className="label">Professor</label>
                <div className="control">
                  <input className="input" type="text" name="prof" onChange={handleChange} value={values.password} required />
                </div>
              </div>
              <button type="submit" className="submitButton">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;