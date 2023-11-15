const axios = require('axios');

let lastKnownState = null;

const checkForUpdates = async () => {
    console.log("Polling for updates..."); // Log every time the function runs

    try {
        const response = await axios.get('https://boost-relay.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=1');
        const currentState = JSON.stringify(response.data);

        if (currentState !== lastKnownState) {
            lastKnownState = currentState;
            console.log('State changed:', response.data);
        } else {
            console.log('No change in state.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

setInterval(checkForUpdates, 3000);
