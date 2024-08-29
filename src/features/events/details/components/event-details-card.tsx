import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Loader2,
  Pencil,
  Map,
  CalendarDays,
  MapPin,
  Building,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import ImageCropperModal from '@/components/image-cropper-modal';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useRef, useState } from 'react';
import { auth, storage } from '@/app/config/firebase';
import { useAppSelector } from '@/app/store/store';
import EventDetailedMap from './event-details-map';
import { extractPlaceName } from '@/app/lib/utils';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AppEvent } from '@/app/types/event';
import Ribbon from '@/components/ui/ribbon';
import Image from '@/components/ui/image';
import { format } from 'date-fns';

type EventCardProps = {
  event: AppEvent;
};

export default function EventDetailsCard({ event }: EventCardProps) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const imageFile = useRef<File | null>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const { update } = useFireStore('events');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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

  async function updateCoverImage(imgBlob: Blob) {
    const storageRef = ref(
      storage,
      `${auth.currentUser?.uid}/event_images/${event.id}/coverImg.webp`
    );

    try {
      toast({
        description: 'Alterando imagem de capa.',
      });

      await uploadBytes(storageRef, imgBlob);
      await getDownloadURL(storageRef).then(async (url) => {
        await update(event.id, {
          coverImgURL: url,
        });
      });
      toast({
        description: 'Imagem de capa alterada com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Algo não saiu como esperado',
        variant: 'destructive',
        description: error.message,
      });
    }
  }

  function handleImageUpdateButtonClick(): void {
    inputFile.current?.click();
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      imageFile.current = file;
      setModalOpen(true);
    }
  }

  function handleCloseModal(): void {
    setModalOpen(false);
    imageFile.current = null;
  }

  return (
    <section>
      {modalOpen && imageFile.current && (
        <ImageCropperModal
          file={imageFile.current}
          minWidth={970}
          minHeight={459}
          aspectRatio={970 / 459}
          updateImage={updateCoverImage}
          closeModal={handleCloseModal}
        />
      )}
      <Card className='h-fit' key={event.id}>
        {event.isCancelled && <Ribbon />}

        <CardHeader className='relative'>
          <div className='relative'>
            {event.hostUid === currentUser?.uid && (
              <Button
                variant={'outline'}
                size='icon'
                className='absolute right-2 top-2 z-10 rounded-full sm:right-4 sm:top-4'
                onClick={() => handleImageUpdateButtonClick()}
              >
                <Pencil className='h-4 w-4' />
                <input
                  ref={inputFile}
                  type='file'
                  accept='image/png, image/webp, image/jpeg,'
                  className='display-none hidden'
                  onChange={handleFileSelect}
                />
              </Button>
            )}
            <Image
              src={
                event.coverImgURL || `/category-images/${event.category}.webp`
              }
              alt='event main image'
              className='rounded-2xl'
            />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className='text-xl font-semibold sm:text-2xl'>{event.title}</h3>
          <p className='mt-4 text-muted-foreground'>{event.description}</p>
          <div className='mt-4 flex flex-col items-start gap-2'>
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
