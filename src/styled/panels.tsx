import styled, {css} from 'styled-components';
import {AddTaskButton} from './buttons';
import {DNDMode} from '../types';

export const TaskContainer = styled.li<{ dndMode: DNDMode }>`
  padding: 10px;
  border-radius: 3px;
  border-bottom: 1px solid gray;
  transition: all 300ms;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${props => {
    const {dndMode} = props;
    if (dndMode === DNDMode.Dragged) return css`
      background-color: deepskyblue;
      color: white;
    `;
    if (dndMode === DNDMode.Dropped) return css`
      background-color: LimeGreen;
      color: white;
      border-bottom: 1px solid transparent;
    `;

    return css`
      background-color: white;
      color: black;
    `;
  }}
`

export const CardContainer = styled.li<{ dndMode: DNDMode }>`
  flex: 0 0 250px;
  padding: 0.5em 0.5em 3.5em 0.5em;
  border-radius: 3px;
  transition: background-color 300ms;

  box-shadow: 0 3px 5px rgba(50, 50, 50, 0.3);

  ${props => {
    const {dndMode} = props;
    if (dndMode === DNDMode.Dragged) return css`
      background-color: deepskyblue;
    `;
    if (dndMode === DNDMode.Dropped) return css`
      background-color: LimeGreen;
    `;
    return css`
      background-color: rgb(240, 240, 240);
    `;
  }}
  ${TaskContainer} + ${TaskContainer} {
    margin-top: 0.5em;
  }

  ul + ${AddTaskButton} {
    margin-top: 0.5em;
  }
`;

export const CardListContainer = styled.ul`
  background-image: linear-gradient(to right bottom, #c9c9c9, #c3c3c3, #bebebe, #b8b8b8, #b3b3b3);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-start;

  padding: 1em;
  overflow: auto;

  ${CardContainer} + ${CardContainer} {
    margin-left: 1em;
  }

  ${CardContainer} + .control_block {
    margin-left: 1em;
  }
`;