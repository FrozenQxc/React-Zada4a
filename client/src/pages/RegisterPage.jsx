import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }));
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Регистрация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-stone-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="Password"
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-2 px-2 text-xs outline-none placeholder:text-stone-700"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4 "
        >
          Подтвердить
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs  text-white"
        >
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
