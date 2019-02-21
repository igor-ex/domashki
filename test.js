//можно ли пихать в один describe и в один it несколько assert
//как тестировать поведение функций, которое может зависеть друг от друга? Например, на правильность
//срабатывания функции getEl могут влиять предыдущие вызовы остальных функций меняющих коллекцию
//а на работу остальных функций влияет работа функции getEl

function testCollections(name, constr) {
    describe(name, function () {
        describe('getEl', function () {

            function test(init, testData) {
                testData.forEach(function (data) {
                    const arr = new constr;
                    arr.push.apply(arr,init);
                    const {ind, exp} = data;
                    it(`should return ${exp} when index = ${ind}, data = ${init}`, function () {
                        const act = arr.getEl(ind);
                        assert.strictEqual(act, exp);
                    })
                })
            }

            const init = [5, 0, 4, 6, 9, 100];
            const testData = [
                {ind: 0, exp: 5},
                {ind: 5, exp: 100},
                {ind: 2, exp: 4},
                {ind: 6, exp: undefined},
                {ind: 50, exp: undefined}
            ];

            test(init, testData);
            const testData2 = [
                {ind: 0, exp:0},
                {ind: 1, exp: 1}
            ]
            test([0, 1], testData2);
            const testData3 = [
                {ind: 0, exp: void 0},
                {ind: 5, exp: void 0}
            ]
            test([],testData3)
            const testData4 = [
                {ind: 0, exp: 5},
                {ind: 1, exp: void 0}
            ]
            test([5],testData4)
        })

        function testPushUnshift(name, testData) {
            k = []
            describe(name, function () {
                testData.forEach(function (data) {
                    const arr = new constr;
                    const {init, els, exp, expEls} = data;
                    arr.push.apply(arr, init);//initially populate the collection
                    const act = arr[name].apply(arr, els);

                    it(`should return correct array length = ${exp}`, function () {
                        assert.strictEqual(act, exp, `actual returned length = ${act}, init data = ${init}`);
                    });

                    it(`should set correct array length = ${exp}`, function () {
                        k.push(['len', data, arr.length])
                        assert.strictEqual(arr.length, exp, `actual collection length = ${arr.length}`);//проверка длины массива
                    })

                    it(`should contain expected data: ${expEls}`, function () {
                        const actEls = [];
                        for (let i = 0; i < arr.length; i++) {
                            actEls.push(arr.getEl(i));
                        }
                        assert.deepEqual(actEls, expEls, `actual elements = ${actEls}`);
                    })
                });
            });
        }

        testPushUnshift('push', [
            {init: [], els: [0], exp: 1, expEls: [0]},
            {init: [], els: [1], exp: 1, expEls: [1]},
            {init: [], els: [5], exp: 1, expEls: [5]},
            {init: [], els: [5, 10], exp: 2, expEls: [5, 10]},

            {init: [0], els: [0], exp: 2, expEls: [0, 0]},
            {init: [0], els: [6], exp: 2, expEls: [0, 6]},
            {init: [0], els: [6, 100], exp: 3, expEls: [0, 6, 100]},
            {init: [0], els: [1], exp: 2, expEls: [0, 1]},

            {init: [0, 6], els: [0], exp: 3, expEls: [0, 6, 0]},
            {init: [0, 6], els: [1], exp: 3, expEls: [0, 6, 1]},
            {init: [0, 6], els: [5, 10], exp: 4, expEls: [0, 6, 5, 10]},

            {init: [6, 0], els: [], exp: 2, expEls: [6, 0]},
            {init: [6, 0], els: [1], exp: 3, expEls: [6, 0, 1]},
            {init: [1, 1, 1], els: [7, 8], exp: 5, expEls: [1, 1, 1, 7, 8]},
            {init: [1, 1, 1], els: [0], exp: 4, expEls: [1, 1, 1, 0]},
            {init: [1, 1, 1], els: [6, 9], exp: 5, expEls: [1, 1, 1, 6, 9]},
        ]);
        testPushUnshift('unshift', [
            {init: [], els: [0], exp: 1, expEls: [0]},
            {init: [], els: [-1], exp: 1, expEls: [-1]},
            {init: [], els: [6], exp: 1, expEls: [6]},
            {init: [], els: [6, 5], exp: 2, expEls: [6, 5]},
            {init: [0], els: [6, 5], exp: 3, expEls: [6, 5, 0]},
            {init: [5], els: [100], exp: 2, expEls: [100, 5]},
            {init: [5], els: [100, 4], exp: 3, expEls: [100, 4, 5]},
            {init: [4, 6], els: [7, 8], exp: 4, expEls: [7, 8, 4, 6]},
            {init: [0, 50, 9], els: [6, 2], exp: 5, expEls: [6, 2, 0, 50, 9]}
        ]);

        function testPopShift(name, testData) {
            describe(name, function () {
                testData.forEach(function (data) {
                    const {init, expReturn, expEls, expLen} = data;
                    const arr = new constr;
                    arr.push.apply(arr, init);
                    const actReturn = arr[name]();

                    it(`should return ${expReturn}`, function () {
                        assert.strictEqual(actReturn, expReturn);
                    })

                    it(`should contain elements ${expEls}`, function () {
                        const actEls = [];
                        for (let i = 0; i < arr.length; i++) {
                            actEls.push(arr.getEl(i));
                        }
                        assert.deepEqual(actEls, expEls);
                    })

                    it(`should set length to ${expLen}`, function () {
                        const actLen = arr.length;
                        assert.strictEqual(actLen, expLen)
                    })
                })

            });
        }

        testPopShift('pop', [
            {init: [0, 1, 2], expReturn: 2, expEls: [0, 1], expLen: 2},
            {init: [0], expReturn: 0, expEls: [], expLen: 0},
            {init: [1], expReturn: 1, expEls: [], expLen: 0},
            {init: [2, 5], expReturn: 5, expEls: [2], expLen: 1},
            {init: [2, 5, 0], expReturn: 0, expEls: [2, 5], expLen: 2},
            {init: [100, 700, 4, 7, 21], expReturn: 21, expEls: [100, 700, 4, 7], expLen: 4},
            {init: [], expReturn: void 0, expEls: [], expLen: 0}
        ]);
        testPopShift('shift', [
            {init: [0, 1, 2], expReturn: 0, expEls: [1, 2], expLen: 2},
            {init: [0], expReturn: 0, expEls: [], expLen: 0},
            {init: [1], expReturn: 1, expEls: [], expLen: 0},
            {init: [2, 5], expReturn: 2, expEls: [5], expLen: 1},
            {init: [2, 5, 0], expReturn: 2, expEls: [5, 0], expLen: 2},
            {init: [100, 700, 4, 7, 21], expReturn: 100, expEls: [700, 4, 7, 21], expLen: 4},
            {init: [], expReturn: void 0, expEls: [], expLen: 0}
        ])

        describe('isArray', function () {
            it('should return true', function () {
                const arr = new constr;
                assert(arr.isArray())
            })
        })

        describe('some', function () {
            //given
            const func = function (a) {
                return a < 0;
            }
            const testData = [
                {arr: [0, 1, 2], exp: false},
                {arr: [6, -1, 5], exp: true},
                {arr: [-1, 5], exp: true},
                {arr: [5, 6, 0], exp: false},
                {arr: [-5, -19, -9], exp: true}
            ]
            testData.forEach(function (data) {
                const {arr, exp} = data;
                const obj = new constr;
                obj.push.apply(obj, arr);

                it(`should return true when less than zero values are present and false when greater or equals zero`, function () {
                    //when
                    const act = obj.some(func);
                    //then
                    assert.strictEqual(act, exp, `returned: ${act}, data: ${arr}`);
                })
            })
        })

        describe('every', function () {
            const testData = [
                {init: [1, false, void 0], retVal: false, iterated: [1]},
                {init: [], retVal: false, iterated: []},
                {init: [''], retVal: true, iterated: []},
                {init: ['5', 'he', 8], retVal: true, iterated: ['5']},
                {init: ['', '22', '0'], retVal: true, iterated: ['', '22', '0']}
            ]
            testData.forEach(function (data) {
                const {init, retVal, iterated} = data;
                it(`should return ${retVal} when data = ${init} and iterate these values: ${iterated}`, function () {
                    const arr = new constr;
                    arr.push.apply(arr, init);
                    const res = [];
                    arr.every(function (val) {
                        res.push(val);
                        return (typeof val === 'string');
                    })
                })
            })
        });

        describe('remove', function () {

            it(`should delete single element`, function () {
                //given
                const arr = new constr;
                arr.push(10);
                //when
                const removed = arr.remove(0);
                //then
                assert.strictEqual(removed, 10);
                assert.strictEqual(arr.length, 0)
                assert.strictEqual(arr.getEl(0), void 0)
            })

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5);
                //when
                const removed = arr.remove(0);
                //then
                assert.strictEqual(removed, 10);
                assert.strictEqual(arr.length, 1)
                assert.strictEqual(arr.getEl(0), 5);
                assert.strictEqual(arr.getEl(1), undefined)
            })

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5);
                //when
                const removed = arr.remove(1);
                //then
                assert.strictEqual(removed, 5);
                assert.strictEqual(arr.length, 1)
                assert.strictEqual(arr.getEl(0), 10);
                assert.isUndefined(arr.getEl(1));
            })

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5, 40);
                //when
                const removed = arr.remove(1);
                //then
                assert.strictEqual(removed, 5);
                assert.strictEqual(arr.length, 2)
                assert.strictEqual(arr.getEl(0), 10);
                assert.strictEqual(arr.getEl(1), 40);
                assert.isUndefined(arr.getEl(2))
            })
        });

    });
}
testCollections('Alist', Alist);
testCollections('LList',LList);

describe('LList.iterate', function () {
    const testData = [
        {init: [4 , 5, 'hello'], exp: [8, 10, NaN]},
        {init: [0, 1, 2, 3, 4, 5], exp: [0, 2, 4, 6, 8, 10]}
    ]
        testData.forEach(function (data) {
            const {init, exp} = data;
            it(`res should contain all elements ${data}`, function () {
                const arr = new LList;
                arr.push.apply(arr, init);
                const res = []
                arr.iterate(function (val) {
                    res.push(val);
                })
                assert.deepEqual(res, init)
            })

            it(`should multiply every element`, function () {
                const arr = new LList;
                arr.push.apply(arr, init);
                const res = []
                arr.iterate(function (val) {
                    res.push(val * 2);
                })
                assert.deepEqual(res, exp)
            })
        });

})

describe('splice', function () {
    const testData = [
        {init: [], args: [0, 1], expReturn: [], expLen: 0, expContent: []},
        {init: [], args: [0, 0, 7, 9], expReturn: [], expLen: 2, expContent: [7, 9]},
        {init: [7], args: [0, 1], expReturn: [7], expLen: 0, expContent: []},
        {init: [5], args: [0, 1, 4], expReturn: [1], expLen: 1, expContent: [4]},
        {init: [5], args: [0], expReturn: [5], expLen: 0, expContent: []},
        {init: [1, 2, 5, 7, 10], args: [2, 2], expReturn: [5, 7], expLen: 3, expContent: [1, 2, 10]},
        //{init: [], args: [], expReturn: [], expLen: , expContent: []},
    ]
    testData.forEach(function (data) {
        const {init, args, expReturn, expLen, expContent} = data;

        it(`should delete elements or add new ones`, function () {
            //given
            const arr = new constr;
            arr.push.apply(arr, init);
            //when
            const returned = arr.splice.apply(arr,args);
            //then
            assert.strictEqual(arr.length, expLen);
            assert.deepEqual(returned, expReturn);
            const content = [];
            for (let i = 0; i < arr.length; i++) {
                content.push(arr.getEl(i));
            }
            assert.deepEqual(content, expContent)
        })
    })
});

describe('LList.remove', function () {
    const constr = LList;
    it(`should delete single element`, function () {
        //given
        const arr = new constr;
        arr.push(10);
        //when
        const removed = arr.remove(0);
        //then
        assert.isNull(arr.root);
        assert.isNull(arr.last);
    })

    it(`should delete one element`, function () {
        //given
        const arr = new constr;
        arr.push(10, 5);
        //when
        const removed = arr.remove(0);
        //then
        assert.isNotNull(arr.root);
        assert.isNotNull(arr.last);
        assert.strictEqual(arr.root, arr.last);
    })

    it(`should delete one element`, function () {
        //given
        const arr = new constr;
        arr.push(10, 5);
        //when
        const removed = arr.remove(1);
        //then
        assert.strictEqual(removed, 5);
        assert.strictEqual(arr.length, 1)
        assert.strictEqual(arr.getEl(0), 10);
        assert.isUndefined(arr.getEl(1));
        assert.isNotNull(arr.root);
        assert.isNotNull(arr.last);
        assert.strictEqual(arr.root, arr.last);
    })

    it(`should delete one element`, function () {
        //given
        const arr = new constr;
        arr.push(10, 5, 40);
        //when
        const removed = arr.remove(1);
        //then
        assert.isNotNull(arr.root);
        assert.isNotNull(arr.last);
        assert.notEqual(arr.root, arr.last);
        assert.isUndefined(arr.getEl(2))
    })
});