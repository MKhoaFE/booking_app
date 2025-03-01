import React, { useState } from 'react'


export const useFetch = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const fetchData = async (url, option = {})=>{
    setLoading(true);
    try{
      const response = await fetch(url,option);
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      return data;

    } catch(error){
      setError(error);
      setLoading(false);
      throw error;
    }
  }
  return { fetchData, loading, error};
  
}
