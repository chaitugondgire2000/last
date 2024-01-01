import axios from 'axios';

const getData = async () => {
    try {
      const response = await axios.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetAllCategory`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
    }
  }
  
  const getMobileData = async () => {
    try {
      const response = await axios.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=1`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
    }
  }
  const getCameraData=async()=>{
    try{
        const response=await axios.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=2`);
        console.log(response.data.data);
      return response.data.data;
    }catch(error){

    }
  }
  const getTabletData=async()=>{
    try {
      const response=await axios.get(` https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=3`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      
    }
  }
  const getLaptopData=async()=>{
    try {
      const response=await axios.get(` https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=4`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      
    }
  }
  const getMonitorData=async()=>{
    try {
      const response= await axios.get(`https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProductsByCategoryId?id=5`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      
    }
  }
  // const getCreateProduct=async()=>{
  //   try{
  //     const response=await axios.post(`https://onlinetestapi.gerasim.in/api/Ecomm/CreateProduct`);
  //     console.log(response.data.data);
  //     return response.data.data
  //   }catch(error){

  //   }
  //}
   export {getData,getMonitorData,getLaptopData,getTabletData,getCameraData,getMobileData};
  