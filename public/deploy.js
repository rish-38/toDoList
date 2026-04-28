
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
        ++index;
        // greet.innerHTML = `${index}`;
        // remove the defalut paragraph
        document.querySelector('p')?.remove();

        const form = document.createElement('form');
        form.id = `note-${index}`;
        form.className = 'note';
        form.method = 'post';
        form.action = '/';
        form.innerHTML =
            `<input type='text' class="title" placeholder="Untitled" name="title">
             <a name="action" value="delete" class="icon delete"><i class="fa-solid fa-trash"></i></a>
            <!-- <area  class="tasks" placeholder="What you wish to do :>"> -->
             <textarea name="task" class="tasks" placeholder="What you wish to do :>"></textarea>
            <button class="submit" type="submit" name ="action" value="add"><i class="fa-solid fa-check"></i></button>`;
        canvas.appendChild(form);
        console.log('true hai!')
        //make this note drag
        Draggable.create(form, {

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
                if (this.target.closest('input')) {
                    this.endDrag();
                }
            }
        })

    })
}
// Better approach: Delegation
function handleBubbling() {
    const canvas = document.querySelector('.canvas');

    // Listen to clicks on the canvas, but check if they came from inputs/buttons
    canvas.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            e.stopPropagation();
        }
    });
}

addNote();
handleBubbling();