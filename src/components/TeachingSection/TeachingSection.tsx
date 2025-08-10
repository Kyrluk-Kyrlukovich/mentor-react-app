import React from 'react';
import { ways } from '@/data';
import WayToTeach from '@/components/WayToTeach.tsx';
import classes from './TeachingSection.module.css';

const TeachingSection = () => {
    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Hello word</h1>
            <ul className={classes.list}>
                {ways.map(way => (
                    <WayToTeach
                        className={classes.item}
                        key={way.title}
                        {...way}
                    />
                ))}
            </ul>
        </section>
    );
};

export default TeachingSection;
