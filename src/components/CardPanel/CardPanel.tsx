import React, {useContext, useState} from 'react';
import TaskPanel from '../TaskPanel/TaskPanel';
import {AddTaskButton, RemoveCardButton} from '../../styled/buttons';
import {CardContainer} from '../../styled/panels';
import {Card, DNDMode, IAppContext} from '../../types';
import appContext from '../../context';
import {isTask} from '../../utils';
import {CardHeader} from "../../styled/common";

type CardProps = {
    card: Card
}

const CardPanel: React.FC<CardProps> = ({card}) => {
    const context: IAppContext = useContext(appContext);
    const {tasks, setDnd, clearDnd, dndObject, removeCard, createTask, insertCard, insertTask} = context;
    const [dndMode, setDndMode] = useState<DNDMode>(DNDMode.NoDrag);

    const {id, title} = card;

    // ---------- на источнике ----------

    const dragStartHandler = (): void => {
        setDndMode(DNDMode.Dragged);
        setDnd(card);
    }

    const dragEndHandler = (): void => {
        setDndMode(DNDMode.NoDrag);
        clearDnd();
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
        event.preventDefault();
        setDndMode(DNDMode.NoDrag);

        if (dndObject === null) return;
        if (isTask(dndObject)) {
            insertTask(dndObject, card.id);
        } else if (dndObject.id !== card.id) {
            insertCard(dndObject, card);
        }
        clearDnd();
    }

    const tasksForShow = tasks.filter(task => task.cardId === id).sort((a, b) => a.order - b.order);
    return (
        <CardContainer
            draggable
            dndMode={dndMode}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
        >
            <CardHeader>
                <span>{title}</span>
                <RemoveCardButton onClick={() => removeCard(id)}>&#10006;</RemoveCardButton>
            </CardHeader>
            {tasksForShow.length > 0 && <ul>{tasksForShow.map(task => <TaskPanel key={task.id} task={task}/>)}</ul>}
            <AddTaskButton onClick={() => createTask(id)}>+</AddTaskButton>
        </CardContainer>
    );
}

export default CardPanel;