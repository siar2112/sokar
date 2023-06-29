import React from 'react';
import { Link } from 'react-router-dom';
import styles from './stylesFiles/LinkButton.module.css';

const LinkButton = (props) => {
    return (
        <Link to={props.link}>
            <button className={styles.button}>
                {props.buttonText}
            </button>
        </Link>
    );
}

export default LinkButton;


