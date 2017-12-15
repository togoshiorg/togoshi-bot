
import assert from 'assert';
import proxyquire from 'proxyquire';
import firebasemock from 'firebase-mock';
import sinon from 'sinon';

const mockdatabase = new firebasemock.MockFirebase();
const mockauth = new firebasemock.MockFirebase();
const mocksdk = firebasemock.MockFirebaseSdk((path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
}, () => {
    return mockauth;
});
const Firebase = proxyquire('../../src/pokemon/firebase', {
    firebase: mocksdk
}).default;

mockdatabase.child('getlist').push({ id: 1, user: 'foo-user1', time: '2017-01-01T12:34:56+00:00', cp: 100, isShiny: false });
mockdatabase.child('getlist').push({ id: 2, user: 'foo-user2', time: '2017-01-02T12:34:56+00:00', cp: 200, isShiny: false });
mockdatabase.child('getlist').push({ id: 3, user: 'foo-user3', time: '2017-01-03T12:34:56+00:00', cp: 300, isShiny: false });
mockdatabase.child('getlist').push({ id: 4, user: 'foo-user4', time: '2017-01-04T12:34:56+00:00', cp: 400, isShiny: true });
mockdatabase.child('getlist').push({ id: 5, user: 'foo-user5', time: '2017-01-05T12:34:56+00:00', cp: 500, isShiny: true });
mockdatabase.flush();
mockdatabase.autoFlush();
// orderByChildがfirebase-mockだと機能しない仕様のためsinonで差し替え
sinon.stub(mockdatabase.child('getlist'), 'orderByChild').callsFake((key) => {
    return {
        equalTo: (value) => {
            return {
                once: () => {
                    return Promise.resolve({
                        numChildren: function () {
                            const result = [];
                            for (let path in mockdatabase.child('getlist').children) {
                                if (mockdatabase.child('getlist').child(path).data[key] === value) {
                                    result.push(mockdatabase.child('getlist').child(path).data);
                                }
                            }
                            return result.length;
                        }
                    });
                }
            };
        },
        startAt: (value) => {
            return {
                once: () => {
                    return Promise.resolve({
                        numChildren: function () {
                            const result = [];
                            for (let path in mockdatabase.child('getlist').children) {
                                if (mockdatabase.child('getlist').child(path).data[key] >= value) {
                                    result.push(mockdatabase.child('getlist').child(path).data);
                                }
                            }
                            return result.length;
                        }
                    });
                }
            };
        }
    };
});

describe('pokemon/firebase.js', () => {
    it('getLength()メソッドを呼ぶと正しく処理する', async () => {
        const firebase = new Firebase();
        const length = await firebase.getLength();
        assert.equal(length, 5);
    });

    it('getLengthEqualTo()メソッドを呼ぶと正しく処理する', async () => {
        const firebase = new Firebase();
        const idLength = await firebase.getLengthEqualTo('id', 1);
        const userLength = await firebase.getLengthEqualTo('user', 'foo-user2');
        const shinyLength = await firebase.getLengthEqualTo('isShiny', true);
        assert.equal(idLength, 1);
        assert.equal(userLength, 1);
        assert.equal(shinyLength, 2);
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyがnull）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo(null, 1);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyがundefined）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo(undefined, 1);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueがnull）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo('id', null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueがundefined）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo('id', undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueが空）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo('id');
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthEqualTo()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyとvalueが空）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthEqualTo();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドを呼ぶと正しく処理する', async () => {
        const firebase = new Firebase();
        const cpLength = await firebase.getLengthGreaterThan('cp', 300);
        assert.equal(cpLength, 3);
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyがnull）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan(null, 300);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyがundefined）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan(undefined, 300);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueがnull）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan('cp', null);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueがundefined）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan('cp', undefined);
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（valueが空）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan('cp');
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });

    it('getLengthGreaterThan()メソッドにkeyとvalueを渡さないとErrorをthrowする（keyとvalueが空）', async () => {
        const firebase = new Firebase();
        try {
            await firebase.getLengthGreaterThan();
            assert.fail();
        } catch (err) {
            assert.equal(err.message, 'Invalid request argument.');
        }
    });
});
