const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const XLSX = require('xlsx');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;

app.use(express.static('public'));

// Load Excel data
let data = [];
function loadExcel() {
  const workbook = XLSX.readFile('data.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  data = sheet;
  io.emit('dataUpdate', data); // Notify clients
}
loadExcel();

fs.watchFile('data.xlsx', () => {
  console.log("Excel file changed. Reloading...");
  loadExcel();
});

app.get('/data', (req, res) => {
  res.json(data);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('dataUpdate', data);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});