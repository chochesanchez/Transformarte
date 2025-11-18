"use client";
export default function AdminDelete({ href, label }: { href: string; label: string }){
  const onClick = async () => {
    await fetch(href, { method: 'DELETE' });
    window.location.reload();
  };
  return <button onClick={onClick} className="bg-red-600 text-white text-sm px-3 py-1 rounded">{label}</button>;
}


