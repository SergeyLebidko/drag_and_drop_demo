import React, {useContext} from 'react';
import CardPanel from '../CardPanel/CardPanel';
import {AddCardButton} from '../../styled/buttons';
import {CardListContainer} from '../../styled/panels';
import appContext from '../../context';
import {IAppContext} from '../../types';

const CardList: React.FC = () => {
    const {createCard} = useContext<IAppContext>(appContext);
    const {cards} = useContext<IAppContext>(appContext);

    return (
        <CardListContainer>
            {cards
                .sort((a, b) => a.order - b.order)
                .map(card => <CardPanel key={card.id} card={card}/>)
            }
            <li className="control_block">
                <AddCardButton onClick={createCard}>+</AddCardButton>
            </li>
        </CardListContainer>
    );
}

export default CardList;