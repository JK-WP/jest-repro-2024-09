const repro = require('./repro.js');

describe('jest bug', () => {
    it('repro1', async () => {
        expect(await repro.didThrowSyntaxError()).toBe(true);
    });

    it('repro2', async () => {
        await expect((new Response('not-valid-json')).json())
            .rejects
            .toEqual(SyntaxError('not-the-real-error-message'));
    });
});
