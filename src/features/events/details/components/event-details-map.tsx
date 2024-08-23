import { LatLng } from 'use-places-autocomplete';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

type Props = {
  latLng: LatLng;
};

export default function EventDetailedMap({ latLng }: Props) {
  const containerStyle = {
    width: '100%',
    height: '300px',
  };

  return (
    <section>
      <GoogleMap mapContainerStyle={containerStyle} center={latLng} zoom={14}>
        <MarkerF position={latLng}>
          <MapPin className='text-red-600' />
        </MarkerF>
      </GoogleMap>
    </section>
  );
}
