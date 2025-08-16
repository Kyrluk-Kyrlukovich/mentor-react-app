import React from 'react';
import Button from './Button/Button';

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
    title: string;
    description: string;
    onEdit?: () => void;
    onDelete?: () => void;
}
const WayToTeach: React.FC<Props> = ({
    title,
    description,
    onEdit,
    onDelete,
    ...props
}) => {
    return (
        <li {...props}>
            <p>
                <strong>{title}</strong>
                {description}
            </p>
            {onEdit && <Button onClick={onEdit}>Edit Way</Button>}
            {onDelete && <Button onClick={onDelete}>Delete Way</Button>}
        </li>
    );
};

export default WayToTeach;
