export default function AddStockModal({ close, refresh }) {
  const [form, setForm] = useState({});

  const save = async () => {
    await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify(form),
    });

    close();
    refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[90%]">

        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Qty" onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input placeholder="Base Price" onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
        <input placeholder="Tax %" onChange={(e) => setForm({ ...form, taxPercent: e.target.value })} />

        <button onClick={save}>SAVE</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}