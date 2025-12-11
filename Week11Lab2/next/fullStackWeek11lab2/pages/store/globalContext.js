
import { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [globals, setGlobals] = useState({
    aString: 'init val',
    count: 0,
    hideHamMenu: true,
    meetings: [],
    dataLoaded: false,
  });

  // Load all meetings once when the app starts
  useEffect(() => {
    getAllMeetings();
  }, []);

  // Helper: read all meetings from our microservice via /api/get-meetings
  async function getAllMeetings() {
    try {
      const response = await fetch('/api/get-meetings', {
        method: 'POST',
        body: JSON.stringify({ meetups: 'all' }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.meetings = data.meetings || [];
        newGlobals.dataLoaded = true;
        return newGlobals;
      });
    } catch (err) {
      console.error('Error loading meetings:', err);
    }
  }

  // Single entry point for all global updates / CRUD operations
  async function editGlobalData(command) {
    // Toggle hamburger menu visibility
    if (command.cmd === 'hideHamMenu') {
      setGlobals((previousGlobals) => {
        const newGlobals = JSON.parse(JSON.stringify(previousGlobals));
        newGlobals.hideHamMenu = command.newVal;
        return newGlobals;
      });
      return;
    }

    // ===== C in CRUD – CREATE meeting =====
    if (command.cmd === 'addMeeting') {
      try {
        const response = await fetch('/api/new-meetup', {
          method: 'POST',
          body: JSON.stringify(command.newVal),
          headers: { 'Content-Type': 'application/json' },
        });

        await response.json(); // { saveMeetingResponse: 'success' } in microservice
        // Re-read from DB so we get the real Mongo _id
        await getAllMeetings();
      } catch (err) {
        console.error('Error adding meeting:', err);
      }
      return;
    }

    // ===== U in CRUD – UPDATE meeting =====
    if (command.cmd === 'updateMeeting') {
      try {
        const response = await fetch('/api/update-meeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(command.newVal), // must include _id
        });

        const data = await response.json();

        if (data.response === 'success') {
          // Refresh list from DB
          await getAllMeetings();
        } else {
          console.error('Update failed:', data);
        }
      } catch (err) {
        console.error('Error updating meeting:', err);
      }
      return;
    }

    // ===== D in CRUD – DELETE meeting =====
    if (command.cmd === 'deleteMeeting') {
      try {
        const response = await fetch('/api/delete-meeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: command.id }), // Mongo _id
        });

        const data = await response.json();

        if (data.response === 'success') {
          // Refresh list from DB
          await getAllMeetings();
        } else {
          console.error('Delete failed:', data);
        }
      } catch (err) {
        console.error('Error deleting meeting:', err);
      }
      return;
    }
  }

  const context = {
    updateGlobals: editGlobalData,
    theGlobalObject: globals,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;