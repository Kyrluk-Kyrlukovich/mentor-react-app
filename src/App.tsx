import Header from './components/Header/Header';
import IntroSection from './components/IntroSection';
import TabsSections from './components/TabsSections';
import { useState } from 'react';
import FeedbackSection from './components/FeedbackSection';
import EffectSections from './components/EffectSections';

import React from 'react';
import { MainTabType } from '@/types';
import { MainPage } from './pages/MainPage';

const App: React.FC = () => {
    const [tab, setTab] = useState<MainTabType>('feedback');
    return (
        <div>
            <Header />
            <main>
                <IntroSection />
                <TabsSections
                    activeTab={tab}
                    onChange={value => setTab(value)}
                />
                {tab === 'feedback' && <FeedbackSection />}
                {tab === 'main' && <MainPage />}
                {tab === 'effect' && (
                    <>
                        <EffectSections />
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
