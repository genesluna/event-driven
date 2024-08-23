import { getInitials } from '@/app/lib/utils';
import { AppEvent } from '@/app/types/event';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Users } from 'lucide-react';

type Props = {
  event: AppEvent;
};

export default function EventDetailsSideBar({ event }: Props) {
  return (
    <section className='flex w-full justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <div className='flex flex-row items-center gap-2'>
            <Users className='h-5 w-5' />
            <h3 className='text-xl font-semibold'>Quem vai participar</h3>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          <hr className='h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-25 dark:via-neutral-300' />
          {event.attendees.map((attendee) => (
            <div key={attendee.id} className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage
                  src={attendee.photoURL}
                  alt={attendee.displayName || 'User'}
                />
                <AvatarFallback>
                  {getInitials(attendee.displayName)}
                </AvatarFallback>
              </Avatar>
              <span className='text-muted-foreground'>
                {attendee.displayName}
              </span>
              {event.hostUid === attendee.id && (
                <Badge variant='outline' className='ms-2'>
                  Organizador
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
