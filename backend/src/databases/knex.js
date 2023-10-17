module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'blog_react_node'
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        },
        useNullAsDefault: true
    },
    runMigrate:{
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'blog_react_node'
        },
        migrations: {
            directory: './src/databases/migrations'
        },
        seeds: {
            directory: './src/databases/seeds'
        },
        useNullAsDefault: true
    }
};

