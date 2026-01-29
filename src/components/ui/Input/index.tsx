import styles from './styles.module.scss'
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
        className={styles.input}
        {...rest}
        />
    )
}

export function TextAerea({...rest}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}