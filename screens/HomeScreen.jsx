import React, { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';
import WebViewScreen from './WebViewScreen';
import { FootballField } from './FootballField';
const initialState = {
  loading: true,
  statusCode: 0,
};
export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://zorbleizzle.com/');
      const status = parseInt(response.status);
      if (status) {
        setIsLoading((isLoading) => ({
          ...isLoading,
          loading: false,
          statusCode: status,
        }));
      }
      console.log(status);
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  if (isLoading.loading) {
    return <Loading />;
  }
  if (isLoading.statusCode === 200) {
    return <WebViewScreen />;
  } else {
    return <FootballField />;
  }
};
