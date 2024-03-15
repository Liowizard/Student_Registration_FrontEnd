import React, { useState, useRef } from "react";
import Webcam from "react-webcam";





function UserDetailsForm() {

    const permissions= {
      firstName:{
        isView:true
      },
      middleName:{
        isView:true
      },
      lastName:{
        isView:true
      },
      dob:{
        isView:true
      },
      academicNumber:{
        isView:true
      },
      programName:{
        isView:true
      },
      batch:{
        isView:true
      },
      mobileNumber:{
        isView:true
      },
      fatherName:{
        isView:true
      },
      motherName:{
        isView:true
      }
      }
  
  
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("male");
    const [academicNumber, setAcademicNumber] = useState("");
    const [programName, setProgramName] = useState("");
    const [batch, setBatch] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [motherName, setMotherName] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);
    const webcamRef = useRef(null);
    const [capturedImages, setCapturedImages] = useState([]);
  
  
  
      const [file, setFile] = useState(null);
    
      const handleChange = (event) => {
        setFile(event.target.files[0]);
      };
  
  
  
        const handleSubmit = async (event) => {
          event.preventDefault();
  
  
  
  
      if (capturedImages.length < 4) {
        alert("Please capture at least 4 images.");
        return;
      }
    
      // Here you can handle form submission, like sending data to backend, validation, etc.
      // For now, let's just log the data
      const userData = {
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        academicNumber,
        programName,
        batch,
        mobileNumber,
        fatherName,
        motherName,
        capturedImages,
      };
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('json_data', JSON.stringify(userData));
  
  
  
  
  
      try {
        const response = await fetch('http://127.0.0.1:5000/GetData', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body:formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
    
        const data = await response.json();
        console.log('Response from server:', data);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error, show an error message to the user, etc.
      }
  
      console.log(userData);
    };
  
    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
      // setCapturedImages([]);
    };
  
  
    const captureImage = () => {
      if (webcamRef.current && capturedImages.length < 4) {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImages([...capturedImages, imageSrc]);
      } else {
        alert("You can only capture a maximum of 4 images.");
      }
    };
    
  
    const deleteImage = (index) => {
      const newImages = [...capturedImages];
      newImages.splice(index, 1);
      setCapturedImages(newImages);
    };
  
    return (
      <div className="container">
        <div className="header">
          <h1>User Details Form</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          { permissions.fatherName.isView ? ( 
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
            ) : null
        }
        { permissions.middleName.isView ? ( 
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle Name"
            />
            ) : null
        }
        { permissions.lastName.isView ? ( 
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
            ) : null
        }
          </div>
          <div className="input-container">
          { permissions.dob.isView ? ( 
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Date of Birth"
            />
            ) : null
        }
            <div className="radio-container">
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
            </div>
          </div>
          <div className="input-container">
          { permissions.academicNumber.isView ? ( 
            <input
              type="text"
              value={academicNumber}
              onChange={(e) => setAcademicNumber(e.target.value)}
              placeholder="Academic Number"
              required
            />
            ) : null
        }
        { permissions.programName.isView ? ( 
            <input
              type="text"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              placeholder="Program Name"
              required
            />
            ) : null
        }
        { permissions.batch.isView ? ( 
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Batch"
            />
            ) : null
        }
          </div>
          <div className="input-container">
          { permissions.mobileNumber.isView ? ( 
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              required
            />
            ) : null
        }
           { permissions.fatherName.isView ? ( 
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Father's Name"
            />
           ): null}
           { permissions.motherName.isView ? ( 
            <input
              type="text"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="Mother's Name"
            />
            ) : null
        }
          </div>
          <button type="button" onClick={openPopup}>Open Popup</button>
          <button type="submit">Submit</button>
  
          <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
            />
        </form>
  
        {popupOpen && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <h2>Capture Images</h2>
              <div className="webcam-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
                <button onClick={captureImage}>Capture Image</button>
              </div>
              <div className="captured-images">
                {capturedImages.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={image}
                      alt={`Captured Image ${index + 1}`}
                      className="captured-image"
                    />
                    <button
                      className="delete-button"
                      onClick={() => deleteImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }






  export default UserDetailsForm;  