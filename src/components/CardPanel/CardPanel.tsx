import React, {useContext, useState} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Card, DNDMode, IAppContext, Task} from '../../types';
import appContext from '../../context';
import './CardPanel.scss';

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);
    const {tasks, insertTask} = useContext<IAppContext>(appContext);

    const getClasses = (): string => {
        const classes = ['card_panel'];
        if (dndMode === DNDMode.NoDrag) classes.push('card_panel_normal');
        if (dndMode === DNDMode.Dragged) classes.push('card_panel_dragged');
        if (dndMode === DNDMode.Dropped) classes.push('card_panel_dropped');
        return classes.join(' ');
    };

    const dragEnterHandler = (): void => {
        setDndMode(oldMode => oldMode === DNDMode.NoDrag ? DNDMode.Dropped : oldMode);
    }

    const dragOverHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.preventDefault();
        event.stopPropagation();
    }

    const dragLeaveHandler = (): void => {
        setDndMode(oldMode => oldMode === DNDMode.Dropped ? DNDMode.NoDrag : oldMode);
    }

    const dropHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        setDndMode(DNDMode.NoDrag);

        const droppedTask: Task = (JSON.parse(event.dataTransfer.getData('Text')));
        insertTask(droppedTask, card.id);
    }

    const {id, title} = card;
    return (
        <li
            className={getClasses()}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
        >
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