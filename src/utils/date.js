module.exports = {
    dateLogConvert(date){
        return new Intl.DateTimeFormat("pt-br").format(date).replace(/\//g, '-')
    }
};