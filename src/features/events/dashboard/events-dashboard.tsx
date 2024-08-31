import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import { QueryOptions } from '@/app/hooks/firestore/types';
import LoadingSpinner from '@/components/loadind-spinner';
import { useCallback, useEffect, useState } from 'react';
import EventFilters from './components/event-filters';
import EventsList from './components/events-list';
import { actions } from '../event-slice';
import EmptyState from '@/components/empty-state';

export default function EventsDashboard() {
  const dispatch = useAppDispatch();

  const {
    data: events,
    status,
    loadedInitial,
  } = useAppSelector((state) => state.events);
  const { loadCollection, hasMore } = useFireStore('events');
  const [query, setQuery] = useState<QueryOptions[]>([
    { attribute: 'date', operator: '>=', value: new Date() },
  ]);

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

  useEffect(() => {
    loadEvents(true);

    return () => {
      dispatch(actions.reset());
    };
  }, [loadEvents, dispatch]);

  function loadMore() {
    loadEvents();
  }

  return (
    <div className='flex h-full w-full flex-row justify-center gap-10'>
      <section className='flex lg:basis-9/12'>
        {!loadedInitial ? (
          <LoadingSpinner />
        ) : (
          <>
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
          </>
        )}
      </section>
      <aside className='sticky top-[calc(_theme(spacing.16)+_2.5rem)] hidden h-[calc(100vh_-_theme(spacing.64))] w-full basis-0 flex-col lg:flex lg:basis-3/12'>
        <EventFilters setQuery={setQuery} />
      </aside>
    </div>
  );
}
