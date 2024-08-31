import { useRef, useState, useCallback } from 'react';
import { QueryOptions } from '@/app/hooks/firestore/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryOptions } from '../../form/category-options';
import { Label } from '@/components/ui/label';
import PlacesAutoComplete from '@/components/ui/places-auto-complete';
import { Filter, MapPin } from 'lucide-react';

type Props = {
  setQuery: (query: QueryOptions[]) => void;
};

export default function EventFilters({ setQuery }: Props) {
  const startDate = useRef(new Date());
  const [filters, setFilters] = useState<{ category?: string; city?: string }>({
    category: 'all',
    city: '',
  });

  const handleSetFilter = useCallback(
    (filter: 'category' | 'city' | 'date', value?: string) => {
      setFilters((prevFilters) => {
        const updatedFilters: { category?: string; city?: string } = {
          ...prevFilters,
          [filter]: value,
        };

        const q: QueryOptions[] = [];

        if (updatedFilters.category && updatedFilters.category !== 'all') {
          q.push({
            attribute: 'category',
            operator: '==',
            value: updatedFilters.category,
          });
        }

        if (updatedFilters.city) {
          q.push({
            attribute: 'city',
            operator: '==',
            value: updatedFilters.city,
          });
        }

        q.push({ attribute: 'date', operator: '>=', value: startDate.current });

        setQuery(q);

        return updatedFilters;
      });
    },
    [setQuery]
  );

  return (
    <section className='flex w-full justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <div className='flex flex-row items-center gap-2'>
            <Filter className='h-4 w-4' />
            <h3 className='text-xl font-semibold'>Filtros</h3>
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <Label className='mb-2 ms-1'>Data</Label>
            <Calendar
              mode='single'
              selected={startDate.current}
              onSelect={(date) => {
                startDate.current = date as Date;
                handleSetFilter('date');
              }}
              className='flex justify-center rounded-md border'
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className='flex flex-col'>
            <Label className='mb-2 ms-1'>Categoria</Label>
            <Select
              defaultValue={filters.category || 'all'}
              onValueChange={(value) => handleSetFilter('category', value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Selecione uma cateroria' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[{ text: 'Todas', value: 'all' }, ...categoryOptions].map(
                    (option) => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.text}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <PlacesAutoComplete
            selectedValue={filters.city || ''}
            label='Cidade'
            placeholder='Digite o nome da cidade'
            emptyMessage='Nenhuma cidade encontrada'
            onSelectedValueChange={(value) => {
              if (value !== filters.city) handleSetFilter('city', value);
            }}
            icon={<MapPin className='h-4 w-4 text-muted-foreground' />}
            requestOptions={{
              types: ['(cities)'],
            }}
          />
        </CardContent>
      </Card>
    </section>
  );
}
