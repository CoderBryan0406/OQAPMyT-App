import React, { useRef } from 'react'
import { TopBar } from '../components/TopBar'
import { Typography, Box, useMediaQuery, useTheme, Card, Button } from '@mui/material'
import PCLogo from '../assets/pc-logo.png'
import Footer from '../components/Footer'

export const MainPage = () => {
    const theme = useTheme()
    const isLargeScreen =  useMediaQuery(theme.breakpoints.up("lg"))
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))
    const planOptions = [
        'Buying Single Trip or Multi-Trip Plans for senior travelers aged 76 up to 100 years old.',
        'Buying Worldwide Elite Dollar Inbound Plan for travelers abroad whose only destination is the Philippines.',
        'Buying ShortSecure Plan for domestic travel purely by land and/or water transportation.'
    ]
    const footer = useRef(null)

  return (
    <>
        <TopBar />
        <div className='mt-24'>
            <Box sx={{ justifyContent: 'space-evenly', alignItems:'center', alignContent:'center', display: { xs: 'block', md: 'flex' } }}>
                <Typography sx={{ textAlign: { xs: "center", lg: "left" } }} variant='h5' color='primary' >With Pacific Cross, you can take on more adventures and {isLargeScreen && <br/>} less worries.</Typography>
                <Box
                    component="img" 
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWDGXW8s_FfwUZEI9P9tGKkwTLdSf6GA-FQ&s'
                    alt="Sample Image"
                    sx={{
                        width: 400,
                        height: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                        margin:`${ isMediumScreen ? '' : '30px auto'}`
                    }}
                />
            </Box>
        </div>
        <div className='mt-44'>
            <Typography textAlign='left' color='primary' fontSize='18px'>Please e-mail dev.test@pacificcross.com.ph  if you are:</Typography>
            <div className='grid xl:grid-cols-3 p-5 gap-10'>
                
                {planOptions?.map((plan) => (
                    <Card key={plan} className="flex flex-col items-center justify-center h-40 p-5">{plan}</Card>
                ))}
            </div>
        </div>
        <Footer />
    </>
  )
}
