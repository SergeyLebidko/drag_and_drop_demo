import React, {useContext} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Card, InitialData} from '../../types';
import appContext from '../../context';
import './CardPanel.scss';

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const {tasks} = useContext<InitialData>(appContext);

    const {id, title} = card;
    return (
        <li className="card_panel">
            <h1 className="card_panel__title">{title}</h1>
            <ul>
                {tasks
                    .filter(task => task.cardId === id)
                    .sort((a, b) => a.order - b.order)
                    .map(task => <TaskPanel key={task.id} task={task}/>)
                }
            </ul>
        </li>
    );
}

export default CardPanel;