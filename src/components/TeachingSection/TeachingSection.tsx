import { useReducer, useState, useCallback } from 'react';
import WayToTeach from '@/components/WayToTeach';
import classes from './TeachingSection.module.css';
import { waysService } from '@/api/waysService';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { Way } from '@/types';

const ACTIONS = {
    SET_TITLE: 'SET_TITLE',
    SET_DESCRIPTION: 'SET_DESCRIPTION',
    SET_ID: 'SET_ID',
    SET_WAY: 'SET_WAY',
    RESET: 'RESET',
} as const;

const initialState: Way = {
    id: 0,
    title: '',
    description: '',
};

type Action =
    | { type: typeof ACTIONS.SET_TITLE; payload: string }
    | { type: typeof ACTIONS.SET_DESCRIPTION; payload: string }
    | { type: typeof ACTIONS.SET_ID; payload: number }
    | { type: typeof ACTIONS.SET_WAY; payload: Way }
    | { type: typeof ACTIONS.RESET };

const reducer = (state: Way, action: Action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_ID':
            return { ...state, id: action.payload };
        case 'SET_WAY':
            return { ...action.payload };
        case 'RESET':
            return { ...initialState };
        default: {
            const _exhaustiveCheck: never = action;
            return state;
        }
    }
};

const TeachingSection: React.FC = () => {
    const { data: ways, isLoading } = waysService.useGetWaysQuery();
    const [updateWay] = waysService.useUpdateWayMutation();
    const [deleteWay] = waysService.useDeleteWayMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleOnEdit = useCallback((way: Way) => {
        dispatch({ type: ACTIONS.SET_WAY, payload: way });
        setIsOpen(true);
    }, []);

    const handleSaveItem = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            updateWay({ ...state });
            setIsOpen(false);
            dispatch({ type: ACTIONS.RESET });
        },
        [state, updateWay]
    );

    const handleDeleteItem = useCallback(
        (id: number) => {
            deleteWay(id);
        },
        [deleteWay]
    );

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
        dispatch({ type: ACTIONS.RESET });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.container}>
                <h1 className={classes.title}>Hello word</h1>
                <div>Loading...</div>
            </section>
        );
    }

    return (
        <section className={classes.container}>
            <h1 className={classes.title}>Hello word</h1>
            {ways && (
                <ul className={classes.list}>
                    {ways.map(way => (
                        <WayToTeach
                            className={classes.item}
                            onEdit={() => handleOnEdit(way)}
                            key={way.id}
                            title={way.title}
                            onDelete={() => handleDeleteItem(way.id)}
                            description={way.description}
                        />
                    ))}
                </ul>
            )}

            <Modal isOpen={isOpen}>
                <form onSubmit={handleSaveItem}>
                    <input
                        value={state.title}
                        onChange={e =>
                            dispatch({
                                type: ACTIONS.SET_TITLE,
                                payload: e.target.value,
                            })
                        }
                        type="text"
                        className="control"
                        placeholder="Title"
                    />
                    <input
                        value={state.description}
                        onChange={e =>
                            dispatch({
                                type: ACTIONS.SET_DESCRIPTION,
                                payload: e.target.value,
                            })
                        }
                        type="text"
                        className="control"
                        placeholder="Description"
                    />
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </form>
            </Modal>
        </section>
    );
};

export default TeachingSection;
