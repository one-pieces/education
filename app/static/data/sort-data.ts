/// <reference path='../../app.d.ts' />

export = [
    {
        id: '1',
        src: [{ phoneticize: 'shū', title: '书' ,'drag': true},
            { phoneticize: 'Ben de ', title: 'Ben 的', 'drag': true },
            { phoneticize: 'zài', title: '在', 'drag': true },
            { phoneticize: 'nǎr', title: '哪 儿 ？', 'drag': true }],
        answers: [
            { phoneticize: 'Ben de ', title: 'Ben 的', 'drag': true,score:5 },
            { phoneticize: 'shū', title: '书' ,'drag': true, score:5},
            { phoneticize: 'zài', title: '在', 'drag': true, score:5 },
            { phoneticize: 'nǎr', title: '哪 儿 ？', 'drag': true, score:5 }],
        score: 20
    }, {
        id: '2',
        src: [{ phoneticize: 'shū', title: '2书' ,'drag': true},
            { phoneticize: 'Ben de ', title: '2Ben 的', 'drag': true },
            { phoneticize: 'zài', title: '在', 'drag': true },
            { phoneticize: 'nǎr', title: '哪 儿 ？', 'drag': true }],
        answers: [
            { phoneticize: 'Ben de ', title: 'Ben 的', 'drag': true,score:5 },
            { phoneticize: 'shū', title: '书' ,'drag': true, score:5},
            { phoneticize: 'zài', title: '在', 'drag': true, score:5 },
            { phoneticize: 'nǎr', title: '哪 儿 ？', 'drag': true, score:5 }],
        score: 20
    }
];