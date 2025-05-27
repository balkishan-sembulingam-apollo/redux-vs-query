import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotosRequest } from '../user-react-saga/userSlice';

const DetailsButtonReactSaga: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPhotosRequest());
  }, [dispatch]);

  return <span>View Details</span>;
};

export default DetailsButtonReactSaga;
