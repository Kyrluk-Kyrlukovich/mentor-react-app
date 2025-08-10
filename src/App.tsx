import Header from './components/Header/Header.tsx';
import TeachingSection from './components/TeachingSection/TeachingSection.tsx';
import Differences from './components/Differences.tsx';
import IntroSection from './components/IntroSection.tsx';
import TabsSections from './components/TabsSections.tsx';
import { useState } from 'react';
import FeedbackSection from './components/FeedbackSection.tsx';
import EffectSections from './components/EffectSections.tsx';

import React from 'react';
import { MainTabType } from '@/types';

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
                {tab === 'main' && (
                    <>
                        <TeachingSection />
                        <Differences />
                    </>
                )}
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
