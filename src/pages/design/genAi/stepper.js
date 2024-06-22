import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';



const VerticalStepper = ({ activeStep, steps = [] }) => {


  return (
    <Grid container height={"100vh"}>
      <Grid item xs={2} sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {steps.map((step, index) => (
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              key={index}
              sx={{
                width: '30px',
                height: '30px',
                backgroundColor: index === activeStep ? 'rgb(72, 136, 200)' : (index < activeStep ? 'rgb(72, 136, 200)' : '#C2C2C2'),
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FFF',
                position: 'relative',
                transition: 'background-color 0.5s ease-in-out',
              }}
            >
              {index < activeStep ? <CheckCircle /> : index + 1}
              {index < activeStep && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: 'calc(100% - 30px)',
                    width: '4px',
                    backgroundColor: '#175CE5',
                    zIndex: -1,
                  }}
                />
              )}
            </Box>
            {index !== 3 &&
              <div style={{ background: index < activeStep ? 'rgb(72, 136, 200)' : 'lightgrey', height: '120px', width: '10px', display: 'flex', justifyContent: 'center', borderRadius: '5px' }}></div>
            }          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default VerticalStepper;
