// 기존의 Login에서 네이버 아이디로 로그인 실험을 위해 주석 처리함

import React, { useState } from "react";
import NaverLogin from "./usercomponents/NaverLogin";
// import NaverCallback from "./usercomponents/NaverCallback";
// import "bootstrap/dist/css/bootstrap.min.css";
//import { useNavigate } from "react-router-dom";
// import Button from "../Button";


const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  //const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id, password }),
  //     });

  //     if (response.ok) {
  //       navigate("/"); // 로그인 성공 후 메인 페이지로 이동 (필요한 페이지로 변경 가능)
  //     } else {
  //       const errorMsg = await response.text();
  //       setError(errorMsg);
  //     }
  //   } catch (error) {
  //     setError("서버 에러 발생");
  //   }
  // };

  // const handleSignUpRedirect = () => {
  //   navigate("/join"); // 회원가입 페이지로 이동
  // };

  return (
    <div className="container w-50 mt-5">
      <h2>로그인</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            아이디:
          </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            비밀번호:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary me-4">
            로그인
          </button>
          <button type="button" className="btn btn-primary ms-4">
            회원가입
          </button>
        </div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </form>
      <NaverLogin />
    </div>
  );
};

export default Login;
