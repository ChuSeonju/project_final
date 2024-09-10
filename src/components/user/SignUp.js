import NickName from "./usercomponents/NickName";
import ID from "./usercomponents/Id";
import Password from "./usercomponents/Password";
import Email from "./usercomponents/Email";
import Address from "./usercomponents/Address";
import Button from "../Button";
import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormdata] = useState({
    name: "",
    nickname: "",
    birth: "",
    id: "",
    password: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <div>
      <label>이름</label>
      <input type="text" name="name" onChange={handleChange} />
      <NickName name="nickname" onChange={handleChange} />
      <label>생년월일</label>
      <input type="text" name="birth" onChange={handleChange} />
      <ID name="id" onChange={handleChange} />
      <Password name="password" onChange={handleChange} />
      <Email onChange={handleChange} />
      <Address name="address" onChange={handleChange} />
      <label>핸드폰 번호</label>
      <input type="text" name="phoneNumber" onChange={handleChange} />
      <Button onClick={handleSubmit}>가입하기</Button>
    </div>
  );
};

export default SignUp;
