import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileFeedEventsList from './profile-feed-events-list';
import { QueryOptions } from '@/app/hooks/firestore/types';
import { useAppSelector } from '@/app/store/store';
import { Profile } from '@/app/types/profile';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';
import { cn } from '@/app/lib/utils';

type Props = {
  profile: Profile;
};

export default function ProfileFeed({ profile }: Props) {
  const { currentUser } = useAppSelector((state) => state.auth);
  const startDate = useRef(new Date());
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'hostUid', operator: '==', value: profile.id },
    { attribute: 'date', operator: '>=', value: startDate.current },
  ]);

  const isProfileOwner = currentUser?.uid === profile.id;

  function handleSetFilter(filter: string) {
    let q: QueryOptions[];

    if (!currentUser?.uid) return;

    if (!isProfileOwner) return;

    switch (filter) {
      case 'isGoing':
        q = [
          {
            attribute: 'attendeeIds',
            operator: 'array-contains',
            value: profile.id,
          },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      case 'Gone':
        q = [
          {
            attribute: 'attendeeIds',
            operator: 'array-contains',
            value: profile.id,
          },
          { attribute: 'date', operator: '<', value: startDate.current },
        ];
        break;
      case 'isHost':
        q = [
          {
            attribute: 'hostUid',
            operator: '==',
            value: profile.id,
          },
          { attribute: 'date', operator: '>=', value: startDate.current },
        ];
        break;
      default:
        q = [{ attribute: 'date', operator: '>=', value: startDate.current }];
        break;
    }
    setQuery(q);
  }

  return (
    <div className='flex h-full w-full flex-grow flex-col'>
      <Label
        className={cn('mb-3', {
          'mb-0 text-xl font-semibold': !isProfileOwner,
        })}
      >{`${isProfileOwner ? 'Eventos que:' : 'Meus eventos:'}`}</Label>
      {isProfileOwner && (
        <Tabs defaultValue='hosted'>
          <TabsList>
            <TabsTrigger
              onClick={() => handleSetFilter('isHost')}
              value='hosted'
            >
              Organizei
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleSetFilter('isGoing')}
              value='going'
            >
              Vou
            </TabsTrigger>
            <TabsTrigger onClick={() => handleSetFilter('Gone')} value='gone'>
              Fui
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <div
        data-orientation='horizontal'
        role='none'
        className='my-6 h-px w-full shrink-0 bg-border'
      />
      <ProfileFeedEventsList query={query} />
    </div>
  );
}
