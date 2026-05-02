
gsap.registerPlugin(Draggable);

Draggable.create('.canvas', {

    type: 'x,y',
    dragClickables: true,
    cursor: "default",
    activeCursor: "grabbing",
    zIndexBoost: false,
    allowContextMenu: true
})

//Add new note each time and note draggable will giving increasing tag;

function addNote() {
    const canvas = document.querySelector('.canvas');
    const greet = document.querySelector('.greet');
    const addBtn = document.querySelector('.add');
    let index = 0;

    addBtn.addEventListener('click', () => {
        // remove the defalut paragraph
        document.querySelector('p')?.remove();

        const form = document.createElement('form');
        form.className = 'note';
        form.method = 'post';
        form.action = '/save';
        form.innerHTML =
            `<input type='text' class="title" placeholder="Untitled" name="title">
             <a name="action" value="delete" class="icon delete"><i class="fa-solid fa-trash"></i></a>
             <textarea name="task" class="tasks" placeholder="What you wish to do :>"></textarea>
            <button class="submit" type="submit" name ="action" value="add"><i class="fa-solid fa-check"></i></button>`;
        canvas.appendChild(form);
        gsap.fromTo(form, 
             { opacity: 0, scale: 0.5 }, 
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        console.log('true hai!');

        // setFormSubmit(form);
        makeNoteDrag(form);
    })
}
// remove form and animation on delete function 
function removeNote() {
    const canvas = document.querySelector('.canvas');
    canvas.addEventListener('submit', (e) => {
        // Check if the submit event came from a delete button
        if (e.submitter && e.submitter.classList.contains('delete')) {
            const note = e.target;
            
            // Prevent immediate submission to play animation
            e.preventDefault(); 

            gsap.to(note, {
                opacity: 0,
                scale: 0.6,
                duration: 0.2,
                onComplete: () => {
                    // Manually trigger the submit now that animation is done
                    note.submit(); 
                }
            });
        }
    });
}




// Better approach: Delegation
function handleBubbling() {
    const canvas = document.querySelector('.canvas');

    // Listen to clicks on the canvas, but check if they came from inputs/buttons
    canvas.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'FORM' || e.target.closest('form')) {
            e.stopPropagation();
        }
    });
}

// // mordern way to create submit 
// function setFormSubmit(notes) {
//     // const form = document.querySelector('');
//     notes.addEventListener('submit', async (e) => {
//         // e.preventDefault();

//         const formData = new FormData(notes);
//         // Add the position data to the "handful" of data
//         // If they haven't dragged yet, default to 0
//         formData.append('x_pos', notes.dataset.x || 0);
//         formData.append('y_pos', notes.dataset.y || 0);

//         try {
//             const response = await fetch('/', {
//                 method: 'POST',
//                 body: formData
//             });
//             if (response.ok) {
//                 console.log("Saved to database successfully!");
//                 //sucess animation
//                 gsap.to(notes, { boxShadow: "0 0 15px #00ff00", duration: 0.3, yoyo: true, repeat: 1 });
//             }
//         } catch (err) {
//             console.error("save failed :(", err);
//         }
//     })
// }

function makeNoteDrag(notes) {
    Draggable.create(notes, {

        // type: 'x,y',
        bounds: '.canvas',
        dragClickables: false,
        cursor: "default",
        activeCursor: "grabbing",
        allowContextMenu: true,
        onPress: function (e) {
            // Prevent the canvas from dragging when clicking on the note
            e.stopPropagation();
        },
        onMove: function () {
            if (this.target.closest('input') || this.target.closest('textarea')) {
                this.endDrag();
            }
        },
        onDragEnd: function () {
            //save position of notes in memory
            notes.dataset.x = this.x;
            notes.dataset.y = this.y;
        }
    })
}
// Find all notes that were already rendered by EJS/Server
const existingNotes = document.querySelectorAll('.note');
existingNotes.forEach(note => {
    makeNoteDrag(note);
    // setFormSubmit(note);
});
removeNote();
addNote();
handleBubbling();