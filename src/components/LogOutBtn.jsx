import React from 'react'
import useUserStore from '../stores/useUserStore'
import { useCookies } from 'react-cookie';

const LogOutBtn = () => {
    const {removerUsr}=useUserStore()
    const [cookies, removeCookie] = useCookies(["token", "user"]);
    const logout = () => {
        removerUsr();
        // removeCookie("token");
        // removeCookie("user");
        Object.keys(cookies).forEach(cookieKey => {
            removeCookie(cookieKey);  // Remove each cookie by its key
          });
    }
  return (
    <button onClick={logout}>LogOutBtn</button>
  )
}

export default LogOutBtn