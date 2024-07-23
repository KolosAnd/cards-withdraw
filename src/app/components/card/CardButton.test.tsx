import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { CardButton } from '@/app/components/card/CardButton';
import { ICard } from '@/app/types';
import {store} from "@/app/store";

const card: ICard = {
    id: '1',
    price: 1,
    type: 'VISA',
    commission: 0.25,
    bonus: 2,
};

const renderComponent = (selectedCard: ICard | null, setSelectedCard: jest.Mock) => {
    return render(
        <Provider store={store}>
            <CardButton selectedCard={selectedCard as ICard} setSelectedCard={setSelectedCard} />
        </Provider>
    );
};

test('renders CardButton component', () => {
    const setSelectedCard = jest.fn();
    renderComponent(card, setSelectedCard);

    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Withdraw ($1.00)')).toBeInTheDocument();
});

test('shows loading state on click', async () => {
    const setSelectedCard = jest.fn();
    renderComponent(card, setSelectedCard);

    const button = screen.getByRole('button', { name: /Withdraw/i });
    fireEvent.click(button);

    expect(screen.getByText('Withdrawing ...')).toBeInTheDocument();
});

test('disables button when balance is insufficient', () => {
    const setSelectedCard = jest.fn();

    // Mock the state for insufficient balance
    const mockStore = {
        ...store,
        getState: () => ({
            ...store.getState(),
            userBalance: {
                balance: 0,
                isFrozen: false,
            },
        }),
    };

    render(
        <Provider store={mockStore}>
            <CardButton selectedCard={card} setSelectedCard={setSelectedCard} />
        </Provider>
    );

    const button = screen.getByRole('button', { name: /Withdraw/i });
    expect(button).toBeDisabled();
});
