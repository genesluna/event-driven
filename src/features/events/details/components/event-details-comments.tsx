import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import EventDetailsCommentsForm from './event-details-comments-form';
import { useEffect, useState } from 'react';
import { ChatComment } from '@/app/types/event';
import { onChildAdded, ref } from 'firebase/database';
import { fb } from '@/app/config/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/app/lib/utils';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';

type Props = {
  eventId: string;
};

export default function EventDetailsComments({ eventId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });

  useEffect(() => {
    const chatRef = ref(fb, `comments/${eventId}`);
    const unsubscribe = onChildAdded(chatRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prevState) => [...prevState, comment]);
    });

    return () => unsubscribe();
  }, [eventId]);

  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      else dataTree.push(table[item.id]);
    });
    return dataTree;
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex gap-2'>
          <MessageCircle className='h-6 w-6' />
          <h3 className='font-semibold'>Comentários</h3>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-8'>
        <EventDetailsCommentsForm eventId={eventId} />
        <section className='flex max-h-[50vh] flex-col gap-4 overflow-y-auto'>
          {createCommentTree(comments)
            .reverse()
            .map((comment) => (
              <div key={comment.id} className='flex flex-row gap-2'>
                <Avatar>
                  <AvatarImage
                    src={comment.photoURL}
                    alt={comment.displayName || 'User'}
                  />
                  <AvatarFallback>
                    {getInitials(comment.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className='w-full'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium'>
                      {comment.displayName}
                    </span>
                    <span className='text-xs text-muted-foreground'>
                      {formatDistance(comment.date, new Date())}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {comment.text}
                  </p>
                  <Button
                    size={'sm'}
                    variant={'link'}
                    className='-ms-3 -mt-2 text-sm font-normal'
                    onClick={() =>
                      setReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Responder
                  </Button>
                  {replyForm.open && replyForm.commentId === comment.id && (
                    <EventDetailsCommentsForm
                      key={comment.id}
                      eventId={eventId}
                      parentId={comment.id}
                      setReplyForm={setReplyForm}
                    />
                  )}

                  {comment.childNodes.map((child) => (
                    <div key={child.id} className='mt-2 flex flex-row gap-2'>
                      <Avatar>
                        <AvatarImage
                          src={child.photoURL}
                          alt={child.displayName || 'User'}
                        />
                        <AvatarFallback>
                          {getInitials(child.displayName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='w-full'>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm font-medium'>
                            {child.displayName}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            {formatDistance(child.date, new Date())}
                          </span>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {child.text}
                        </p>
                        <Button
                          size={'sm'}
                          variant={'link'}
                          className='-ms-3 -mt-2 text-sm font-normal'
                          onClick={() =>
                            setReplyForm({ open: true, commentId: child.id })
                          }
                        >
                          Responder
                        </Button>
                        {replyForm.open && replyForm.commentId === child.id && (
                          <EventDetailsCommentsForm
                            key={comment.id}
                            eventId={eventId}
                            parentId={child.parentId}
                            setReplyForm={setReplyForm}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </section>
      </CardContent>
    </Card>
  );
}
