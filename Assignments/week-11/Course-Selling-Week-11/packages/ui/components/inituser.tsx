import { useSetRecoilState } from 'recoil';
import { userState } from 'store';
import axios from 'axios';
import { useEffect } from 'react';

type propType = {
    backendUrl : string
}

export function InitUser(prop: propType){
    const setUser = useSetRecoilState(userState);

    //Get token
    if (prop.backendUrl.includes("user")){
        var token = localStorage.getItem("Auth-Key-User");
    } else {
        var token = localStorage.getItem("Auth-Key");
    }
    
    const init = async ()=>{
      try{
        const response = await axios.get(prop.backendUrl, {headers: { token }});
  
        if (response.data.username){
          setUser({
            isLoading: false,
            userEmail: response.data.username
          });
        } else {
          setUser({
            isLoading: false,
            userEmail: ""
          });
        }  
      }
      catch {
        setUser({
          isLoading: false,
          userEmail: ""
        });
      }
    }  
    useEffect(()=>{
      init();
    },[])
    return <></>
}