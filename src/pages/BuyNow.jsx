import React, { useEffect, useState } from "react";
import { 
  TextField, 
  Radio, 
  RadioGroup, 
  Checkbox, 
  FormControlLabel, 
  Autocomplete, 
  Button, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Grid 
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { countryList } from "../static/countryList";
import { provinces } from "../static/provinces";
export const BuyNow = () => {
  const [coverageFrom, setCoverageFrom] = useState(null);
  const [coverageTo, setCoverageTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState("");
  const [isReturning, setIsReturning] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    buyingTravelInsurance: "",
    planType: "",
    travelPurpose: "",
    selectedOptions: [],
    travelLocally: "",
    city: "",
    endpoint: "",
    coverageFrom: coverageFrom
  });

  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
  const options = ["Yes", "No"];
  const travelPurpose = ['Individual', 'Family', 'Multi Trip']

const handleRadioGroup = (e, field) => {
    const { value } = e.target;

    setFormData({
      ...formData,
      [field]: value,  // Set the selected option
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Data:", formData);
  };

  return (
    <Box>
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <div className="flex flex-col">
                    <Typography style={{ textAlign: 'left' }}>
                        Are you buying Travel Insurance (with Medical Benefits) for passengers 0 to 75 years old?
                    </Typography>
                    <RadioGroup
                    value={formData.buyingTravelInsurance}
                    onChange={(e) => handleRadioGroup(e, 'buyingTravelInsurance')}
                    row
                    style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                    >
                    {options.map((option) => (
                        <FormControlLabel
                        key={option}
                        control={
                            <Radio
                            value={option}  // Radio button will set this value
                            checked={formData.buyingTravelInsurance === option}  // Check if this option is selected
                            />
                        }
                        label={option}
                        />
                    ))}
                    </RadioGroup>
                </div>
            </FormControl>
            <FormControl fullWidth>
                <div className="flex flex-col">
                    <Typography style={{ textAlign: 'left' }}>
                    Plan type
                    </Typography>
                    <RadioGroup
                    value={formData.planType}
                    onChange={(e) => handleRadioGroup(e, 'planType')}
                    row
                    style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                    >
                    {options.map((option) => (
                        <FormControlLabel
                        key={option}
                        control={
                            <Radio
                            value={option}  // Radio button will set this value
                            checked={formData.planType === option}  // Check if this option is selected
                            />
                        }
                        label={option}
                        />
                    ))}
                    </RadioGroup>
                </div>
            </FormControl>
            <FormControl fullWidth>
                <div className="flex flex-col">
                    <Typography style={{ textAlign: 'left' }}>
                    What is the purpose of your travel?
                    </Typography>
                    <RadioGroup
                    value={formData.planType}
                    onChange={(e) => handleRadioGroup(e, 'travelPurpose')}
                    row
                    style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                    >
                    {travelPurpose.map((option) => (
                        <FormControlLabel
                        key={option}
                        control={
                            <Radio
                            value={option}  // Radio button will set this value
                            checked={formData.travelPurpose === option}  // Check if this option is selected
                            />
                        }
                        label={option}
                        />
                    ))}
                    </RadioGroup>
                </div>
            </FormControl>
            <FormControl fullWidth>
              <div className="flex flex-col">
                  <Typography style={{ textAlign: 'left' }}>
                    Are you travelling within the Phillipines only?
                  </Typography>
                  <div className="flex items-center">
                    <RadioGroup
                      value={formData.travelLocally}
                      onChange={(e) => handleRadioGroup(e, 'travelLocally')}
                      row
                      style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                    >
                    {options.map((option) => (
                        <FormControlLabel
                        key={option}
                        control={
                            <Radio
                            value={option}  // Radio button will set this value
                            checked={formData.travelLocally === option}  // Check if this option is selected
                            />
                        }
                        label={option}
                        />
                    ))}
                    </RadioGroup>
                    <span>(Select YES/NO to change the destination list below.)</span>
                  </div>
              </div>
            </FormControl>
            <FormControl fullWidth>
              <div className="flex flex-col">
                  <Typography style={{ textAlign: 'left' }}>
                    Is your endpoint within the Philippines?
                  </Typography>
                  <div className="flex items-center">
                    <RadioGroup
                      value={formData.endpoint}
                      onChange={(e) => handleRadioGroup(e, 'endpoint')}
                      row
                      style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                    >
                    {options.map((option) => (
                        <FormControlLabel
                        key={option}
                        control={
                            <Radio
                            value={option}  // Radio button will set this value
                            checked={formData.endpoint === option}  // Check if this option is selected
                            />
                        }
                        label={option}
                        />
                    ))}
                    </RadioGroup>
                    <span>(Select YES/NO to change the destination list below.)</span>
                  </div>
              </div>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography style={{ textAlign: 'left' }}>
                Coverage Period
              </Typography>
              <div className="flex w-full mt-2 lg:mt-0 lg:ml-2 gap-2 items-center justify-center">
                <div className="w-full">
                  <DatePicker
                    className="w-full"
                    label="From"
                    value={coverageFrom}
                    onChange={(newValue) => setCoverageFrom(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="w-full">
                  <DatePicker
                    className="w-full"
                    label="To"
                    value={coverageTo}
                    onChange={(newValue) => setCoverageTo(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </LocalizationProvider>
            <div>
              <Autocomplete
                value={from}
                onChange={(event, newValue) => setFrom(newValue)}
                options={provinces?.map(key => key.provDesc).sort()}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Trip begins at"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    />
                  )}
                />
            </div>
            <div className="flex flex-col">
              <Typography style={{ textAlign: 'left' }}>
              Is your end point within the Philippines
              (Are you returning to the Philippines)?
              </Typography>
              <div className="flex items-center">
                <RadioGroup
                  value={isReturning}
                  onChange={(e) => setIsReturning(e.target.value)}
                  row
                  style={{ justifyContent: 'flex-start' }}
                >
                {options.map((option) => (
                    <FormControlLabel
                    key={option}
                    control={
                        <Radio
                          value={option}
                          checked={isReturning === option}
                        />
                    }
                    label={option}
                    />
                ))}
                </RadioGroup>
              </div>
            </div>
            <div>
              <Autocomplete
                value={to}
                onChange={(event, newValue) => setTo(newValue)}
                options={isReturning === 'Yes' ? 
                  provinces?.map(key => key.provDesc).sort() : 
                  countryList?.map(country => country.toUpperCase()).sort()
                }
                filterOptions={(x) => x}
                // loading={toLoading}
                // noOptionsText={toLoading ? "Loading..." : "Search Airports"}
                // onInputChange={(event, newInputValue) => setToQuery(newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Trip ends at"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {/* {toLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null} */}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    />
                  )}
              />
            </div>
        </form>
    </Box>

  );
};
