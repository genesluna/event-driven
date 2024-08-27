import { LatLng } from 'use-places-autocomplete';

export type AppEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  coverImgURL?: string;
  hostUid: string;
  hostedBy: string;
  hostPhotoURL: string;
  isCancelled: boolean;
  attendees: Attendee[];
  attendeeIds: string[];
  isHost?: boolean;
  isGoing?: boolean;
  latLng?: LatLng;
};

export type Attendee = {
  id: string;
  displayName: string;
  photoURL: string;
};

export type Comment = {
  id: string;
  displayName: string;
  photoURL: string;
  uid: string;
  text: string;
  date: number;
  parentId: string | null;
  childNodes: Comment[];
};
