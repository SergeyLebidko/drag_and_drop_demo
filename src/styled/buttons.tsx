import styled from 'styled-components';

export const AddTaskButton = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 3px;
  color: gray;
  font-size: 1.2rem;
  cursor: pointer;
`

export const AddCardButton = styled.button`
  width: 2em;
  height: 2em;
  background-color: gray;
  border: 1px solid white;
  border-radius: 3px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`

export const RemoveTaskButton = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: transparent;
  color: gray;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const RemoveCardButton = styled.button`
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
`