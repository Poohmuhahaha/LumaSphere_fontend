export async function getData() {
    const res = await fetch("http://127.0.0.1:8000/api/");
    const data = await res.json();
    return data;
  }
  