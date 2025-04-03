import { useCallback } from 'react';
import { useLocation } from './useLocation';

export const useLocationEnabling = (onUpdate?: () => void) => {
  const { handleUpdate } = useLocation({ onUpdate });

  const enableLocation = useCallback(async () => {
    await handleUpdate();
  }, [handleUpdate]);

  return {
    enableLocation
  };
};
