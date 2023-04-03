import {Flex,Box,FormControl,FormLabel,Input,InputGroup,HStack,InputRightElement,Stack,Button,Heading,Text,useColorModeValue,Link,Select,} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

  export const Signup=()=> {
    const [deatils, setDetails] = useState({name:"",email:"",password:""});
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate();
   
    useEffect(()=>{
        if(localStorage.getItem("login")){
          navigate("/dashboard")
        }
      },[])

    const Submit =async()=>{
        setLoading(true)
        try {
            let res = await axios.post(`https://cointabbackend-0bio.onrender.com/users/register`,deatils);
            res = res.data;
            setLoading(false)
            if(res.status==="success"){
                navigate("/")
                alert(res.msg)
            }
        } catch (error) {
            setLoading(false)
            alert(error.response.data.msg)
        }
    }
    return (
      <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} w={'30%'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Register User
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy Our App ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                  <FormControl id="username">
                    <FormLabel>Username of user</FormLabel>
                    <Input type="text" onChange={(e)=>setDetails({...deatils,username:e.target.value})}/>
                  </FormControl>
                
              <FormControl id="email" isRequired>
                <FormLabel>Email of user</FormLabel>
                <Input type="email" onChange={(e)=>setDetails({...deatils,email:e.target.value})}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e)=>setDetails({...deatils,password:e.target.value})}/>
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
                  Signup
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
                  }} onClick={()=>navigate("/")}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </>
    );
  }