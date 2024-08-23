import EventDetailsSideBar from './components/event-details-sidebar';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import EventDetailsCard from './components/event-details-card';
import LoadingSpinner from '@/components/loadind-spinner';
import { useAppSelector } from '@/app/store/store';
import { useParams } from 'react-router-dom';
import { actions } from '../event-slice';
import { useEffect } from 'react';
import EventDetailsComments from './components/event-details-comments';

export default function EventDetailPage() {
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.events);
  const { loadDocument } = useFireStore('events');

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === 'loading') return <LoadingSpinner />;

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className='flex flex-row gap-10'>
      <section className='mb-10 flex basis-8/12 flex-col gap-4'>
        <EventDetailsCard event={event} />
        <EventDetailsComments eventId={event.id} />
      </section>
      <aside className='sticky top-[calc(_theme(spacing.16)+_2.5rem)] h-[calc(100vh_-_theme(spacing.64))] w-full basis-4/12 flex-col'>
        <EventDetailsSideBar event={event} />
      </aside>
    </div>
  );
}
