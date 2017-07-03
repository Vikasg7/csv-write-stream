import { Transform } from "stream"
import { createWriteStream } from "graceful-fs"

export class CsvWriteStream extends Transform {

   private _headings: Array<string>

   constructor() {
      super({objectMode: true})
   }

   _transform(data: any, enc: string, done: (data?: any) => void) {
      if (!this._headings) this._headings = Object.keys(data)

      const row = []
      for (const key in data) {
         let i = this._headings.indexOf(key)
         if (i < 0) {
            i = this._headings.length
            this._headings.push(key)
         }
         row[i] = (data[key] || "").toString().replace(/"/g, '""') // escaping double quotes "
      }

      this.push(`"${ row.join('","') }"\r\n`)

      done()
   }

   _flush(done: (data?: any) => void) {
      if (this._headings) {
         this.push(this._headings.join(",") + "\r\n")
         this._headings = null
      }
      done()
   }

}

export const CreateStream = (fPath: string):CsvWriteStream => {
   const csvWriteStream = new CsvWriteStream()
   csvWriteStream.pipe(createWriteStream(fPath))
   return csvWriteStream
}