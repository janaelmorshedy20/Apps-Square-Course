import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const Registration = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phonenumber: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);

    // const handleImage = (e) => {
    //     const file = e.target.files[0];
    //     setData(prevData => ({ ...prevData, file }));
    //     setImagePreview(URL.createObjectURL(file));
    // };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setData(prevData => ({ ...prevData, image: file }));
        setImagePreview(URL.createObjectURL(file)); 
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        let validationErrors = {};

        if (!data.name) {
            isValid = false;
            validationErrors.name = "Please fill in the name";
        }
        if (!data.email) {
            isValid = false;
            validationErrors.email = "Please fill in the email";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            isValid = false;
            validationErrors.email = "Email is not valid";
        }
        if (!data.phonenumber) {
            isValid = false;
            validationErrors.phonenumber = "Please fill in the phone number";
        } else if (data.phonenumber.length !== 11) {
            isValid = false;
            validationErrors.phonenumber = "Phone number must be 11 digits";
        }
        if (!data.password) {
            isValid = false;
            validationErrors.password = "Please fill in the password";
        } else if (data.password.length < 8) {
            isValid = false;
            validationErrors.password = "Password must be at least 8 characters";
        }
        if (!data.image) {
            isValid = false;
            validationErrors.image = "Please upload an image";
        }

        setErrors(validationErrors);
        setValid(isValid);

        if (isValid) {
            alert("Registered successfully");
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('phonenumber', data.phonenumber);
            formData.append('image', data.image);

            const url = 'https://www.appssquare.sa/api/submit';
            const headers = {
                "Content-Type": "multipart/form-data",
            };
console.log('FormData:', formData);
            try {
                const response = await axios.post(url, formData, { headers });
                console.log('Success:', response.data);
            } catch (error) {
                console.error('Error:', e.response);
            }
        }
    };

    return (
        <div className="form">
            <form className="reg" onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                
                <div className="name">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={data.name}
                        onChange={(event) => setData({ ...data, name: event.target.value })} 
                    />
                    {!valid && <span className="error">{errors.name}</span>}
                </div>

                <div className="email">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        value={data.email}
                        onChange={(event) => setData({ ...data, email: event.target.value })} 
                    />
                    {!valid && <span className="error">{errors.email}</span>}
                </div>

                <div className="password">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={data.password}
                        onChange={(event) => setData({ ...data, password: event.target.value })} 
                    />
                    {!valid && <span className="error">{errors.password}</span>}
                </div>

                <div className="phonenumber">
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input 
                        type="text" 
                        id="phonenumber" 
                        name="phonenumber" 
                        value={data.phonenumber}
                        onChange={(event) => setData({ ...data, phonenumber: event.target.value })} 
                    />
                    {!valid && <span className="error">{errors.phonenumber}</span>}
                </div>

                <div className="image">
                    <label htmlFor="image">Image:</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        onChange={handleImage} 
                    />
                    {!valid && <span className="error">{errors.image}</span>}

                    {imagePreview && (
                        <div>
                            <p>Selected file: {data.image.name}</p>
                            <img src={imagePreview} alt="Preview" style={{ width: '170px', height: '170px' }} />
                        </div>
                    )}
                </div>

                <button className="button">Sign Up</button>
            </form>
        </div>
    );
}

export default Registration;
