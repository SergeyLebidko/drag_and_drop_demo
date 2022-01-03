import React, {useContext} from 'react';
import CardPanel from '../CardPanel/CardPanel';
import appContext from '../../context';
import {IAppContext} from '../../types';
import './CardList.scss';

const CardList: React.FC = () => {
    const {cards} = useContext<IAppContext>(appContext);

    return (
        <ul className="card_list">
            {cards
                .sort((a, b) => a.order - b.order)
                .map(card => <CardPanel key={card.id} card={card}/>)
            }
        </ul>
    );
}

export default CardList;