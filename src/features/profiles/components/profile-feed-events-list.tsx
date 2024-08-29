import EventsList from '@/features/events/dashboard/components/events-list';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { QueryOptions } from '@/app/hooks/firestore/types';
import LoadingSpinner from '@/components/loadind-spinner';
import { actions } from '@/features/events/event-slice';
import EmptyState from '@/components/empty-state';
import { useCallback, useEffect } from 'react';

type Props = {
  query: QueryOptions[];
};

export default function ProfileFeedEventsList({ query }: Props) {
  const dispatch = useAppDispatch();
  const {
    data: events,
    status,
    loadedInitial,
  } = useAppSelector((state) => state.events);
  const { loadCollection, hasMore } = useFireStore('events');

  const loadEvents = useCallback(
    async (reset?: boolean) => {
      loadCollection(actions, {
        queries: query,
        limit: 2,
        sort: { attribute: 'date', order: 'asc' },
        pagination: true,
        reset,
        get: true,
      });
    },
    [loadCollection, query]
  );

  function loadMore() {
    loadEvents();
  }

  useEffect(() => {
    loadEvents(true);

    return () => {
      dispatch(actions.reset());
    };
  }, [loadEvents, dispatch]);

  return (
    <div>
      {!loadedInitial ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-col'>
          {events.length === 0 ? (
            <EmptyState className='mt-10' />
          ) : (
            <EventsList
              events={events}
              loadMore={loadMore}
              hasMore={hasMore.current}
              loading={status === 'loading'}
            />
          )}
        </div>
      )}
    </div>
  );
}
