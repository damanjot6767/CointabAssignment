import React, { useEffect, useState } from 'react'
import {Flex,Box,FormControl,FormLabel,Input,InputGroup,HStack,InputRightElement,Stack,Button,Heading,Text,useColorModeValue,Link,Select,} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [details, setDetails] = useState({email:"",password:""});
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate();
    
    useEffect(()=>{
      if(localStorage.getItem("login")){
        navigate("/dashboard")
      }
    },[])

   const Submit=async()=>{
     setLoading(true)
    try {
        let res = await axios.post(`https://cointabbackend-0bio.onrender.com/users/login`,details);
        res = res.data;
        setLoading(false)
        if(res.status==="success"){
            console.log(res)
            localStorage.setItem("login","success")
            localStorage.setItem("id",res.id)
            navigate("/dashboard")
            alert(res.msg)
        }
    } catch (error) {
        setLoading(false)
        alert(error.response.data.msg)
    }
   }
  return (
    <div>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} w={'30%'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
               Login Please!
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired={true}>
                <FormLabel>Email</FormLabel>
                <Input type="email" onChange={(e)=>setDetails({...details,email:e.target.value})}/>
              </FormControl>
              <FormControl id="place" isRequired={true}>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>setDetails({...details,password:e.target.value})}/>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={Submit} isDisabled={loading}>
                  Login
                </Button>
              </Stack>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={()=>navigate("/register")}>
                  Signup
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  )
}

export default Login