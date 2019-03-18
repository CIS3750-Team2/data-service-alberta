const retrieve = require('./retrieve');
const constants = require('./constants');

module.exports = (state) => async ({ data: { province, years } }) => {
    if (constants.province === province) {
        for (const year of years) {
            if (year) {
                console.log(`Updating dataset '${province}-${year}'...`);
                const update = await retrieve(state, year)
                    .catch((err) => {
                        console.log(err);
                        return [];
                    });
                state.updateQueue.add(
                    { [`${province}-${year}`]: update },
                    { removeOnComplete: true }
                );
            }
        }
    } else {
        return Promise.reject(Error(
            `Job for ${province} sent to incorrect service for ${constants.province}!`
        ));
    }
};
