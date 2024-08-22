import { useFireStore } from '@/app/hooks/firestore/use-firestore';
import { useToast } from '@/app/hooks/use-toast';
import { useAppSelector } from '@/app/store/store';
import { AppEvent } from '@/app/types/event';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { arrayUnion, Timestamp } from 'firebase/firestore';
import {
  Building,
  CalendarIcon,
  Loader2,
  MapPin,
  Save,
  Type,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { date, string, z } from 'zod';
import { actions } from '../event-slice';
import { getGeocode, getLatLng, LatLng } from 'use-places-autocomplete';
import { categoryOptions } from './category-options';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addTimeToDate, cn, formatTime } from '@/app/lib/utils';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { timeOptions } from './time-options';
import LoadingSpinner from '@/components/loadind-spinner';
import PlacesAutoComplete from '@/components/ui/places-auto-complete';

const eventSchema = z.object({
  title: string({ required_error: 'O título é obrigatório' }).min(
    6,
    'O título deve ter pelo menos 6 caracteres'
  ),
  category: string({ required_error: 'A categoria é obrigatória' }),
  description: string({ required_error: 'A descrição é obrigatória' }).min(
    30,
    'Descrição deve ter pelo menos 30 caracteres'
  ),
  city: string()
    .min(1, 'A cidade é obrigatória')
    .min(3, 'A cidade deve ter pelo menos 3 caracteres'),
  venue: string({ required_error: 'O local é obrigatório' })
    .min(1, 'O local é obrigatório')
    .min(3, 'A local deve ter pelo menos 5 caracteres'),
  date: date({ required_error: 'A data é obrigatória' }),
  time: string({ required_error: 'O horário é obrigatório' }),
  latLng: z.any().default(undefined),
});

export default function EventForm() {
  const { loadDocument, create, update } = useFireStore('events');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const event = useAppSelector((state) =>
    state.events.data.find((e) => e.id === id)
  );
  type EventData = z.infer<typeof eventSchema>;
  const form = useForm<EventData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(eventSchema),
    defaultValues: async () => {
      if (event)
        return {
          ...event,
          date: new Date(event.date),
        };

      return {} as EventData;
    },
  });

  const { status } = useAppSelector((state) => state.events);
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  useEffect(() => {
    // These fields don't trigger onChange when we load an event.
    // Therefore, we need to set them manually
    if (!event) return;
    form.setValue('category', event.category);
    form.setValue('time', formatTime(new Date(event.date)));
    form.setValue('date', new Date(event.date));
    form.setValue('city', event.city, { shouldValidate: true });
    form.setValue('venue', event.venue, { shouldValidate: true });
  }, [event, form]);

  async function updateEvent(data: AppEvent) {
    if (!event) return;
    await update(data.id, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
    });
  }

  async function createEvent(data: EventData) {
    if (!currentUser) return;
    const ref = await create({
      ...data,
      hostUid: currentUser.uid,
      hostedBy: currentUser.displayName,
      hostPhotoURL: currentUser.photoURL,
      attendees: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      attendeeIds: arrayUnion(currentUser.uid),
      date: Timestamp.fromDate(data.date),
    });
    return ref;
  }

  async function handleCancelToggle(event: AppEvent) {
    await update(event.id, {
      isCancelled: !event.isCancelled,
    });
    toast({
      description: `O evento foi ${event.isCancelled ? 'reativado' : 'cancelado'}`,
    });
  }

  async function onSubmit(data: EventData) {
    const dateWithTime = addTimeToDate(data.date, data.time!);
    data.date = dateWithTime;

    try {
      if (event) {
        await updateEvent({
          ...event,
          ...{ ...data, date: data.date.toISOString() },
        });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref?.id}`);
      }
    } catch (error: any) {
      toast({
        title: 'Algo deu errado. Tente novamente mais tarde.',
        description: error.message,
        variant: 'destructive',
      });
    }
  }

  async function handlePlaceSelect(value: string, field: 'city' | 'venue') {
    form.setValue(field, value, { shouldValidate: true });
    await handleGeoCode(value);
  }

  async function handleGeoCode(address: string) {
    if (!address) return;

    const results = await getGeocode({ address: address });
    const latlng = getLatLng(results[0]);
    form.setValue('latLng', latlng);
  }

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div className='flex flex-col items-center justify-center'>
      <Form {...form}>
        <form
          className='grid w-full max-w-sm gap-4 rounded-lg bg-card p-8 sm:max-w-md lg:max-w-lg xl:max-w-xl'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input type='hidden' {...form.register('latLng')} />
          <div className='grid gap-2'>
            <Input
              label='Título'
              defaultValue={event?.title}
              placeholder='Título do evento'
              icon={<Type className='h-4 w-4 text-muted-foreground' />}
              errorMessage={form.formState.errors?.title?.message}
              {...form.register('title')}
            />
          </div>

          <div className='grid gap-2'>
            <PlacesAutoComplete
              label='Cidade'
              placeholder='Cidade'
              emptyMessage='Nenhuma cidade encontrada'
              selectedValue={form.getValues().city}
              onSelectedValueChange={(value) =>
                handlePlaceSelect(value, 'city')
              }
              icon={<MapPin className='h-4 w-4 text-muted-foreground' />}
              requestOptions={{
                types: ['(cities)'],
              }}
              errorMessage={form.formState.errors?.city?.message}
              {...form.register('city').ref}
            />
          </div>

          <div className='grid gap-2'>
            <PlacesAutoComplete
              label='Local'
              placeholder='Local'
              disabled={!form.getValues().city && !form.getValues().latLng}
              emptyMessage='Nenhum local encontrado'
              selectedValue={form.getValues().venue}
              onSelectedValueChange={(value) =>
                handlePlaceSelect(value, 'venue')
              }
              icon={<Building className='h-4 w-4 text-muted-foreground' />}
              requestOptions={{
                types: ['establishment'],
                locationBias: new google.maps.Circle({
                  radius: 25000,
                  center: new google.maps.LatLng(
                    form.getValues().latLng as LatLng
                  ),
                }),
              }}
              errorMessage={form.formState.errors?.venue?.message}
              {...form.register('venue').ref}
            />
          </div>

          <div className='flex-row gap-4 lg:flex'>
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col'>
                  <FormLabel>Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            'w-full pl-3 text-left font-normal hover:bg-background',
                            {
                              'border-red-500 dark:border-red-400':
                                form.formState.errors?.date,
                              'hover:border-primary focus:border-primary dark:hover:border-primary':
                                !form.formState.errors?.date,
                            }
                          )}
                          variant={'outline'}
                        >
                          {field.value ? (
                            <span className='text-muted-foreground'>
                              {format(field.value, 'PPP')}
                            </span>
                          ) : (
                            <span className='text-muted-foreground'>
                              Escolha uma data
                            </span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='time'
              render={({ field }) => (
                <FormItem className='mt-4 flex w-full flex-col lg:mt-0'>
                  <FormLabel>Hora</FormLabel>
                  <Select
                    name='time'
                    onValueChange={field.onChange}
                    defaultValue={event?.time}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn({
                          'border-red-500 dark:border-red-400':
                            form.formState.errors?.time,
                          'hover:border-primary focus:border-primary dark:hover:border-primary':
                            !form.formState.errors?.time,
                        })}
                      >
                        <SelectValue placeholder='Selecione o horário' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time.text} value={time.value}>
                          {time.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  name='category'
                  onValueChange={field.onChange}
                  defaultValue={event?.category}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn({
                        'border-red-500 dark:border-red-400':
                          form.formState.errors?.category,
                        'hover:border-primary focus:border-primary dark:hover:border-primary':
                          !form.formState.errors?.category,
                      })}
                    >
                      <SelectValue placeholder='Selecione uma categoria' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.text} value={category.value}>
                        {category.text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                defaultValue={event?.description}
                placeholder='Descrição do evento'
                errorMessage={form.formState.errors?.description?.message}
                {...form.register('description')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className='flex justify-end gap-4'>
            {event && (
              <Button
                type='button'
                variant={event.isCancelled ? 'outline' : 'destructive'}
                color={event.isCancelled ? 'green' : 'red'}
                onClick={() => handleCancelToggle(event)}
              >
                {event.isCancelled ? 'Reativar evento' : 'Cancelar evento'}
              </Button>
            )}
            <Button
              type='submit'
              variant={'secondary'}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Save className='mr-2 h-4 w-4' />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
