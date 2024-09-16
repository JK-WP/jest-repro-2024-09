const repro = require('./repro.js');

describe('jest bug', () => {
    it('repro1', async () => {
        expect(await repro.didThrowSyntaxError()).toBe(true);
    });

    it('repro2', async () => {
        await expect((new Response('not-valid-json')).json())
            .rejects
            .toEqual(SyntaxError('Unexpected token o in JSON at position 1'));
    });
});
