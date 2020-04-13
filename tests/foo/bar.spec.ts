import { bar } from 'foo/bar';

describe('bar', () => {
    /////////////////////////////////////////////////
    //make sure you have this block in each test file
    beforeEach(() => {
        expect.hasAssertions();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    //end of block
    /////////////////////////////////////////////////

    test('throws error if passed value is not a string', () => {
        try {
            bar(null);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

    test('it returns the passed value', () => {
        const myValue: string = 'someValue';
        expect(bar(myValue)).toBe(myValue);
    });
});
