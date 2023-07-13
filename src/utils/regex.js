module.exports = {
    dateLogValidation(date){
        return new RegExp(/(0[1-9]|1[0-9]|2[0-9]|3[0-1])[-](0[1-9]|1[0-2])[-]([0-9]{4})/g).test(date)
    }
}