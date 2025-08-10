import React, { useCallback, useEffect, useState } from 'react';
import Button from './Button/Button.tsx';
import Modal from './Modal/Modal.tsx';
import useInput from '../hooks/useInput.ts';
import { ApiResponse, User } from '@/types';

const EffectSections: React.FC = () => {
    const input = useInput();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const toggle = () => {
        setIsOpenModal(prev => !prev);
    };

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response: Response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data: User[] = await response.json();
            setUsers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div>Effect</div>
            <Button onClick={toggle}>Октрыть информацию</Button>
            <Modal isOpen={isOpenModal}>
                <h3>Hello from modal</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi, dolores necessitatibus sunt quibusdam
                </p>
                <Button onClick={toggle}>Закрыть</Button>
            </Modal>

            {isLoading && <h3>Loading...</h3>}
            {!isLoading && (
                <>
                    <input {...input} type="text" className={'control'} />
                    {input.value}
                    <ul>
                        {users
                            .filter(user =>
                                user.name
                                    .toLowerCase()
                                    .includes(input.value.toLowerCase())
                            )
                            .map(user => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default EffectSections;
