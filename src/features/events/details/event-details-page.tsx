import { useParams } from 'react-router-dom';

export default function EventDetailPage() {
  const { id } = useParams();
  return (
    <div>
      EventDetailPage id:
      <a href={`/events/manage/${id}`}>{id}</a>
    </div>
  );
}
