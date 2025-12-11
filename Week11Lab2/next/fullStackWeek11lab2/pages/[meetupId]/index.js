// pages/[meetupId]/index.js
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import GlobalContext from '../store/globalContext';

export default function MeetupDetailPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);
  const [meeting, setMeeting] = useState(null);

  const meetupIdFromUrl = router.query.meetupId; // value from [meetupId] in the URL

  // Find the matching meeting in global state
  useEffect(() => {
    if (!meetupIdFromUrl || globalCtx.theGlobalObject.meetings.length === 0) return;

    const found = globalCtx.theGlobalObject.meetings.find((m) =>
      m.meetingId && m.meetingId.trim() === String(meetupIdFromUrl).trim()
    );

    if (found) {
      setMeeting(found);
    }
  }, [meetupIdFromUrl, globalCtx.theGlobalObject.meetings]);

  function editHandler() {
    if (!meeting) return;
    // go to the same form, but in "edit" mode
    router.push(`/new-meetup?editId=${meeting._id}`);
  }

  async function deleteHandler() {
    if (!meeting) return;
    if (!confirm(`Delete "${meeting.title}"?`)) return;

    await globalCtx.updateGlobals({
      cmd: 'deleteMeeting',
      id: meeting._id,       // Mongo _id for delete
    });

    router.push('/');        // back to list after delete
  }

  if (!meeting) {
    return <p>Loading meetup…</p>;
  }

  return (
    <>
      <MeetupDetail
        image={meeting.image}
        title={meeting.title}
        address={meeting.address}
        description={meeting.description}
      />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={editHandler} style={{ marginRight: '0.5rem' }}>
          Edit
        </button>
        <button onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </>
  );
}