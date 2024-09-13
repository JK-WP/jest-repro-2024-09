async function didThrowSyntaxError() {
    try {
        // Create a Response object containing text which is not
        // valid JSON, and attempt to parse as JSON, which is
        // expected to throw a SyntaxError
        await (new Response('not-valid-json')).json();
    } catch (e) {
        return e instanceof SyntaxError;
    }
    return false;
}

// Allow invocation directly in node
if (require.main === module) {
    (async () => {
        console.log('didThrowSyntaxError?', await didThrowSyntaxError());
    })();
}

exports.didThrowSyntaxError = didThrowSyntaxError;
