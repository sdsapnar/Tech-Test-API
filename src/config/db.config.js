const mysql = require('mysql2/promise');

const config = {
    host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
    user: 'candidate',
    password: 'NoTeDeSt^C10.6?SxwY882}',
    database: 'conqtvms_dev',
    port: 3306,
};

const poolPromise = mysql
    .createPool(config)
    .getConnection()
    .then((connection) => {
        console.log('Database connected successfully!');
        connection.release();
        return poolPromise;
    })
    .catch((err) => {
        console.error('Database Connection Failed! Bad Config:', err.message);
    });

module.exports = {
    mysql,
    poolPromise,
};
