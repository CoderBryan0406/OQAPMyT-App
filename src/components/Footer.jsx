import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 6, mt: 8, width: '100%' }}>
      <Box sx={{ maxWidth: 'lg', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
        <Typography variant="body2" color="inherit">
          &copy; 2025 Your Company. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link href="#" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
          <Link href="#" color="inherit" underline="hover">
            Contact
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
