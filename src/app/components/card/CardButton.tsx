import {priceConverterToToken, priceConverterToTokenWithCommission} from "@/app/utils/priceConvert";
import {FC, useState} from "react";
import {ICard} from "@/app/types";
import {useAppSelector, useDispatch} from "@/app/store";
import {changeBalance, selectBalance, selectIsFrozen} from "@/app/utils/slices/userBalance";
import Loader from "@/app/components/loader/Loader";
import {incrementCommissionTransactions, selectCommissionTransactions} from "@/app/utils/slices/commission";

interface Props {
    selectedCard: ICard;
    setSelectedCard: (cardId: ICard | null) => void;
}

const queryTime = 3000;

export const CardButton:FC<Props> = ({selectedCard , setSelectedCard}) => {
    const balance = useAppSelector(selectBalance);
    const dispatch = useDispatch();
    const isFrozen = useAppSelector(selectIsFrozen);
    const transactionsCount = useAppSelector(selectCommissionTransactions);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const withdraw = async () => {
        setIsLoading(true);
        const withdrawPrice = selectedCard.price + (transactionsCount <= 2 ? 0 : selectedCard.commission);
        const finalPrice = balance - withdrawPrice + (selectedCard?.price * (selectedCard?.bonus  / 100))

        setTimeout(async ()=>{
           dispatch(changeBalance(finalPrice));
            if (selectedCard.commission > 0) {
                dispatch(incrementCommissionTransactions());
            }
            try {
                const response = await fetch('/api/withdraw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ finalPrice }),
                });
                const result = await response.json();
                console.log(result.message);
            } catch (error) {
                console.error('Error:', error);
            }

            setSelectedCard(null);
            setIsLoading(false);
        }, queryTime);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between w-full">
                <div>
                    <p className="mb-2 font-bold text-sm">Price</p>
                    {selectedCard && balance < (selectedCard?.price + (transactionsCount <= 2 ? 0 : selectedCard.commission)) &&
                        <div className="flex">
                            <img src="/exclamation-diamond.svg" alt=""/>
                            <p className="ml-1 text-warning">Not enough funds</p>
                        </div>
                    }
                </div>
                <div className="flex-col items-end">
                    <div className="justify-end flex mb-2">
                        <img className="mr-2" src="/coin-scrambly.svg" alt=''/>
                        <p className="font-bold text-sm">{priceConverterToTokenWithCommission(selectedCard?.price as number, (transactionsCount <= 2 ? 0 : selectedCard?.commission  as number)) || 0}</p>
                    </div>
                    <div className='h-8'>
                        {selectedCard &&
                            <p className="uppercase text-greyText">
                                {
                                    (selectedCard.commission == 0) ?
                                        'no commission' :
                                        `${ (transactionsCount >= 2 && selectedCard.commission !== 0) ? (priceConverterToToken(selectedCard?.commission) + ' coins commission ') : 'no commission'}`
                                }
                            </p>
                        }
                    </div>
                    </div>
                </div>
            <button className={`bg-buttonPrimary hover:opacity-70 duration-300 text-white w-full py-5 rounded-3xl disabled:bg-buttonDisabled disabled:cursor-default ${selectedCard ? '' : ''}`}
                    disabled={!selectedCard || balance < (selectedCard?.price as number + (transactionsCount >= 2 ? selectedCard?.commission : 0) as number) || isLoading || isFrozen}
                    onClick={withdraw}
            >
                {
                    isLoading ?
                        <div className='flex items-center mx-auto w-fit'>
                            <Loader />
                            <span className="ml-2 text-white">Withdrawing ...</span>
                        </div>
                        :
                        `Withdraw ${selectedCard ? '($'+(selectedCard?.price as number + (transactionsCount >= 2 ? selectedCard?.commission : 0)).toFixed(2).toString() + ')' : ''}`
                }
            </button>
            { !!selectedCard?.bonus &&
                <div className="flex w-fit items-center rounded-xl bg-bonus py-2 px-2.5 mt-2 my-auto">
                    <img className="mr-1 w-6 h-6" src="/gift-orange.svg" alt=""/>
                    <p className="uppercase text-sm">you get ${(selectedCard?.price * (selectedCard?.bonus  / 100))} bonus</p>
                </div>
            }
            {
                isFrozen &&
                <div className="flex w-fit items-center rounded-xl bg-bonus py-2 px-2.5 mt-2 my-auto">
                    <img className="mr-1 w-6 h-6" src="/exclamation-diamond.svg" alt=""/>
                    <p className="uppercase text-sm text-warning">your account was frozen!</p>
                </div>
            }

        </div>
    )
}
