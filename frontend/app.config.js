import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    // 😝😝😝
    API_ADDRESS: process.env.API_ADDRESS,
  }
});
