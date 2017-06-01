# csv-write-stream

- ### Intro  
   **csv-write-stream** is a Nodejs Transform Stream to write csv files. It takes row which are javascript objects with header as key and data as value. Headers are kept in an array and written to last line of the csv when `.end()` method is called on the `csv-write-stream`. This way user don't have to explicitly define headers and can add headers based on the data being processed. So if you are getting a dynamic object with new headers, this module is for you.

- ### Install  
   `npm install git+https://github.com/Vikasg7/csv-write-stream.git`  

- ### Usage (in TypeScript)  
   ````javascript  
   import { CreateStream } from "csv-write-stream"

   const Writer = CreateStream("path-to-file.csv")

   // row1 must be a javascript object with headings as key and cell values as value
   const row1 = {head1: "Value1", head2: "Value2", head3: "Value3"}

   // To write data to csv file
   Writer.write(row1)

   // this row has new headers ie head4, head5 and also missing head2, head3 
   const row2 = {head1: "Value1", head4: "Value2", head5: "Value3"}

   // this write call will add head4 and head5 (new columns) and  also keep
   // cells values of head2, head3 in row number 2 in the resultant csv as empty
   Writer.write(row2)

   // This end call will write headers to the file. this is important to call
   // .end() method because otherwise headers won't be written and table without
   // headers could be useless.
   Writer.end()

   // this module also provides raw CsvWriteStream for use cases below
   import { CsvWriteStream } from "csv-write-stream"
   const CWS = new CsvWriteStream()
   ParentStream.pipe(CWS).pipe(ChildStream)
   ````

- ### Example
   Check the tests folder in src folder for an example.

- ### Todo
   Writting headers as first line instead of lastLine