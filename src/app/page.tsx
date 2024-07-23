'use client';

import {CardList} from "@/app/components/card/CardList";

export default function Home() {

  return (
    <main className="flex flex-col items-center">
        <h2 className="mt-5 text-2xl font-bold md:text-xl sm:text-lg max-xs:text-sm">
            Card List
        </h2>
        <CardList />
    </main>
  );
}
