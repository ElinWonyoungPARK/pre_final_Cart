import React, { useState , useCallback} from 'react';
import axios from "axios";
import { Link, Redirect} from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import { FormControl } from 'components/index';
import { AuthContext } from 'context/index';
import { FORGET_PASSWORD_PAGE, HOME_PAGE } from 'settings/constant';
import { FieldWrapper, SwitchWrapper, Label } from 'container/Auth/Auth.style';
import {TextField} from '@material-ui/core'
import {useHistory} from "react-router";

const SignInForm = () => {
  const history = useHistory();
  const {control} = useForm();
  const [userLogin, setUserLogin ] = useState({
    username: "",
    password: ""
  })
  const {username, password} = userLogin
  const onChange = useCallback(e => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  })
  const API_URL = "http://localhost:8080/users/";

  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }

  const login = e => {
    e.preventDefault()
    axios.post(API_URL + "signin", userLogin)
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", response.data.token)
        history.push(HOME_PAGE)
      }else{
        alert("토큰값이 없습니다.")
      }
    })
    .catch(error => {
      alert(error)
    });
  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
  }
 
  return (
    <form >
      <FormControl
        label="ID"
      >
        <Input
            onChange = {onChange}
          id="username" 
          name="username" value={username}
          defaultValue=""
          control={control}
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl
        label="비밀번호"
      >
        <Input.Password 
            onChange = {onChange}
          id="password"
          name="password" value={password}
          defaultValue=""
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 20 }}
        />
      </FormControl>
      <FieldWrapper>
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="Remember Me"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>자동로그인</Label>
        </SwitchWrapper>
        <Link to={FORGET_PASSWORD_PAGE}>비밀번호 찾기</Link>
      </FieldWrapper>
      
      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: '100%' }}
        onClick= {login}
      >
        <MdLockOpen />
        Login
      </Button>
    </form>
  );
};

export default SignInForm;