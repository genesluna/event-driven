import { Building, CalendarDays, ContactRound, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function EventCard() {
  return (
    <Card>
      <CardHeader>
        <img
          src='/src/assets/category-images/gastronomico.webp'
          alt='event main image'
          className='h-full w-full rounded-2xl object-cover'
        />
      </CardHeader>
      <CardContent>
        <h3 className='text-2xl font-semibold'>Event Title</h3>
        <p className='mt-4 text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur
          ipsum doloremque animi sit, placeat sapiente recusandae cupiditate
          eaque velit inventore optio pariatur et provident obcaecati dolore
          aperiam officia? Facere. Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
        <div className='mt-4 flex items-start gap-2'>
          <div className='flex items-center gap-2'>
            <ContactRound className='h-4 w-4 text-primary' />
            <span className='whitespace-nowrap text-muted-foreground'>
              Genes Luna
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-thin text-muted-foreground'>|</span>
            <CalendarDays className='h-4 w-4 text-primary' />
            <span className='whitespace-nowrap text-muted-foreground'>
              21/08/2024
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-thin text-muted-foreground'>|</span>
            <MapPin className='h-4 w-4 text-primary' />
            <span className='whitespace-nowrap text-muted-foreground'>
              Maceió, AL
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-thin text-muted-foreground'>|</span>
            <Building className='h-4 w-4 text-primary' />
            <span className='whitespace-nowrap text-muted-foreground'>
              Shopping Maceió
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button variant='secondary'>Participar</Button>
        <Button variant='outline'>Detalhes</Button>
      </CardFooter>
    </Card>
  );
}
