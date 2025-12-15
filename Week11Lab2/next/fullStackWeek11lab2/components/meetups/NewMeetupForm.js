import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      // if editing, keep the original meetingId; otherwise use the title
      meetingId: props.initialData?.meetingId || enteredTitle,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title (must be unique: it's the meeting ID)</label>
          <input
            type='text'
            required
            id='title'
            ref={titleInputRef}
            defaultValue={props.initialData?.title || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input
            type='url'
            required
            id='image'
            ref={imageInputRef}
            defaultValue={props.initialData?.image || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            required
            id='address'
            ref={addressInputRef}
            defaultValue={props.initialData?.address || ''}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
            defaultValue={props.initialData?.description || ''}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>{props.isEdit ? 'Update Meetup' : 'Add Meetup'}</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;