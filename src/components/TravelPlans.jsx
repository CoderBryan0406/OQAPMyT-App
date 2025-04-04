import React, { useContext } from "react";
import { Button, Card, CardContent, Typography, Box, Grid, Divider } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { GlobalDataContext } from "../contexts/globalData";

const plans = [
  {
    title: "Plan A",
    price: 40,
    image: "https://plus.unsplash.com/premium_photo-1721652937934-9cc168ca5dbe?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwYWVzdGhldGljfGVufDB8fDB8fHww",
  },
  {
    title: "Plan B",
    price: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgaO6nFJvATIKR5WHEvqpd9cbrTv-SV4OFQ&s",
  },
  {
    title: "Plan C",
    price: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgeSyQvOqP94g0XrMD2pChvAOjNewwgzZ_-g&s",
  },
];

export default function TravelPlans() {
    const navigate = useNavigate()
    
    const { formData } = useContext(GlobalDataContext)
    React.useEffect(() => console.log('formData:', formData))
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
        <div className="p-4 w-full max-w-6xl md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
            <Box
                component="img" 
                src="https://cdn.prod.website-files.com/6540d2641ba7d0024e6d68ee/66477a750900c5391c15cc50_PCIL256x256.png"
                alt="Logo Image"
                sx={{width: 70, height: 65, position:'absolute', top:'40px', left:'70px'}}
            />
           
            <div className="mt-10">
                <Typography className="text-left">
                    Suggested Plans
                </Typography>
                <div className="flex gap-5 mt-3">
                    <div>
                        <Grid container spacing={2}>
                            {plans.map((plan, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card className="shadow-lg">
                                <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover" />
                                <CardContent>
                                    <Typography>{plan.title}</Typography>
                                    <Typography className="text-gray-500">Estimate Premium</Typography>
                                    <Typography className="font-bold">
                                    USD {plan.price} / Person
                                    </Typography>
                                    <Box className="flex flex-col gap-2 mt-4">
                                    <Button variant="contained" fullWidth>Choose Plan</Button>
                                    <Button variant="outlined" color="warning" fullWidth>
                                        View Details
                                    </Button>
                                    <Button variant="outlined" color="success" fullWidth>
                                        General Exclusion
                                    </Button>
                                    </Box>
                                </CardContent>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                    </div>
                <div>
                <Grid item xs={12} md={4}>
                    <Card className="flex flex-col gap-2 text-start shadow-lg p-3">
                        <Typography variant="h6" className="font-semibold mb-2">
                        Travel Details
                        </Typography>
                        <Typography>
                        <strong>Country of Origin:</strong> {formData.from}
                        </Typography>
                        <Typography>
                        <strong>Countries to Visit:</strong> {formData.destinations.join(", ")}
                        </Typography>
                        <Typography>
                        <strong>Period of Insurance:</strong> {`${new Date(formData.coverageFrom).toLocaleDateString("en-US")} - ${new Date(formData.coverageTo).toLocaleDateString("en-US")}`}
                        </Typography>
                        <Typography>
                        <strong>Number of Days:</strong> {formData.numberOfDays}
                        </Typography>
                        <Typography>
                        <strong>Plan Type:</strong> {formData.planType}
                        </Typography>
                    </Card>
                </Grid>
            </div>
        </div>
      </div>
      <Box className="mt-4 flex justify-end">
        <Button onClick={() => navigate('/')} variant="contained" color="warning">Previous</Button>
      </Box>
      </div>
    </div>
  );
}
