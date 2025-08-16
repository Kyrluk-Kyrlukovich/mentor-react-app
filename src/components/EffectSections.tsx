import { useEffect, useMemo, useState } from 'react';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import useInput from '../hooks/useInput';
import { usersService } from '@/api/usersService';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
    nextPage,
    prevPage,
    resetPage,
    setTotal,
} from '@/store/reducers/EffectSectionSlice';

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
`;

const EffectSections: React.FC = () => {
    const input = useInput();
    const { pagination } = useSelector(
        (state: RootState) => state.effectSectionReducer
    );
    const dispatch = useDispatch<AppDispatch>();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const toggle = () => {
        setIsOpenModal(prev => !prev);
    };
    const { data: comments, isLoading } = usersService.useGetCommentsQuery();

    const filteredComments = useMemo(() => {
        if (!comments) return [];

        return comments.filter(comment =>
            comment.name.toLowerCase().includes(input.value.toLowerCase())
        );
    }, [comments, input.value]);

    const paginatedComments = useMemo(() => {
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = startIndex + pagination.limit;

        return filteredComments.slice(startIndex, endIndex);
    }, [filteredComments, pagination.page, pagination.limit]);

    useEffect(() => {
        const totalPages = Math.ceil(filteredComments.length / pagination.limit);
        if (pagination.page > totalPages && totalPages > 0) {
            dispatch(resetPage());
        }
        dispatch(setTotal(totalPages));
    }, [filteredComments.length, pagination.limit]);

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
                        {paginatedComments.map(comment => (
                            <li key={comment.id}>{comment.name}</li>
                        ))}
                    </ul>
                </>
            )}

            <div>
                ALL PAGES: {pagination.total}
            </div>

            <PaginationContainer>
                <Button onClick={() => dispatch(prevPage())}>Prev page</Button>
                <div style={{ marginRight: '1rem' }}>{pagination.page}</div>
                <Button onClick={() => dispatch(nextPage())}>Next page</Button>
            </PaginationContainer>
        </>
    );
};

export default EffectSections;
