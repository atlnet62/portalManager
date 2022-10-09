const app = require('../app');

test('le port doit etre le 9000', () => {
    expect(app.PORT).toEqual(9000);
})