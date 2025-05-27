import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserPhotos } from '../../helpers';

const DetailsButtonReactQuery: React.FC = () => {
  useQuery({
    queryKey: ['photos'],
    queryFn: () => fetchUserPhotos(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return <span>View Details</span>;
};

export default DetailsButtonReactQuery;
