import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { onChildAdded, ref, remove, onChildRemoved } from 'firebase/database';
import { Button } from '@/components/ui/button';
import { AppEvent, Comment } from '@/app/types/event';
import { getInitials } from '@/app/lib/utils';
import { MessageCircle, Reply, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import CommentsForm from './comments-form';
import { auth, fb } from '@/app/config/firebase';
import { formatDistance } from 'date-fns';

type Props = {
  event: AppEvent;
};

export default function Comments({ event }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  });

  useEffect(() => {
    const commentRef = ref(fb, `comments/${event.id}`);
    const unsubscribeChieldAdded = onChildAdded(commentRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prevState) => [...prevState, comment]);
    });

    const unsubscribeChieldRemoved = onChildRemoved(commentRef, (data) => {
      const comment = { ...data.val(), id: data.key };
      setComments((prevState) =>
        prevState.filter((item) => item.id !== comment.id)
      );
    });

    return () => {
      unsubscribeChieldAdded();
      unsubscribeChieldRemoved();
    };
  }, [event.id]);

  function createCommentTree(data: Comment[]) {
    const table = Object.create(null);
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));
    const dataTree: Comment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      else dataTree.push(table[item.id]);
    });
    return dataTree;
  }

  async function handleRemoveComment(id: string) {
    const commentToRemove = comments.filter((comment) => comment.id === id);
    console.log(commentToRemove);

    try {
      if (!commentToRemove[0].parentId) {
        const childremToRemove = comments.filter(
          (comment) => comment.parentId === commentToRemove[0].id
        );

        if (childremToRemove.length > 0) {
          childremToRemove.forEach(async (comment) => {
            const commentRef = ref(fb, `comments/${event.id}/${comment.id}`);
            await remove(commentRef);
          });
        }
      }

      const commentRef = ref(
        fb,
        `comments/${event.id}/${commentToRemove[0].id}`
      );
      await remove(commentRef);
    } catch (error: any) {
      console.log(error);
    }
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
        <CommentsForm eventId={event.id} />
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
                    <Reply className='mr-2 h-3 w-3' />
                    Responder
                  </Button>
                  {(event.hostUid === auth.currentUser?.uid ||
                    comment.uid === auth.currentUser?.uid) && (
                    <Button
                      size={'sm'}
                      variant={'link'}
                      className='-ms-3 -mt-2 text-sm font-normal'
                      onClick={() => {
                        handleRemoveComment(comment.id);
                      }}
                    >
                      <Trash className='mr-2 h-3 w-3' />
                      Apagar
                    </Button>
                  )}

                  {replyForm.open && replyForm.commentId === comment.id && (
                    <CommentsForm
                      key={comment.id}
                      eventId={event.id}
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
                          <Reply className='mr-2 h-3 w-3' />
                          Responder
                        </Button>

                        {(event.hostUid === auth.currentUser?.uid ||
                          child.uid === auth.currentUser?.uid) && (
                          <Button
                            size={'sm'}
                            variant={'link'}
                            className='-ms-3 -mt-2 text-sm font-normal'
                            onClick={() => {
                              handleRemoveComment(child.id);
                            }}
                          >
                            <Trash className='mr-2 h-3 w-3' />
                            Apagar
                          </Button>
                        )}

                        {replyForm.open && replyForm.commentId === child.id && (
                          <CommentsForm
                            key={comment.id}
                            eventId={event.id}
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
