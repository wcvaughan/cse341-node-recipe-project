const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Recipe Project",
        description: "Recipe Project"
    },
    host: "localhost:8080",
    schemes: ["http", "https"]
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);