import React, { useEffect, useState } from 'react';
import reactLogo from '@/assets/react.svg';
import { styled } from 'styled-components';

const HeaderContainer = styled.header`
    height: 50px;
    display: flex;
    width: 100%;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    background-color: #fafafa;
`;
const Header: React.FC = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const idTimer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(idTimer);
        };
    }, []);

    return (
        <HeaderContainer>
            <img width={30} src={reactLogo} alt="logo" />
            <span>Время сейчас: {time}</span>
        </HeaderContainer>
    );
};

export default Header;
