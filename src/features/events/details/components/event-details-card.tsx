import { Loader2, Pencil, Map } from 'lucide-react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import { useState } from 'react';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import EventDetailedMap from './event-details-map';
import { extractPlaceName } from '@/app/lib/utils';

type EventCardProps = {
  event: AppEvent;
};

export default function EventDetailsCard({ event }: EventCardProps) {
  const { authenticated } = useAppSelector((state) => state.auth);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { update } = useFireStore('events');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  async function toggleAttendance() {
    if (!currentUser)
      return navigate('/auth/login', {
        state: { from: location.pathname },
      });

    if (!event) return;

    setLoading(true);
    if (event.isGoing) {
      const attendee = event.attendees.find((x) => x.id === currentUser.uid);
      await update(event.id, {
        attendees: arrayRemove(attendee),
        attendeeIds: arrayRemove(currentUser.uid),
      });
      setLoading(false);
    } else {
      await update(event.id, {
        attendees: arrayUnion({
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }),
        attendeeIds: arrayUnion(currentUser.uid),
      });
      setLoading(false);
    }
  }

  return (
    <section>
      <Card className='h-fit' key={event.id}>
        <CardHeader className='relative'>
          <div className='relative'>
            {event.hostUid === currentUser?.uid && (
              <Button
                variant={'outline'}
                size='icon'
                className='absolute right-4 top-4 z-10 rounded-full'
              >
                <Pencil className='h-4 w-4' />
              </Button>
            )}
            <img
              src={`/category-images/${event.category}.webp`}
              alt='event main image'
              className='h-full w-full rounded-2xl object-cover brightness-[30%]'
            />
            <div className='absolute bottom-4 left-4 flex flex-col gap-2 text-white'>
              <h3 className='text-2xl font-semibold'>{event.title}</h3>
              <div className=''>
                <span>{format(new Date(event.date), 'PPPPp')}</span>
              </div>
              <div className=''>
                <span>{extractPlaceName(event.venue)}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>{event.description}</p>

          {event.latLng && (
            <Accordion type='single' collapsible className='mt-2 w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  <div className='flex items-center gap-2'>
                    <Map className='h-4 w-4 shrink-0 text-primary' />
                    Ver o mapa
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <EventDetailedMap latLng={event.latLng} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
        <CardFooter className='flex gap-4'>
          {event.hostUid === currentUser?.uid ? (
            <Button
              variant='secondary'
              onClick={() => {
                navigate(`/events/manage/${event.id}`);
              }}
            >
              Editar evento
            </Button>
          ) : (
            <Button
              disabled={!authenticated}
              className='min-w-44'
              variant='secondary'
              onClick={toggleAttendance}
            >
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : null}
              {event.isGoing ? 'Cancelar participação' : 'Participar'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
}
