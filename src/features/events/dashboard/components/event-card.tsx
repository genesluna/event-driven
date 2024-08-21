import { Building, CalendarDays, ContactRound, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useAppSelector } from '@/app/store/store';
import { Button } from '@/components/ui/button';
import { AppEvent } from '@/app/types/event';
import { format } from 'date-fns';

type EventCardProps = {
  event: AppEvent;
};

export default function EventCard({ event }: EventCardProps) {
  const { authenticated } = useAppSelector((state) => state.auth);

  return (
    <Card>
      <CardHeader>
        <img
          src={`/category-images/${event.category}.webp`}
          alt='event main image'
          className='h-full w-full rounded-2xl object-cover'
        />
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl font-semibold'>{event.title}</h3>
        <p className='mt-4 text-muted-foreground'>{event.description}</p>
        <div className='mt-4 flex flex-col items-start gap-2'>
          <div className='flex items-center gap-2'>
            <ContactRound className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>{event.hostedBy}</span>
          </div>
          <div className='flex items-center gap-2'>
            {/* <span className='font-thin text-muted-foreground'>|</span> */}
            <CalendarDays className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>
              {format(new Date(event.date), 'PPPPp')}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {/* <span className='font-thin text-muted-foreground'>|</span> */}
            <MapPin className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>{event.city}</span>
          </div>
          <div className='flex items-center gap-2'>
            {/* <span className='font-thin text-muted-foreground'>|</span> */}
            <Building className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>{event.venue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button disabled={!authenticated} variant='secondary'>
          Participar
        </Button>
        <Button variant='outline'>Detalhes</Button>
      </CardFooter>
    </Card>
  );
}
