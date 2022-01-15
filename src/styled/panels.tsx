import styled, {css} from 'styled-components';
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