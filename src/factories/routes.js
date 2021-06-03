export default (server) => {
  server.get('/', (req, res) => res.send('Hello World'));
};
