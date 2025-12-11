// pages/new-meetup/index.js  (form page)
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import GlobalContext from '../store/globalContext';
import { useContext, useEffect, useState } from 'react';

function NewMeetupPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);
  const [authChecked, setAuthChecked] = useState(false);

  const editId = router.query.editId;
  const isEditMode = !!editId;

  // meeting we are editing (if any)
  const meetingToEdit = isEditMode
    ? globalCtx.theGlobalObject.meetings.find((m) => m._id === editId)
    : null;

  // (your simple login check)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      router.push('/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  async function submitHandler(enteredMeetupData) {
    if (isEditMode) {
      // U in CRUD: update
      await globalCtx.updateGlobals({
        cmd: 'updateMeeting',
        newVal: {
          ...enteredMeetupData,
          _id: editId,                           // Mongo id needed for update
          meetingId: meetingToEdit.meetingId,    // keep original meetingId/URL
        },
      });
    } else {
      // C in CRUD: create
      await globalCtx.updateGlobals({
        cmd: 'addMeeting',
        newVal: enteredMeetupData,
      });
    }
    router.push('/');
  }

  if (!authChecked) {
    return <div>Checking login status…</div>;
  }

  return (
    <NewMeetupForm
      onAddMeetup={submitHandler}
      initialData={meetingToEdit}
      isEdit={isEditMode}
    />
  );
}

export default NewMeetupPage;