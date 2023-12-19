const { autoriders_read_db, autoriders_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');
const moment = require('moment');

const autoDbR = dbPoolManager.get('autoDbR', autoriders_read_db);
const autoDbW = dbPoolManager.get('autoDbW', autoriders_write_db);

module.exports.fetchPatentSubMissionForms = async() => {
    let sql = {
        text :`SELECT * FROM patent_submissions ORDER BY id`
    }
    return autoDbR.query(sql)
}

module.exports.insertPatentData = async(patentData) => {
    const {type_of_invention, title_of_invention,  patent_stage, achive_sdg, application_no, date, is_presenter} = patentData;
    console.log("patentData::::::", patentData)
    let sql = {
        text : `INSERT INTO  patent_submissions (type_of_invention, title_of_invention,  patent_stage, achive_sdg, application_no, date,        is_presenter) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        values : [type_of_invention, title_of_invention,  patent_stage, achive_sdg, application_no, date, is_presenter]
    }
    console.log('sql ==>>', sql)
    return autoDbW.query(sql);

}
