const patentSubmissionservice = require('../services/patent-submission.service');
const clientScript = require('../../public/js/client');
const path = require('path');

module.exports.renderPatentSubMissionAndGrant = async(req, res, next) =>{
    const fileuploadStatus = req.app.locals.fileuploadStatus;
    console.log('fileuploadStatus===>',req.app.locals.fileuploadStatus )
    const docuploadStatus = req.app.locals.docuploadStatus;
    console.log('docuploadStatus ==>',req.app.locals.docuploadStatus )
    const htmlVal = res.app.locals.htmlVal;
    console.log('htmlVal ==>>', res.app.locals.htmlVal);
    const errorMsg = res.app.locals.errorMsg;
    req.app.locals.fileuploadStatus = false;
    req.app.locals.docuploadStatus = false;
    res.app.locals.htmlVal = '';
    clientScript.includeHtml(htmlVal);
   const patentSubmissionList = await patentSubmissionservice.fetchPatentForm();
   if(patentSubmissionList){
    
    res.render('patent-submission', {
        title: 'File Upload Using Multer in Node.js and Express',
        utils: clientScript,
        fileuploadStatus: fileuploadStatus,
        docuploadStatus: docuploadStatus,
        errorMsg: errorMsg,
        htmlVal: htmlVal,
        patentList : patentSubmissionList
      })
}
};

module.exports.insertPatentsubmission = async(req, res, next) => {
        console.log('patentData in Controller', req.body);
        const patentData = req.body
        const { filename, path: filePath } = req.file;
        console.log('file name ==>', req.file.filename);
        console.log('Controller for handleFileConversion ==>>',req.file)
        const patentDataSubmission = await patentSubmissionservice.insertPatentFormData(req.body, req.file.filename);
        console.log('ID ==>>', patentDataSubmission.rows[0].id);
        if(patentDataSubmission && patentDataSubmission.rows[0].id){
            res.json({
            status : 'done',
            massage : 'data inserted suceessfully',
            patentData ,
            filename,
            filePath: path.join('/', filePath),
            patentId : patentDataSubmission.rows[0].id
            
        })

        }
}

