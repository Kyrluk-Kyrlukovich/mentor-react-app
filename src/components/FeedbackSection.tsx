import {
    ChangeEventHandler,
    KeyboardEvent,
    useRef,
    useState,
} from 'react';
import Button from './Button/Button';

import React from 'react';

const REASONS = {
    help: 'help',
    error: 'error',
    suggest: 'suggest',
} as const;

const StateVsRef: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isShowValue, setIsShowValue] = useState(false);
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsShowValue(prev => !prev);
        }
    };
    return (
        <div>
            {inputRef.current instanceof HTMLInputElement && (
                <h3>Input value: {inputRef.current.value}</h3>
            )}
            <input
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className={'control'}
                type="text"
            />
        </div>
    );
};
const FeedbackSection: React.FC = () => {
    const [form, setForm] = useState<{
        name: string;
        reason: keyof typeof REASONS;
        hasError: boolean;
    }>({
        name: '',
        reason: 'help',
        hasError: false,
    });
    const handleChangeName: ChangeEventHandler<HTMLInputElement> = e => {
        setForm(prev => ({
            ...prev,
            name: e.target.value,
        }));
    };

    const isValidReasonKey = (key: string): key is keyof typeof REASONS => {
        return key in REASONS;
    };

    const handleChangeReason: ChangeEventHandler<HTMLSelectElement> = e => {
        const value = e.target.value;
        if (isValidReasonKey(value)) {
            setForm(prev => ({
                ...prev,
                reason: REASONS[value],
            }));
        }
    };

    return (
        <section>
            <h3>Обратная связь</h3>
            <form action="">
                <label htmlFor="name">Ваше имя</label>
                <input
                    type="text"
                    id={'name'}
                    className={'control'}
                    style={{
                        border: form.hasError ? '1px solid red' : '',
                    }}
                    value={form.name}
                    onChange={handleChangeName}
                />

                <label htmlFor="reason">Причина обращения</label>
                <select
                    id="reason"
                    className={'control'}
                    onChange={handleChangeReason}
                    value={form.reason}
                >
                    <option value={REASONS.error}>Ошибка</option>
                    <option value={REASONS.help}>Нужна помощь</option>
                    <option value={REASONS.suggest}>Предложение</option>
                </select>
                <Button disabled={form.hasError} isActive={!form.hasError}>
                    Отправить
                </Button>
            </form>

            <br />

            <StateVsRef />

            <pre>
                Name: {form.name}
                Reason: {form.reason}
            </pre>
        </section>
    );
};

export default FeedbackSection;
