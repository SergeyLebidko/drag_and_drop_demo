import React, {useContext} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Card, IAppContext, Task} from '../../types';
import appContext from '../../context';
import './CardPanel.scss';

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const {tasks, insertTask} = useContext<IAppContext>(appContext);

    const dragOverHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }

    const dropHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        const droppedTask: Task = (JSON.parse(event.dataTransfer.getData('Text')));
        insertTask(droppedTask, card.id);
    }

    const {id, title} = card;
    return (
        <li className="card_panel" onDragOver={dragOverHandler} onDrop={dropHandler}>
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