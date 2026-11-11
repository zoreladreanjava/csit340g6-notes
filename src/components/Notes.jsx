import { useState } from "react";
import NoteCard from "./NoteCard.jsx";

function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Review map and filter",
      body: "Redo the TodoMVC steps without looking at the guide.",
    },
    {
      id: 2,
      title: "Prepare for the quiz",
      body: "Practice writing one handler for many inputs.",
    },
  ]);
  const [form, setForm] = useState({ title: "", body: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    const body = form.body.trim();
    if (title === "" || body === "") return;
    const newNote = { id: crypto.randomUUID(), title, body };
    setNotes([...notes, newNote]);
    setForm({ title: "", body: "" });
  }

  function handleDelete(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }
  return (
    <div className="grid min-h-screen grid-cols-[420px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col gap-5 bg-white px-8 py-9 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <h1 className="text-[72px] leading-none font-extralight text-[#b83f45]">
          notes
        </h1>
        <div>
          <p className="mb-2 text-[13px] font-normal tracking-wide text-[#949494]">
            SEARCH
          </p>
          <input
            placeholder="Search by title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <p className="text-[13px] font-normal tracking-wide text-[#949494]">
            NEW NOTE
          </p>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Write your note"
            className="h-[120px] w-full resize-none py-3 border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <button
            type="submit"
            className="h-[50px] cursor-pointer bg-[#b83f45] text-[17px] font-normal text-white hover:bg-[#a33439]"
          >
            Add note
          </button>
        </form>
      </aside>
      <section className="px-12 py-11">
        <h2 className="mb-6 text-3xl">All notes</h2>

        <ul className="grid grid-cols-3 items-start gap-5">
          {notes.map((note) => (
            <li
              key={note.id}
              className="relative min-h-32 bg-white px-6 py-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]"
            >
              <NoteCard title={note.title} body={note.body} />
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                className="absolute top-4 right-5 cursor-pointer text-[26px] leading-none text-[#949494] hover:text-[#c18585]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Notes;
