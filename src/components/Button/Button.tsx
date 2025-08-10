import React from 'react';
import classes from './Button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isActive?: boolean;
}
const Button: React.FC<Props> = ({ children, isActive, ...props }) => {
    return (
        <button
            {...props}
            className={
                isActive
                    ? `${classes.button} ${classes.active}`
                    : classes.button
            }
        >
            {children}
        </button>
    );
};

export default Button;
