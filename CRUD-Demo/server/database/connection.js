const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })

        console.log(`MongoDb Connect: ${connect.connection.host}`)
    } catch (error) {
        console.log("error==> ", error);
        process.exit(1)
    }

}

module.exports = connectDB