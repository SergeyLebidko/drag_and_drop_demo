import React, {useContext, useState} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {Card, DNDMode, IAppContext, Task} from '../../types';
import appContext from '../../context';
import {isTask} from '../../utils';
import './CardPanel.scss';

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);
    const {tasks, insertCard, insertTask} = useContext<IAppContext>(appContext);

    const {id, title} = card;

    const getClasses = (): string => {
        const classes = ['card_panel'];
        if (dndMode === DNDMode.NoDrag) classes.push('card_panel_normal');
        if (dndMode === DNDMode.Dragged) classes.push('card_panel_dragged');
        if (dndMode === DNDMode.Dropped) classes.push('card_panel_dropped');
        return classes.join(' ');
    };

    // ---------- на источнике ----------

    const dragStartHandler = (event: React.DragEvent<HTMLLIElement>): void => {
        event.dataTransfer.setData('Text', JSON.stringify(card));
        setDndMode(DNDMode.Dragged);
    }

    const dragEndHandler = (): void => {
        setDndMode(DNDMode.NoDrag);
    }

    // ---------- на приемнике ----------

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
        const droppedObject: Task | Card = (JSON.parse(event.dataTransfer.getData('Text')));

        if (isTask(droppedObject)) {
            insertTask(droppedObject, card.id);
            return
        } else {
            if (droppedObject.id === card.id) return;
            insertCard(droppedObject, card);
        }
    }

    return (
        <li
            className={getClasses()}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
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