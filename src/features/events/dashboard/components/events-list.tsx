import InfiniteScroll from 'react-infinite-scroller';
import { AppEvent } from '@/app/types/event';
import EventCard from './event-card';

type Props = {
  events: AppEvent[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
};

export default function EventsList({
  events,
  hasMore,
  loadMore,
  loading,
}: Props) {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          className='mb-10 flex flex-col gap-4 md:gap-10'
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          initialLoad={false}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
