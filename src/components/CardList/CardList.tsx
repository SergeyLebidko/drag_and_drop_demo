import React, {useContext} from 'react';
import CardPanel from '../CardPanel/CardPanel';
import appContext from '../../context';
import {IAppContext} from '../../types';
import './CardList.scss';

const CardList: React.FC = () => {
    const {createCard} = useContext<IAppContext>(appContext);
    const {cards} = useContext<IAppContext>(appContext);

    return (
        <ul className="card_list">
            {cards
                .sort((a, b) => a.order - b.order)
                .map(card => <CardPanel key={card.id} card={card}/>)
            }
            <li className="card_list__control_block">
                <button className="card_list__add_card" onClick={createCard}>+</button>
            </li>
        </ul>
    );
}

export default CardList;