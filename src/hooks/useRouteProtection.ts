import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRouteProtection = () => {
  const [clicks, setClicks] = useState(0);
  const navigate = useNavigate();

  const handleProtect = () => {
    setClicks(clicks + 1);

    if (clicks > 18) {
      setClicks(0);
      return navigate('/solver', { state: { access: true } });
    }
  };

  return handleProtect;
};
