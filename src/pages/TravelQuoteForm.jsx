import React, { useContext, useEffect, useState } from "react";
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import { GlobalDataContext } from "../contexts/globalData";
import { Cancel } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { Globe, Plane } from "lucide-react";
import { provinces } from "../static/provinces";
import { countryList } from "../static/countryList";
import ImageCarousel from "../components/ImageCarousel";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function TravelQuoteForm() {
  const navigate = useNavigate()
  const [isReturning, setIsReturning] = useState(null)
  const [buyingTravelInsurance, setBuyingTravelInsurance] = useState(null)
  const [travelLocally, setTravelLocally] = useState(null)
  // const [coverageFrom, setCoverageFrom] = useState(null);
  // const [coverageTo, setCoverageTo] = useState(null);
  // const [selectedDestinations, setSelectedDestinations] = useState([]);
  // const [numberOfDays, setNumberOfDays] = useState(0);
  const { formData, setFormData } = useContext(GlobalDataContext)
  const [tripType, setTripType] = useState("single");
  const planTypes = ['Individual', 'Family', 'Multi Trip']
  const travelPurpsoseList = ['Visit Relatives', 'Business', 'Short-term study', 'Leisure']
  const options = ["Yes", "No"];

  const VALIDATION_SCHEMA = Yup.object().shape({
    planType: Yup.string().required('Plan Type is Required'),
    travelPurpose: Yup.string().required('Travel Purpose is Required'),
    from: Yup.string().required('is Required'),
    to: Yup.string().required('is Required'),
    destinations: Yup.array()
    .of(Yup.string().required('Destination is required'))
    .min(1, 'At least one destination is required'),
    coverageFrom: Yup.string().required('Effective Date is required'),
    coverageTo: Yup.string().required('Expiry Date is required'),
  })

  const formik = useFormik({
    initialValues: {
      planType: formData.planType || "",
      travelPurpose: formData.travelPurpose || "",
      from: formData.from || "",
      to: formData.to || "",
      destinations: formData.destinations || [],
      numberOfDays: formData.numberOfDays || 0,
      coverageFrom: formData.coverageFrom || "",
      coverageTo: formData.coverageTo || ""
    },
    validationSchema: VALIDATION_SCHEMA,
    validateOnMount: true,
  });

  const handleRemoveDestination = (value) => {
    formik.setFieldValue(
      "destinations",
      formik.values.destinations.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    // console.log('formData:', formData?.isReturning)
    console.log('isValied:', formik.isValid)
    console.log('dirty:', formik.dirty)
    if (formik.values.coverageFrom && formik.values.coverageTo) {
      const from = dayjs(formik.values.coverageFrom);
      const to = dayjs(formik.values.coverageTo);
      const diff = to.diff(from, "day"); // Calculate difference in days
  
      if (formik.values.numberOfDays !== diff) {
        formik.setFieldValue("numberOfDays", diff);
      }
    }
  }, [formik, formik.values.coverageFrom, formik.values.coverageTo]); 

  const destinationOptions =
  travelLocally === "No"
    ? countryList.map((country) => country).sort() // Sort country list
    : provinces?.map(key => key.provDesc.charAt(0).toUpperCase() + 
    key.provDesc.slice(1).toLowerCase()).sort();

  const handleGatherInfo = () => {
    setFormData({
      ...formik?.values,
      buyingTravelInsurance: buyingTravelInsurance,
      travelLocally: travelLocally,
      isReturning: isReturning,
    });
    navigate('/plans')
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="mt-10 w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
        <div className="ml-4">
          <Box
            component="img" 
            src="https://cdn.prod.website-files.com/6540d2641ba7d0024e6d68ee/66477a750900c5391c15cc50_PCIL256x256.png"
            alt="Logo Image"
            sx={{width: 75, height: 65}}
          />
        </div>
        <div className="w-full mt-4 md:w-1/2 pr-6">
          <ImageCarousel />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2 p-6 overflow-y-auto max-h-[500px]">
          <div className="flex mb-4 gap-2">
            <Button 
              variant={tripType === "single" ? "contained" : "outlined"} 
              startIcon={<Plane />} 
              onClick={() => setTripType("single")}>
              Single Trip
            </Button>
            <Button
              variant={tripType === "annual" ? "contained" : "outlined"}
              startIcon={<Globe />} 
              onClick={() => setTripType("annual")} 
              className="ml-2">
              Family Trip
            </Button>
          </div>
          {/* Form Fields */}
          <FormControl fullWidth className="mb-4">
            <div className="flex flex-col">
              <Typography style={{ textAlign: 'left' }}>
                Buying Travel Insurance for passengers aged 0-75?
              </Typography>
                <RadioGroup
                  value={formData?.buyingTravelInsurance || buyingTravelInsurance}
                  onChange={(e) => setBuyingTravelInsurance(e.target.value)}
                  row
                  style={{ justifyContent: 'flex-start' }} // Align radio buttons to the left
                >
                  {options.map((option) => (
                      <FormControlLabel
                      key={option}
                      control={
                          <Radio
                            size="small"
                            value={option}  // Radio button will set this value
                            checked={(formData?.buyingTravelInsurance || buyingTravelInsurance) === option}  // Check if this option is selected
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
                  Travelling within the Phillipines only?
                </Typography>
                <div className="flex items-center">
                  <RadioGroup
                    value={travelLocally || formData?.travelLocally}
                    onChange={(e) => setTravelLocally(e.target.value)}
                    row
                    style={{ justifyContent: 'flex-start' }}
                  >
                  {options.map((option) => (
                      <FormControlLabel
                      key={option}
                      control={
                          <Radio
                          size="small"
                          value={option}
                          checked={(formData?.travelLocally || travelLocally) === option}
                          />
                      }
                      label={option}
                      />
                  ))}
                  </RadioGroup>
                </div>
            </div>
          </FormControl>
          <FormControl fullWidth>
            <div className="flex flex-col">
              <Typography style={{ textAlign: 'left' }}>
                Returning to the Philippines?
              </Typography>
              <div className="flex items-center">
                <RadioGroup
                  value={isReturning || formData?.isReturning}
                  onChange={(e) => setIsReturning(e.target.value)}
                  row
                  style={{ justifyContent: 'flex-start' }}
                >
                {options.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                          <Radio
                            size="small"
                            value={option}
                            checked={(formData?.isReturning || isReturning) === option}
                          />
                      }
                      label={option}
                    />
                ))}
                </RadioGroup>
              </div>
            </div>
          </FormControl>
          <div>
            <Autocomplete
              size="small"
              options={planTypes}
              value={formik.values.planType}
              onChange={(event, newValue) => {
                formik.setFieldValue("planType", newValue);
                // formik.setTouched({ ...formik.touched, planType: true }); // Mark as touched
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Plan Type"
                  error={formik.touched.planType && Boolean(formik.errors.planType)}
                  // helperText={formik.touched.planType && formik.errors.planType}
                  onBlur={() => formik.setTouched({ ...formik.touched, planType: true })} // Ensure blur sets it as touched
                />
              )}
            />
          </div>
          <div>
            <Autocomplete
              size="small"
              value={formik.values.travelPurpose}
              onChange={(event, newValue) => {
                formik.setFieldValue("travelPurpose", newValue)
                // formik.setTouched({ ...formik.touched, travelPurpose: true });
              }}
              options={travelPurpsoseList.sort()}
              filterOptions={(options, { inputValue }) => 
                options.filter((option) => 
                  option.toLowerCase().includes(inputValue.toLowerCase()) // Case-insensitive search
                )
              }
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  onBlur={() => formik.setTouched({ ...formik.touched, travelPurpose: true })}
                  onKeyDown={(e) => {e.preventDefault()}}
                  label="Travel Purpose"
                  error={
                    formik.touched.travelPurpose &&
                    Boolean(formik.errors.travelPurpose)
                  }
                  // helperText={
                  //   formik.touched.travelPurpose && formik.errors.travelPurpose
                  // }
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
          <div>
            <Autocomplete
              aria-required
              size="small"
              value={formik.values.from}
              // onChange={(event, newValue) =>
              //   formik.setFieldValue("from", newValue)
              // }
              onChange={(event, newValue) => {
                formik.setFieldValue("from", newValue)
                // formik.setTouched({ ...formik.touched, from: true });
              }}
              options={provinces?.map(key => key.provDesc.charAt(0).toUpperCase() + 
                key.provDesc.slice(1).toLowerCase()).sort()}
                filterOptions={(options, { inputValue }) => 
                  options.filter((option) => 
                    option.toLowerCase().includes(inputValue.toLowerCase()) // Case-insensitive search
                  )
                }
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Origin"
                  onBlur={() => formik.setTouched({ ...formik.touched, from: true })}
                  error={
                    formik.touched.from &&
                    Boolean(formik.errors.from)
                  }
                  // helperText={
                  //   formik.touched.from  && formik.errors.from 
                  // }
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
          <FormControl fullWidth size="small">
            <InputLabel required>
              Destination/s
            </InputLabel>
            <Select
              label
              multiple
              value={formik.values.destinations}
              // onChange={(event) => {
              //   formik.setFieldValue("destinations", event.target.value); // Properly update array
              // }}
              onChange={(event) => {
                formik.setFieldValue("destinations", event.target.value); // Properly update array
                // formik.setTouched({ ...formik.touched, destinations: true });
              }}
              error={
                formik.touched.destinations &&
                Boolean(formik.errors.destinations)
              }
              onBlur={() => formik.setTouched({ ...formik.touched, destinations: true })}
              input={<OutlinedInput label="Destination/s" />}
              renderValue={(selected) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selected.map((value) => (
                    <Chip
                    size="small"
                    key={value}
                    label={value}
                    sx={{ position: "relative", paddingRight: "24px" }} // Adjust padding for icon space
                    deleteIcon={
                      <Cancel
                        sx={{
                          position: "absolute",
                          top: "-2px",
                          right: "-5px",
                          color: "red",
                          cursor: "pointer",
                          fontSize: 18,
                        }}
                        onMouseDown={(e) => e.stopPropagation()} // Prevents select opening
                      />
                    }
                    onDelete={() => handleRemoveDestination(value)}
                  />
                  ))}
                </div>
              )}
            >
              {destinationOptions.map((destination) => (
                <MenuItem key={destination} value={destination}>
                   {destination}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Autocomplete
              size="small"
              value={formik.values.to}
              // onChange={(event, newValue) =>
              //   formik.setFieldValue("to", newValue)
              // }
              onChange={(event, newValue) => {
                formik.setFieldValue("to", newValue)
                // formik.setTouched({ ...formik.touched, to: true });
              }}
              options={isReturning === 'Yes' ? 
                provinces?.map(key => key.provDesc.charAt(0).toUpperCase() + 
                key.provDesc.slice(1).toLowerCase()).sort() : 
                countryList?.map(country => country).sort()
              }
              filterOptions={(options, { inputValue }) => 
                options.filter((option) => 
                  option.toLowerCase().includes(inputValue.toLowerCase()) // Case-insensitive search
                )
              }
              // loading={toLoading}
              // noOptionsText={toLoading ? "Loading..." : "Search Airports"}
              // onInputChange={(event, newInputValue) => setToQuery(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={
                    formik.touched.to &&
                    Boolean(formik.errors.to)
                  }
                  onBlur={() => formik.setTouched({ ...formik.touched, to: true })}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex w-full mt-2 gap-2 items-center justify-center">
              <div className="w-full">
                <DatePicker
                  className="w-full"
                  label="Effective Date"
                  value={formik.values.coverageFrom ? dayjs(formik.values.coverageFrom) : null}
                  onChange={(newValue) => {
                    formik.setFieldValue("coverageFrom", newValue)
                    // formik.setTouched({ ...formik.touched, coverageFrom: true });
                  }}
                  // onClose={() => formik.setTouched({ ...formik.touched, coverageFrom: true })} 
                  slotProps={{
                    textField: {
                      size: 'small',
                      error: formik.touched.coverageFrom && Boolean(formik.errors.coverageFrom),
                      // helperText: formik.touched.coverageFrom && formik.errors.coverageFrom,
                      onBlur: () => formik.setTouched({ ...formik.touched, coverageFrom: true }), // Ensure blur marks as touched
                    },
                  }}
                />
              </div>
              <div className="w-full">
                <DatePicker
                  className="w-full"
                  label="Expiry Date"
                  value={formik.values.coverageTo ? dayjs(formik.values.coverageTo) : null}
                  onChange={(newValue) => formik.setFieldValue("coverageTo", newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.coverageTo && Boolean(formik.errors.coverageTo)}
                      // helperText={formik.touched.coverageTo && formik.errors.coverageTo}
                      size="small"
                    />
                  )}
                  slotProps={{ textField: { size: 'small' } }}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </LocalizationProvider>
          {/* <div className="flex space-x-2 mb-4">
            <TextField label="Effective Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Expiry Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
          </div> */}
          {/* Client Type Selection */}
          {/* <div className="flex mb-4">
            <Card
              className={`p-4 flex-1 text-center cursor-pointer ${clientType === "individual" ? "bg-gray-300" : ""}`}
              onClick={() => setClientType("individual")}
            >
              Individual
            </Card>
            <Card
              className={`p-4 flex-1 text-center cursor-pointer ml-2 ${clientType === "group" ? "bg-gray-300" : ""}`}
              onClick={() => setClientType("group")}
            >
              Group or Company
            </Card>
          </div> */}
          {/* Submit Button */}
          <Button disabled={!(formik.isValid && formik.dirty)} onClick={() => handleGatherInfo()} variant="contained" color="primary" fullWidth>Next</Button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full max-w-4xl text-center py-4 text-blue-600">
        If you have any questions, please write to us at <a href="mailto:customerservice@pacificcross.com" className="underline">customerservice@pacificcross.com</a>
      </div>
    </div>
  );
}
