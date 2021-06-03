export default (server) => {
  console.log('SETUP - Servers starting');
  const port = process.env.APP_PORT;
  server.listen(port);
  console.log('SETUP - Servers started');
  console.log(`HTTP Running at: http://localhost:${port}`);
};
