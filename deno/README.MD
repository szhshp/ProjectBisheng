# Project Bisheng - Deno Package

> '毕昇'-中英文混排工具核心 Deno 包

- [Project Bisheng - Deno Package](#project-bisheng---deno-package)
  - [Usage](#usage)

## Usage

`test.ts`

```ts
import { bishengFormat } from "https://deno.land/x/project_bisheng@0.2s/index.ts";
console.log(
  bishengFormat(
    "测试一下这段文字. 如果只看到三个感叹号那就成功了!!!!！！！!!!!"
  )
);
```

```
deno run -A test.ts
```