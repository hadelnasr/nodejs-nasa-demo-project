const launchesDatabase = require('./launches.mongo');

// const launches = new Map();

let defaultFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate: new Date('December 27,2030'),
    target: 'Kepler-442',
    customers: ['Nasa', 'ZTM'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

// launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId
    });
}

async function getLastestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
    if (!latestLaunch) {
        return defaultFlightNumber;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    // return Array.from(launches.values());
    return await launchesDatabase.find({}, {"__id": 0, "__v": 0});
}

async function saveLaunch(launch) {
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLastestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'Nasa', 'Haytham'],
        flightNumber: newFlightNumber
    });
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    return aborted.ok === 1 && aborted.nModified === 1;
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch
}