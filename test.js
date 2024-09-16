const repro = require('./repro.js');

describe('jest bug', () => {
    it('should pass', async () => {
        expect(await repro.didThrowSyntaxError()).toBe(true);
    });

    it('should fail', async () => {
        await expect((new Response('not-valid-json')).json())
            .rejects
            .toEqual(SyntaxError('not-the-real-error-message'));
    });
});
