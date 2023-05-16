import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSearchParams,useLocation } from 'umi';
import {history, useModel} from '@umijs/max';
import OAUTH2 from '@/../config/oauth2';
import React, { useEffect } from 'react';
import {flushSync} from "react-dom";

const TOKEN = 'TOKEN';



const Login: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;
  const oldToken = localStorage.getItem(TOKEN);
  const [searchParams] = useSearchParams();
  const location  = useLocation();
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    //获取最新用户信息
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      //信息更新
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const doLogin = async () => {
    const error = searchParams.get('error');
    const hash = location.hash;
    if (error) { // 错误提示跳转至错误页面
      history.push(`/error/400?errCode=${error}`);
    } else if (hash && hash.length > 7) { // 成功获取token，存储token，刷新信息
      const token = hash.substring(7);
      localStorage.setItem(TOKEN, token);
      await fetchUserInfo();
      const redirect = searchParams.get('redirect');
      if (redirect){
        history.push(redirect)
      } else {
        history.push("/")
      } //重定向或者返回首页
    } else if (!hash || hash.length <= 7) {  //唤起登入授权地址
      const redirect = window.location.href; //OAUTH2回传TOKEN地址
      let target = OAUTH2.prod.target //获取OAUTH2服务地址
      if (REACT_APP_ENV == 'dev'){
        target = OAUTH2.dev.target
      } else if (REACT_APP_ENV == 'test'){
        target = OAUTH2.dev.target
      } else if (REACT_APP_ENV == 'pre') {
        target = OAUTH2.dev.target
      }
      window.location.href = `${target}?redirect=${redirect}`;
    }
  }

  useEffect(()=>{
    if (!oldToken){
      doLogin();
    } else {
      history.push("/")
    }
  },[])


  return (
    <div style={{
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: 'translate(-50%,-50%)'
    }}>
      <Spin size="large" indicator={antIcon} tip="go login ..."/>
    </div>

  );
};
export default Login;
