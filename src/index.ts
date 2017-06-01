import { Transform } from "stream"
import { createWriteStream } from "graceful-fs"

export class CsvWriteStream extends Transform {

   headings: Array<string> = []

   constructor() {
      super({objectMode: true})
   }

   _transform(data: any, enc: string, done: (data?: any) => void) {
      if (!this.headings) this.headings = Object.keys(data)

      const row = []
      for (const key in data) {
         let i = this.headings.indexOf(key)
         if (i < 0) {
            i = this.headings.length
            this.headings.push(key)
         }
         row[i] = (data[key] || "").toString().replace(/"/g, '""') // escaping double quotes "
      }

      this.push(`"${ row.join('","') }"\r\n`)

      done()
   }

   _flush(done: (data?: any) => void) {
      this.push(this.headings.join(",") + "\r\n")
      done()
   }

}

export const CreateStream = (fPath: string):CsvWriteStream => {
   const csvWriteStream = new CsvWriteStream()
   csvWriteStream.pipe(createWriteStream(fPath))
   return csvWriteStream
}