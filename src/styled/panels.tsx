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
  &__title {
    pointer-events: none;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    padding: 4px 0;
    border-radius: 3px;
    background-color: rgb(70, 70, 70);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  &__remove_card {
    width: 20px;
    height: 20px;
    border: 1px solid white;
    border-radius: 3px;
    background-color: transparent;
    color: white;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);

    pointer-events: auto;
  }

  ${TaskContainer} + ${TaskContainer} {
    margin-top: 0.5em;
  }
`;