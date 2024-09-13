const repro = require('./repro.js');

describe('jest bug', () => {
    it('repro', async () => {
        expect(await repro.didThrowSyntaxError()).toBe(true);
    });
});
