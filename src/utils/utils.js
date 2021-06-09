/**
 * Adds Note to list of Note in localStorage
 * @param {*} title note title
 * @param {*} content body of note
 */
export const addNote = (title, content) => {
	let notesArr = JSON.parse(localStorage.getItem("next:note-app"));

	if (notesArr?.length) {
		const newNote = {
			id: new Date().getTime(),
			title,
			content,
		};

		const newNotesArr = [...notesArr, newNote];

		localStorage.setItem("next:note-app", JSON.stringify(newNotesArr));
	} else {
		const newNote = {
			id: new Date().getTime(),
			title,
			content,
		};

		const newNotesArr = [newNote];

		localStorage.setItem("next:note-app", JSON.stringify(newNotesArr));
	}
};

/**
 * Edit Note Func
 * @param {*} id note id
 * @param {*} title new title
 * @param {*} content new content
 */
export const editNote = (id, title, content) => {
	let notesArr = JSON.parse(localStorage.getItem("next:note-app"));

	let noteIndex = notesArr.findIndex((note) => note.id === id);

	const selectedNote = notesArr[noteIndex];

	const updatedNote = {
		id: selectedNote.id,
		title,
		content,
	};

	notesArr.splice(noteIndex, 1, updatedNote);

	localStorage.setItem("next:note-app", JSON.stringify(notesArr));
};

/**
 * Delete Note Func
 * @param {*} id note id
 */
export const deleteNote = (id) => {
	let notesArr = JSON.parse(localStorage.getItem("next:note-app"));

	let noteIndex = notesArr.findIndex((note) => note.id === id);

	notesArr.splice(noteIndex, 1);

	localStorage.setItem("next:note-app", JSON.stringify(notesArr));
};
