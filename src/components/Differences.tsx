import React, { useState } from 'react';
import Button from './Button/Button';
import { differences } from '../data.js';

type DifferencesType = keyof typeof differences;
const Differences: React.FC = () => {
    const [type, setType] = useState<DifferencesType>('way');
    const handleClick = (type: DifferencesType) => {
        setType(type);
    };
    return (
        <section>
            <h3>Чем мы отличается от других</h3>
            <Button
                isActive={type === 'way'}
                onClick={() => handleClick('way')}
            >
                Подход
            </Button>
            <Button
                isActive={type === 'easy'}
                onClick={() => handleClick('easy')}
            >
                Доступность
            </Button>
            <Button
                isActive={type === 'program'}
                onClick={() => handleClick('program')}
            >
                Концетрация
            </Button>

            {!type && <p>Нажмите на кнопку</p>}

            {type && <p>{differences[type]}</p>}
        </section>
    );
};

export default Differences;
