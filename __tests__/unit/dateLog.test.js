const date = require('../../src/utils/date');
const regex = require('../../src/utils/regex');

describe('Date Log', () => {
    it('should return the formatted log date', () => {
        expect(regex.dateLogValidation(date.dateLogConvert(new Date()))).toBeTruthy();
    })
});