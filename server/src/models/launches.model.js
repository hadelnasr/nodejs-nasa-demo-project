const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler',
    rocket: 'Explorer',
    launchDate: new Date('December 27,2030'),
    destination: 'Kepler-442',
    customer: ['Nasa', 'ZTM'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches
}