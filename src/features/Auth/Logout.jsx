import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUser } from './hooks/useRegisterUser';

const Logout = () => {
  const navigate = useNavigate();
  const {userLogout} = useRegisterUser();

  useEffect(() => {
    userLogout();
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
