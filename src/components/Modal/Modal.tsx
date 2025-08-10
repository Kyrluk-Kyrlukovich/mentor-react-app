import React, { useEffect, useRef } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal: React.FC<Props> = ({ children, isOpen }) => {
    const refDialog = useRef<HTMLDialogElement | null>(null);
    const container = document.getElementById('modal');
    useEffect(() => {
        if (
            refDialog.current &&
            refDialog.current instanceof HTMLDialogElement
        ) {
            if (isOpen) {
                refDialog.current.showModal();
            } else {
                refDialog.current.close();
            }
        }
    }, [isOpen]);
    return (
        <>
            {container &&
                createPortal(
                    <dialog ref={refDialog} className={classes.dialog}>
                        {children}
                    </dialog>,
                    container
                )}
        </>
    );
};

export default Modal;
