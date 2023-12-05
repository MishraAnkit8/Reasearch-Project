const { autoriders_read_db, autoriders_write_db } = require('../../config/db-configs');
const dbPoolManager = require('../../config/db-pool-manager');
const moment = require('moment');

const autoDbR = dbPoolManager.get('autoDbR', autoriders_read_db);
const autoDbW = dbPoolManager.get('autoDbW', autoriders_write_db);

module.exports.fetchJournalPaper = () => {
    let sql = {
        text : 'SELECT id, year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher FROM journal_papers',

    };
    return autoDbR.query(sql);
};

module.exports.createJournalPaper = ({journalDetails}) => {
    const { year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher} = journalDetails ;

    let sql = {
        text : `INSERT INTO journal_papers ( year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher)  
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id ` ,
        values : [year, school, campus, policy_cadre, all_authors, total_authors, nmims_authors, journal_name, publisher]
    };
    
    return autoDbW.query(sql);
}

module.exports.deleteJournalPaper =  async({taskId}) => {
    let sql = {
        text : `DELETE FROM journal_papers WHERE id = $1 `,
        values : [taskId]
    };
    return autoDbR.query(sql);

}
