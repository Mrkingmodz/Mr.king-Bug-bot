# README

    a more easy use URL

```
yarn add lazy-url
```

see [index.test.ts](./test/index.test.ts)
see [lazy.spec.ts.snap](./test/lazy.spec.ts.snap)

---

```ts
let actual = new LazyURL('api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5');
// => https://gitee.com/api/api/v5/repos/xxxx/xxxx/contents
let actual2 = new LazyURL('/api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5');
// => https://gitee.com/api/v5/repos/xxxx/xxxx/contents
let actual3 = new LazyURL('api/v5/repos/xxxx/xxxx/contents', 'https://gitee.com/api/v5/');
// => https://gitee.com/api/v5/api/v5/repos/xxxx/xxxx/contents
```

---

```ts
// @ts-ignore
import LazyURL from 'lazy-url';

let a1 = 'https://gitee.com/api/v5/';
let a2 = '/api/v5/repos/xxxx/xxxx/contents';

let u = new LazyURL(a2, a1);

console.dir(u.toRealString());
// => 'https://gitee.com/api/v5/repos/xxxx/xxxx/contents'

// @ts-ignore
u = new URL(a2, a1);

console.dir(u.toString());
// => 'https://gitee.com/api/v5/repos/xxxx/xxxx/contents'

a1 = '/api/v5/';
a2 = '/api/v5/repos/xxxx/xxxx/contents';

u = new LazyURL(a2, a1);
// => '/api/v5/repos/xxxx/xxxx/contents'

console.dir(u.toRealString());

// @ts-ignore
u = new URL(a2, a1);
// => throw error

console.dir(u.toString());
```
