const User = require('../models/user');

class TestFunctions {
    async testFunction() {
        console.log("TestFunctions:testFunction ");
        try {
            return {success:true};
        } catch (error) {
            console.log("TestFunctions:testFunction: Catch block");
            console.log(error);
            return {success:false, error: "Internal Server Error. Please contact Help Center in Discord."};
        }
    }
}

module.exports = TestFunctions;
