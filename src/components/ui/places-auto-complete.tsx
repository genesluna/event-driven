import { cn } from '@/app/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, LucideProps, Search } from 'lucide-react';
import {
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import Input from '@/components/ui/input';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from '@/components/ui/popover';
import usePlacesAutocomplete, { RequestOptions } from 'use-places-autocomplete';

type PlacesAutoCompleteProps = InputHTMLAttributes<HTMLInputElement> & {
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
  requestOptions: RequestOptions;
  icon?: ReactElement<LucideProps>;
  label?: string;
  emptyMessage?: string;
  errorMessage?: string;
  placeholder?: string;
};

const PlacesAutoComplete = forwardRef<
  HTMLInputElement,
  PlacesAutoCompleteProps
>(
  (
    {
      selectedValue,
      onSelectedValueChange,
      requestOptions,
      icon = <Search className='h-4 w-4' />,
      label,
      errorMessage,
      emptyMessage = 'No items.',
      placeholder = 'Search...',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const {
      ready: isReady,
      suggestions: { data: items, loading: isLoading },
      value: searchValue,
      setValue: onSearchValueChange,
    } = usePlacesAutocomplete({
      requestOptions: requestOptions,
      debounce: 300,
    });

    const labels = useMemo(
      () =>
        items.reduce(
          (acc, item) => {
            acc[item.description] = item.description;
            return acc;
          },
          {} as Record<string, string>
        ),
      [items]
    );

    const reset = () => {
      onSelectedValueChange('');
      onSearchValueChange('');
    };

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (
        !e.relatedTarget?.hasAttribute('cmdk-list') &&
        labels[selectedValue] !== searchValue
      ) {
        reset();
      }
    };

    const onSelectItem = (inputValue: string) => {
      onSearchValueChange(inputValue);
      if (inputValue === selectedValue) {
        reset();
      } else {
        onSelectedValueChange(inputValue);
        onSearchValueChange(labels[inputValue] ?? '');
      }
      setOpen(false);
    };

    return (
      <div className='flex items-center'>
        <Popover open={open} onOpenChange={setOpen}>
          <Command shouldFilter={false}>
            <PopoverAnchor asChild>
              <CommandPrimitive.Input
                asChild
                value={searchValue || selectedValue}
                onValueChange={onSearchValueChange}
                onKeyDown={(e) => {
                  if (selectedValue && searchValue === '') {
                    onSearchValueChange(selectedValue);
                  }
                  setOpen(e.key !== 'Escape');
                }}
                onMouseDown={() => {
                  if (selectedValue && searchValue === '') {
                    onSearchValueChange(selectedValue);
                  }
                  setOpen(!!searchValue || !!selectedValue);
                }}
                onBlur={onInputBlur}
              >
                <Input
                  ref={ref}
                  icon={icon}
                  label={label}
                  placeholder={placeholder}
                  errorMessage={errorMessage}
                  {...props}
                />
              </CommandPrimitive.Input>
            </PopoverAnchor>
            {!open && <CommandList aria-hidden='true' className='hidden' />}
            <PopoverContent
              asChild
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => {
                if (
                  e.target instanceof Element &&
                  e.target.hasAttribute('cmdk-input')
                ) {
                  e.preventDefault();
                }
              }}
              className='w-[--radix-popover-trigger-width] p-0'
            >
              <CommandList>
                {items.length > 0 && !isLoading && isReady ? (
                  <CommandGroup>
                    {items.map((option) => (
                      <CommandItem
                        key={option.description}
                        value={option.description}
                        onMouseDown={(e) => e.preventDefault()}
                        onSelect={onSelectItem}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedValue === option.description
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.description}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}
                {!isLoading && isReady && !!searchValue && !selectedValue ? (
                  <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
                ) : null}
              </CommandList>
            </PopoverContent>
          </Command>
        </Popover>
      </div>
    );
  }
);

PlacesAutoComplete.displayName = 'PlacesAutoComplete';

export default PlacesAutoComplete;
