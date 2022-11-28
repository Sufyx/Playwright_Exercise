/**
 * 20/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */


import { React, useState } from 'react';
import axios from 'axios';
import {
    Flex, Box, FormControl, FormLabel, Input, Text,
    Stack, VStack, Button, Heading, useColorModeValue,
} from '@chakra-ui/react';



export default function Login({ loginSuccess }) {

    const [userID, setUserID] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')


    async function loginClick() {
        if (!userID || !userPassword) {
            setErrorMessage("Please enter ID and password");
        } else {
            const res = await axios.post(`http://localhost:5000/routes/login`, {
                userID: userID,
                userPassword: userPassword
            });
            if (res.data.confirmation) {
                loginSuccess();
            } else {
                setErrorMessage("Incorrect ID or password");
            }
        }
    }


    return (
        <div className='login-container'>

            <Flex align={'center'} justify={'center'} h='100%'
                bg={useColorModeValue('gray.100', 'gray.800')} >
                
                <Stack spacing={8} mx={'auto'} w='30%' >
                    <Box bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'dark-lg'} rounded={'lg'} p={8}>
                        <Heading fontSize={'4xl'} mb='15%' className='login-header'>
                            Login
                        </Heading>
                        
                        <Stack spacing={8}>
                            <FormControl id="emp_id">
                                <FormLabel>Employee ID</FormLabel>
                                <Input value={userID} onChange={e => {
                                    setUserID(e.target.value);
                                    setErrorMessage('');
                                }} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" value={userPassword}
                                    onChange={e => {
                                        setUserPassword(e.target.value);
                                        setErrorMessage('');
                                    }} />
                            </FormControl>

                            <VStack spacing={2}>
                                <Text color='red' fontWeight='600' id='loginError'>
                                    {errorMessage}
                                </Text>
                                <Button _hover={{ bg: 'white', color: 'blue.400' }}
                                    fontSize={'xl'} boxShadow={'outline'} color={'white'}
                                    onClick={loginClick} bg={'blue.400'} id="submit">
                                    Login
                                </Button>
                            </VStack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}
