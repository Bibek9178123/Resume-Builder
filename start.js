const { spawn } = require('child_process');

// Start backend server
const backend = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  env: { ...process.env }
});

// Start frontend server
const frontend = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5173'], {
  stdio: 'inherit',
  env: { ...process.env }
});

// Handle process cleanup
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('Starting Resume Builder Application...');
console.log('Backend API: http://localhost:3000');
console.log('Frontend: http://localhost:5173');