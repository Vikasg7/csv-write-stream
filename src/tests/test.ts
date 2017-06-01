import { CreateStream } from "../index"

const writer = CreateStream("output/test.csv")

const rows: Array<any> = [
   {a: "3", b: "4", d: '"v'},
   {a: "1", b: "2", c: "3"}
]

for (const row of rows) {
   writer.write(row)
}

// Important to end writer to write headers.
writer.end()