const { autoriders_read_db, autoriders_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');
const moment = require('moment');

const autoDbR = dbPoolManager.get('autoDbR', autoriders_read_db);
const autoDbW = dbPoolManager.get('autoDbW', autoriders_write_db);

// for fetching journal paper data 
module.exports.fetchJournalPaper = () => {
    let sql = {
        text : 'SELECT id, year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher FROM journal_papers ORDER BY id',

    };
    return autoDbR.query(sql);
};

// for inserting journal paper  data
module.exports.createJournalPaper = ({journalDetails}) => {
    const { year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher} = journalDetails ;

    let sql = {
        text : `INSERT INTO journal_papers ( year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher)  
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id ` ,
        values : [year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher]
    };
    
    return autoDbW.query(sql);
}

// for deleting journal paper  data 
module.exports.deleteJournalPaper =  async({taskId}) => {
    let sql = {
        text : `DELETE FROM journal_papers WHERE id = $1 `,
        values : [taskId]
    };
    return autoDbR.query(sql);

}

// for updating 
module.exports.updateJournalPaperData = async ({taskId , updateJournalDetails}) => {
    const { year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher} = updateJournalDetails;
    let sql = {
         text : ` UPDATE journal_papers 
                SET year = $2, school = $3, campus = $4, policy_cadre = $5, all_authors = $6,
                    total_authors = $7, nmims_authors = $8, journal_name = $9, publisher = $10
                WHERE id = $1`,
        values : [taskId, year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher]
    };
    return autoDbW.query(sql);
 
};
