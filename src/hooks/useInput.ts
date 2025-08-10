import React, { ChangeEvent, useState } from 'react';

export default function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value),
    };
}
