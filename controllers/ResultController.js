const Grade = require("../models").Grade;
const ExcelJS = require("exceljs");
var path = require('path');

module.exports = {
    get: (req, res, next) => {
        Grade.findAll()
        .then(grade =>{
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('sheet-name');

      // １行ずつエクスポートするデータをセット
      grade.forEach((grade, index) => {

        let rowIndex = index + 1;
        worksheet.getRow(rowIndex).values = [
          grade.id,
          grade.grade
        ];

      });

      // CSVでエクスポート
      workbook.csv.writeBuffer()
        .then(buffer => {

          const fileName = 'users.csv';
          res.setHeader('Content-Type', 'text/csv; charset=UTF-8');
          res.setHeader('Content-disposition', 'attachment; filename='+ fileName);
          res.send(buffer);
        // res.download("./sample.js", filename, (err)=>{
        //     if(err){
        //         console.log(err);
        //     }
        // })

        });

    });

    }
}