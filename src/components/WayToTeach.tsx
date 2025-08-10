import React from 'react';

interface Props extends React.HTMLAttributes<HTMLLIElement> {
    title: string;
    description: string;
}
const WayToTeach: React.FC<Props> = ({ title, description, ...props }) => {
    return (
        <li {...props}>
            <p>
                <strong>{title}</strong>
                {description}
            </p>
        </li>
    );
};

export default WayToTeach;
