import {FC} from "react";
import {ICard} from "@/app/types";
import {priceConvert} from "@/app/utils/priceConvert";

interface Props {
    card: ICard;
    selectedCard: ICard | null;
    setSelectedCard: (cardId: ICard | null) => void;
}

export const Card:FC<Props> = ({card, selectedCard, setSelectedCard}) => {

    const selectCard = () => {
        if(selectedCard?.id == card.id) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card)
        }
    }

    return (
        <div className={`p-2 h-120 md:h-96 flex-col flex justify-between rounded-lg border-2 relative cursor-pointer duration-300
         ${selectedCard?.id == card.id ? 'border-borderSelectedCard shadow-custom' : 'border-transparent'}
         ${card?.type === 'VISA' ? 'bg-visaGradient hover:opacity-85': 'bg-amazonCard hover:bg-amazonCardHover'}`}
             onClick={selectCard}
        >
            <div className="flex justify-between">
                <div className="h-fit">
                    {selectedCard?.id == card.id &&
                        <div className="rounded-full">
                            <img src="/selected-sign.svg" alt=""/>
                        </div>
                    }
                </div>
                <div className='h-fit rounded-lg bg-labelGradient px-2 py-1 text-xs'>
                    <p className='text-white'>{priceConvert(card.price)}</p>
                </div>
            </div>
            <div className="flex w-full justify-end">
                { card.bonus !== 0 &&
                    <div className='h-fit flex items-center justify-center rounded-lg bg-labelGradient px-1 py-1'>
                        <img className="w-5 h-5" src="/gift.svg" alt="" />
                        <p className='ml-0.5 text-white text-xs pt-1'>+{card.bonus}%</p>
                    </div>
                }
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={`/${card?.type === 'VISA' ? 'visa-logo.svg' : 'amazon-logo.svg'}`} alt=""/>
            </div>
        </div>
    )
}
