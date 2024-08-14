import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Card, CardHeader } from './ui/card';
import EventCard from './event-card';

export default function EventsDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className='flex flex-row gap-10'>
      <section className='flex basis-9/12'>
        <EventCard />
      </section>
      <aside className='basis-3/12 flex-col justify-center'>
        <section>
          <Card className='rounded-md border bg-card'>
            <CardHeader>
              <h3 className='text-xl font-semibold'>Filtros</h3>
            </CardHeader>
          </Card>
        </section>
        <section className='mt-4'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border bg-card'
          />
        </section>
      </aside>
    </div>
  );
}
