import {cardsData} from "@/app/cards-data";
import {Card} from "@/app/components/card/Card";
import {useState} from "react";
import {ICard} from "@/app/types";
import {CardButton} from "@/app/components/card/CardButton";


export const CardList = () => {

    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);

    return (
        <div className="px-3 max-w-3xl w-full md:px-2 sm:px-1.5">
            <div className="grid grid-cols-3 gap-3 py-4 md:gap-2 sm:gap-1.5 md:grid-cols-2">
                {
                    cardsData?.length > 0 && cardsData.map((card) =>
                        <Card card={card}
                              key={card.id}
                              selectedCard={selectedCard as ICard}
                              setSelectedCard={setSelectedCard}
                        />
                    )
                }
            </div>
            <CardButton selectedCard={selectedCard as ICard} setSelectedCard={setSelectedCard} />
        </div>
    )
}
