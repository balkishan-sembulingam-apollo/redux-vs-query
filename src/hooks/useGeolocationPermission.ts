import { useMutation } from '@tanstack/react-query';

interface GeolocationPermissionState {
  state: PermissionState;
  error?: string;
}

export const useGeolocationPermission = () => {
  const requestGeolocationPermission =
    async (): Promise<GeolocationPermissionState> => {
      try {
        // Check if the Geolocation API is supported
        if (!('geolocation' in navigator)) {
          throw new Error('Geolocation is not supported by your browser');
        }

        // Request permission
        const permission = await navigator.permissions.query({
          name: 'geolocation',
        });

        return {
          state: permission.state,
        };
      } catch (error) {
        return {
          state: 'denied',
          error:
            error instanceof Error
              ? error.message
              : 'Failed to request geolocation permission',
        };
      }
    };

  return useMutation({
    mutationFn: requestGeolocationPermission,
    onSuccess: (data) => {
      // You can add additional success handling here
      console.log('Geolocation permission status:', data.state);
    },
    onError: (error) => {
      // You can add additional error handling here
      console.error('Error requesting geolocation permission:', error);
    },
  });
};
