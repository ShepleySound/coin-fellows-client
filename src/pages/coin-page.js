import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { PageLayout } from '../components/page-layout';
import axios from 'axios';
import {NewChart} from '../components/coin-chart';

import { Box, Typography } from '@mui/material';


export const CoinPage = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [coinData, setCoinData] = useState(null);
  const params = useParams();


  const getCoinData = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      let response = await axios.get(`${process.env.REACT_APP_AUTH0_SERVER_URL}/coins/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      const responseData = response.data;
      console.log(responseData)
      console.log(new Date(1994, 4, 5))
      setCoinData(responseData)
    } catch (error) {
      console.error(error.message)
    }
    
  }, [getAccessTokenSilently, params.id])

  useEffect(() => {
    getCoinData();
  }, [getCoinData]);

  return (
    isAuthenticated && (
        <PageLayout>
        <NewChart title={coinData?.name} data={coinData?.chart} />
        <Box mt={4}>
          <Typography variant='h3' gutterBottom>
            Your treasure matters
          </Typography>
          <Typography variant='h5' gutterBottom>
            this is the coin page
          
          </Typography>
        </Box>
      </PageLayout>
    )
  )
}

