import { Building, CalendarDays, ContactRound, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { NavLink, useNavigate } from 'react-router-dom';
import { extractPlaceName } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { AppEvent } from '@/app/types/event';
import { format } from 'date-fns';
import Ribbon from '@/components/ui/ribbon';
import Image from '@/components/ui/image';
import { categoryOptions } from '../../form/category-options';

type EventCardProps = {
  event: AppEvent;
};

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  const categoryUrl = categoryOptions.find(
    (category) => category.value === event.category
  )?.url;
  const categoryPlaceholderUrl = categoryOptions.find(
    (category) => category.value === event.category
  )?.placeholderUrl;

  return (
    <Card className='relative'>
      {event.isCancelled && <Ribbon />}
      <CardHeader>
        <Image
          placeholderSrc={categoryPlaceholderUrl}
          src={event.coverImgURL || categoryUrl}
          alt='event main image'
          className='rounded-2xl'
        />
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl font-semibold'>{event.title}</h3>
        <p className='mt-4 text-muted-foreground'>{event.description}</p>
        <div className='mt-4 flex flex-col items-start gap-2'>
          <div className='flex items-center gap-2'>
            <ContactRound className='h-4 w-4 shrink-0 text-primary' />
            <NavLink
              to={`/profile/${event.hostUid}`}
              className='text-muted-foreground'
            >
              {event.hostedBy}
            </NavLink>
          </div>
          <div className='flex items-center gap-2'>
            <CalendarDays className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>
              {format(new Date(event.date), 'PPPPp')}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>{event.city}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Building className='h-4 w-4 shrink-0 text-primary' />
            <span className='text-muted-foreground'>
              {extractPlaceName(event.venue)}{' '}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button
          variant='secondary'
          className='min-w-44'
          onClick={() => {
            navigate(`/events/${event.id}`);
          }}
        >
          Saiba mais
        </Button>
      </CardFooter>
    </Card>
  );
}
