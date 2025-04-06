
document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  const res = await fetch("/upload", {
    method: "POST",
    body: formData
  });
  if (res.ok) {
    alert("File uploaded!");
    location.reload();
  } else {
    alert("Upload failed.");
  }
});

async function fetchFiles() {
  const res = await fetch("/files");
  const files = await res.json();
  const list = document.getElementById("fileList");
  list.innerHTML = "";
  files.forEach(file => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${file}
      <a href="/download/${file}" target="_blank">Download</a>
      <button onclick="deleteFile('${file}')">Delete</button>
    `;
    list.appendChild(div);
  });
}

async function deleteFile(file) {
  const res = await fetch("/delete/" + file, { method: "DELETE" });
  if (res.ok) {
    alert("File deleted!");
    location.reload();
  } else {
    alert("Delete failed.");
  }
}

fetchFiles();
