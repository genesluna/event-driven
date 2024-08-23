import { Status, Wrapper } from '@googlemaps/react-wrapper';
import LoadingSpinner from '@/components/loadind-spinner';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function MapsWrapper({ children }: Props) {
  const render = (status: Status) => {
    if (status === Status.FAILURE) return <h2>Erro carregando mapa</h2>;
    return <LoadingSpinner visible={false} />;
  };

  return (
    <Wrapper
      apiKey={import.meta.env.VITE_FIREBASE_API_KEY}
      libraries={['places']}
      render={render}
    >
      {children}
    </Wrapper>
  );
}
