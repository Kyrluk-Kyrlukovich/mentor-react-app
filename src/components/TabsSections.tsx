import React from 'react';
import Button from './Button/Button.tsx';
import { MainTabType } from '@/types';

interface Props {
    activeTab: MainTabType;
    onChange: (value: MainTabType) => void;
}
const TabsSections: React.FC<Props> = ({ activeTab, onChange }) => {
    return (
        <section style={{ marginBottom: '1rem' }}>
            <Button
                isActive={activeTab === 'main'}
                onClick={() => onChange('main')}
            >
                Главная
            </Button>
            <Button
                isActive={activeTab === 'feedback'}
                onClick={() => onChange('feedback')}
            >
                Обратная связь
            </Button>
            <Button
                isActive={activeTab === 'effect'}
                onClick={() => onChange('effect')}
            >
                Effect
            </Button>
        </section>
    );
};

export default TabsSections;
