import React from 'react';
import { useLocation, Link} from 'react-router-dom';
import { Button } from '@mui/material';

const MenuButton = ({to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Button
        component={Link}
        to={to}
        variant={isActive ? 'contained' : 'outlined'}
        disableElevation
        style={{ backgroundColor: isActive ? '#112355' : undefined }}
      >
        {children}
      </Button>
    );

}

export default MenuButton;
