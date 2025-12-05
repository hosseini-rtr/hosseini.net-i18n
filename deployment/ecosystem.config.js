// PM2 ecosystem file for hosseini.net
module.exports = {
  apps: [
    {
      name: "hosseini-net",
      script: "npm",
      args: "start",
      cwd: "/var/www/hosseini.net",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3313,
        // Add your production environment variables here
        // NEXT_PUBLIC_API_URL: 'https://api.example.com',
        // DATABASE_URL: 'file:./data/app.db',
      },
      error_file: "/var/log/pm2/hosseini-net-error.log",
      out_file: "/var/log/pm2/hosseini-net-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
