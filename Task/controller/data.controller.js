var osu = require("node-os-utils");
const Data = require('../models/data.model');
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: 'https://test-87c1d.firebaseio.com/',
    serviceAccount: './serviceAccountKey.json'
});
var cpu = osu.cpu;
var mem = osu.mem;
var drive = osu.drive;

const alarmMapping = {
    ram: 'memUsage',
    cpu: 'cpuUsage',
    disk: 'diskUsage'
};

setInterval(() => {
    post().then(res => {
        firebase.database().ref('logs').push(res);
        setAlarms(res);
    })
}, 5000)

function post() {
    return new Promise((resolve, reject) => {
        let cpuUsage, memUsage, diskUsage;

        cpu.usage().then(cpudata => {
            cpuUsage = cpudata
            return mem.info();
        }).then(memdata => {
            memUsage = memdata;
            let time = new Date().getTime();
            resolve({
                cpuUsage,
                memUsage,
                time: Date.now()
            })
        }).catch(err => {
            reject(err);
        })
    })

}
function setAlarms(data) {
    firebase.database().ref("configuration").on("value", function (snapshot) {
        // console.log(snapshot.val());
        let configuration = Object.values(snapshot.val());
        for (let i = 0; i < configuration.length; i++) {
            let alarm = {};
            let o_type = configuration[i].type;
            let name = configuration[i].name;
            let type = alarmMapping[o_type];
            let target_value = configuration[i].target_value;
            let operator = configuration[i].condition;
            if (operator === '<') {
                if (type === 'memUsage') {
                    if (data[type]['usedMemMb'] < target_value) {
                        // generate alarma
                        alarm['type'] = o_type;
                        alarm['name'] = name;
                        alarm['value'] = data[type]['usedMemMb'];
                        alarm['time'] = Date.now()
                        firebase.database().ref('alarms').push(alarm);

                    }
                } else {
                    if (data[type] < target_value) {
                        // generate value
                        alarm['type'] = o_type;
                        alarm['name'] = name;
                        alarm['value'] = data[type];
                        alarm['time'] = Date.now()
                        firebase.database().ref('alarms').push(alarm);

                    }
                }
            } else if (operator === '>') {
                if (type === 'memUsage') {
                    if (data[type]['usedMemMb'] > target_value) {
                        // generate alarm
                        alarm['type'] = o_type;
                        alarm['name'] = name;
                        alarm['value'] = data[type]['usedMemMb'];
                        alarm['time'] = Date.now()
                        firebase.database().ref('alarms').push(alarm);
                    }
                } else {
                    if (data[type] > target_value) {
                        // generate value
                        alarm['type'] = o_type;
                        alarm['name'] = name;
                        alarm['value'] = data[type];
                        alarm['time'] = Date.now()
                        firebase.database().ref('alarms').push(alarm);
                    }
                }
            }

        }
    })

}
module.exports = post;
